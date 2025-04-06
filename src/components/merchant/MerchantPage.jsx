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
import toast from "react-hot-toast";
import InfiniteScroll from 'react-infinite-scroll-component';
import { FaUserCircle } from "react-icons/fa";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";



export default function MerchantPage() {
    const [updateProduct] = useMutation(EDIT_PRODUCT, { fetchPolicy: "no-cache" });
    const [logout] = useMutation(LOG_OUT, { fetchPolicy: "no-cache" });
    const [deleteMerchantProduct] = useMutation(DELETE_PRODUCT, { fetchPolicy: "no-cache" });
    const [pageNumber, setPageNUmber] = useState(1);
    const [products, setProducts] = useState([]);
    const [logoutPopup, setLogoutPopup] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [editData, setEditData] = useState(null);
    const [hasMore, setHasMore] = useState(true);

    const { loading, error, data, refetch } = useQuery(GET_MERCHANT_PRODUCT, {
        variables: { page: pageNumber },
        fetchPolicy: "no-cache"
    });

    const navigate = useNavigate();
    useEffect(() => {
        if (data?.getMerchantProduct) {
            setProducts(data.getMerchantProduct);
            setHasMore(data.getMerchantProduct.length === 8);
        }
    }, [data]);

    const fetchMoreData = () => {
        setPageNUmber((prevPage) => prevPage + 1);
    };

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
                        product_name: updatedProduct.product_name,
                        offer:parseInt(updatedProduct.offer)
                    }
                }
            });

            refetch();
            toast.success("Updated successfully !");
        } catch (err) {
            console.error(err.message);
        }
        setIsEdit(false);
    };

    const DeleteMerchantProduct = async (id) => {
        try {
            await deleteMerchantProduct({ variables: { product_id: id } });
            setProducts((prev) => prev.filter((product) => product.product_id !== id));
            toast.success("Removed successfully");
        } catch (err) {
            console.error("Error while deleting:", err.message);
        }
    };

    const Logout = () => setLogoutPopup(true);
    const handleLogoutClose = () => setLogoutPopup(false);

    const handleLogout = async () => {
        await logout();
        localStorage.clear();
        navigate("/MerchantLogin?type=Merchant");
    };

    const CustomerLogin = async () => {
        localStorage.clear();
        await logout();
        navigate("/");
    };

    const calculateOfferPrice = (price, offer) => {
        if (!offer || offer < 1 || offer > 50) return price;
        return Math.round(price - (price * offer) / 100);
      };

    return (
        <>
            <Navbar bg="warning" className="d-flex justify-content-between px-3">
                <Container className="d-flex">
                    <div className="d-flex flex-row gap-4 w-75 p-2 align-items-center">
                        <h4 className="font-italic">Your Products</h4>
                    </div>
                </Container>
                <Dropdown>
                    <Dropdown.Toggle as="div" variant="warning" className="d-flex flex-row w-75 align-items-center">
                        <h4 className="px-5 fst-italic">Hello, {localStorage.getItem("username")}</h4>
                        <div>
                            <FaUserCircle style={{ height: "30px", width: "30px", marginLeft: "-20px" }} />
                        </div>
                    </Dropdown.Toggle>
                    <Dropdown.Menu align="end">
                        <Dropdown.Item href="/Merchantorders">Orders</Dropdown.Item>
                        <Dropdown.Item onClick={Logout}>Logout</Dropdown.Item>
                        <Dropdown.Item onClick={() => navigate("/MerchantNewProduct")}>Add Product</Dropdown.Item>
                        <Dropdown.Item onClick={() => CustomerLogin()}>Enter into E-cart</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Navbar>

            <Container className="p-3">
                <InfiniteScroll
                    style={{ overflow: 'hidden' }}
                    dataLength={products.length}
                    next={fetchMoreData}
                    hasMore={hasMore}
                    loader={<p className="fw-bold">Loading your products...</p>}
                    endMessage={<p className="fw-bold">No more products available !</p>}>
                    <Row className="justify-content-center">
                        {products.map((product) => (
                            <Col key={product.product_id} lg={3} className="mb-4">
                                <Card style={{ width: "100%", height: "auto" }}>
                                    {product.offer && (
                                        <div className='d-flex flex-row justify-content-end align-items-center gap-1' style={{ marginBottom: "-10px" }}>
                                            <h6 className="mb-0 text-success fw-bold">{product.offer}</h6>
                                            <DotLottieReact
                                                src="https://lottie.host/e52be1ea-23aa-48b6-96c8-5f2e5bf2e048/jok5rqbRw0.lottie"
                                                loop
                                                autoplay
                                                style={{ height: "30px", width: "30px" }}
                                            />
                                        </div>
                                    )}
                                    <Card.Img
                                        variant="top"
                                        src={product.image}
                                        style={{ height: "190px", objectFit: "contain", ...(!product.offer && { marginTop: "10px" }) }}
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
                                            Price:
                                            {product.offer ? (
                                                <>
                                                    <span className="text-muted text-decoration-line-through mx-2">
                                                        <BsCurrencyRupee className="mb-1" />{product.price}
                                                    </span>
                                                    <span className="text-success fw-bold">
                                                        <BsCurrencyRupee className="mb-1" />{calculateOfferPrice(product.price, product.offer)}
                                                    </span>
                                                </>
                                            ) : (
                                                <span className="text-success fw-bold">
                                                    <BsCurrencyRupee className="mb-1 fw-bold" />{product.price}
                                                </span>
                                            )}
                                        </p>
                                        <div className="d-flex justify-content-around align-items-center">
                                            <Button variant="danger" onClick={() => DeleteMerchantProduct(product.product_id)}><MdDelete /></Button>
                                            <Button variant="warning" onClick={() => EditProduct(product)}><CiEdit /></Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </InfiniteScroll>
            </Container>

            {isEdit && (
                <MerchantEdit
                    product={editData}
                    show={isEdit}
                    onHide={handleEditClose}
                    onSave={handleEditSave}
                    refetch={refetch}
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