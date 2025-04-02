import React, { useEffect, useState } from "react";
import { Navbar, Container, Dropdown, Card, Row, Col, Button } from "react-bootstrap";
import { FaUserLarge } from "react-icons/fa6";
import { BsCurrencyRupee } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { GET_MERCHANT_PRODUCT } from "../../graphql/query/merchantQuery";
import { useMutation, useQuery } from "@apollo/client";
import { CiEdit } from "react-icons/ci";
import MerchantEdit from "./MerchantEdit";
import { DELETE_PRODUCT, EDIT_PRODUCT, LOG_OUT } from "../../graphql/mutation/merchantMutation";
import LogoutModal from '../../components/customer/LogoutModal';
import { useNavigate } from "react-router-dom";

export default function MerchantPage() {
    const [updateProduct] = useMutation(EDIT_PRODUCT, { fetchPolicy: "no-cache" });
    const [logout] = useMutation(LOG_OUT, { fetchPolicy: "no-cache" });
    const [deleteMerchantProduct] = useMutation(DELETE_PRODUCT, { fetchPolicy: "no-cache" });

    const { data, loading, error } = useQuery(GET_MERCHANT_PRODUCT);

   


    const [products, setProducts] = useState([]);
    const [logoutPopup, setLogoutPopup] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [editData, setEditData] = useState(null);

    const navigate = useNavigate();

    // Ensure products update when new data is available
    useEffect(() => {
        if (data?.getMerchantProduct) {
            setProducts(data.getMerchantProduct);
        }
    }, [data]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error fetching Ordered Product: {error.message}</p>;

    const EditProduct = (product) => {
        setEditData(product);
        setIsEdit(true);
    };

    const handleEditClose = () => setIsEdit(false);

    const handleEditSave = async (updatedProduct) => {
        try {
            await updateProduct({
                variables: {
                    input: {
                        description: updatedProduct.description,
                        image: updatedProduct.image,
                        price: parseInt(updatedProduct.price),
                        product_id: updatedProduct.product_id,
                        product_name: updatedProduct.product_name
                    }
                }
            });

            setProducts((prevProducts) =>
                prevProducts.map((product) =>
                    product.product_id === updatedProduct.product_id
                        ? { ...product, ...updatedProduct } 
                        : product
                )
            );
        } catch (err) {
            console.error(err.message);
        }
        setIsEdit(false);
    };

    const DeleteMerchantProduct = async (id) => {
        try {
            await deleteMerchantProduct({ variables: { product_id: id } });
            setProducts((prev) => prev.filter((product) => product.product_id !== id));
        } catch (err) {
            console.error("Error while deleting:", err.message);
        }
    };

    const Logout = () => setLogoutPopup(true);

    const handleLogoutClose = () => setLogoutPopup(false);

    const handleLogout = async () => {
        await logout();
        navigate("/MerchantLogin?type=Merchant");
    };

    return (
        <>
            <Navbar bg="warning" className="d-flex justify-content-between px-3">
                <Container className="d-flex">
                    <Navbar.Brand>Your Products</Navbar.Brand>
                </Container>
                <Dropdown>
                    <Dropdown.Toggle variant="warning">
                        <FaUserLarge />
                    </Dropdown.Toggle>
                    <Dropdown.Menu align="end">
                        <Dropdown.Item href="/Merchantorders">Orders</Dropdown.Item>
                        <Dropdown.Item onClick={Logout}>Logout</Dropdown.Item>
                        <Dropdown.Item onClick={()=>navigate("/MerchantNewProduct")}>Add new Product</Dropdown.Item>
                        <Dropdown.Item onClick={()=>navigate("/")}>Enter into E-cart</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Navbar>

            <Container className="p-3">
                <Row className="justify-content-center">
                    {products.map((product) => (
                        <Col key={product.product_id} lg={3} className="mb-4">
                            <Card style={{ width: "100%", height: "auto" }}>
                                <Card.Img
                                    variant="top"
                                    src={product.image}
                                    style={{ height: "220px", objectFit: "contain" }}
                                />
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title>{product.product_name}</Card.Title>
                                    <textarea
                                        readOnly
                                        className="card-text border w-100 no-resize"
                                        style={{ height: "100px" }}
                                        defaultValue={product.description}
                                    />
                                    <p>
                                        Price: <span className="text-success fw-bold">
                                            <BsCurrencyRupee className="mb-1 fw-bold" />{product.price}
                                        </span>
                                    </p>
                                    <div className="d-flex justify-content-around align-items-center">
                                        <Button variant="danger" onClick={() => DeleteMerchantProduct(product.product_id)}><MdDelete /></Button>
                                        <Button variant="warning" onClick={() => EditProduct(product)}> <CiEdit /></Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>

            {isEdit && (
                <MerchantEdit
                    product={editData}
                    show={isEdit}
                    onHide={handleEditClose}
                    onSave={handleEditSave}
                />
            )}
            {logoutPopup && (
                <LogoutModal
                    show={true}
                    handleClose={handleLogoutClose}
                    handleLogout={handleLogout}
                />
            )}
            {products.length === 0 && (
                <div className="d-flex flex-column justify-content-center align-items-center h-100 text-center">
                    <div className="p-4 border rounded shadow bg-light">
                        <h2 className="fw-bold text-warning">Welcome to Merchant Page!</h2>
                        <p className="text-secondary fs-5">
                            Please navigate to <strong>Add Product</strong> by clicking the user icon and add your product.
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}
