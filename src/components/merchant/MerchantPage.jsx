import React, { useEffect, useState } from "react";
import { Navbar, Container, Dropdown, Card, Row, Col, Button } from "react-bootstrap";
import { FaUserLarge } from "react-icons/fa6";
import { BsCurrencyRupee } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { GET_MERCHANT_PRODUCT } from "../../graphql/query/merchantQuery";
import { useMutation, useQuery } from "@apollo/client";
import { CiEdit } from "react-icons/ci";
import MerchantEdit from "./MerchantEdit";
import { EDIT_PRODUCT } from "../../graphql/mutation/merchantMutation";


export default function MerchantPage() {
    const { data, loading, error } = useQuery(GET_MERCHANT_PRODUCT);
    const [products, setProducts] = useState([]);
    const itemsPerPage = 8;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(products.length / itemsPerPage);
    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    const [isEdit, setIsEdit] = useState(false);
    const [editData, setEditData] = useState(null);
    
    const [updateProduct]= useMutation(EDIT_PRODUCT ,{fetchPolicy :"no-cache"});
    useEffect(() => {
        if (data && data.getMerchantProduct) {
            setProducts(data.getMerchantProduct);
        }
    }, [data]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error fetching Ordered Product</p>;

    const EditProduct = (product) => {
        setEditData(product)
        setIsEdit(true);
    }
    const handleEditClose = () => setIsEdit(false);
    const handleEditSave = async (updatedProduct) => {
        try{
            const {data}= await updateProduct({
                variables :{
                    input : {
                        description : updatedProduct.description,
                        image : updatedProduct.image,
                        price : updatedProduct.price,
                        product_id : updatedProduct.product_id,
                        product_name : updatedProduct.product_name
                    }
                }
            })
        }
        catch(err){
            console.log(err.message);
        }
        console.log("Updated Product:", updatedProduct);
        setIsEdit(false);
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
                        <Dropdown.Item href="/logout">Logout</Dropdown.Item>
                        <Dropdown.Item href="/MerchantNewProduct">Add new Product</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Navbar>

            <Container className="p-3">
                <Row className="justify-content-center">
                    {currentProducts.map((product) => (
                        <Col key={product.id} lg={3} className="mb-4">
                            <Card style={{ width: "100%", height: "auto" }}>
                                <Card.Img
                                    variant="top"
                                    src={product.image}
                                    style={{ height: "220px", objectFit: "contain" }}
                                />
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title>{product.product_name}</Card.Title>
                                    <textarea readOnly className="card-text border w-100 no-resize" style={{ height: "100px" }}>
                                        {product.description}
                                    </textarea>
                                    <p>
                                        Price: <span className="text-success fw-bold">
                                            <BsCurrencyRupee className="mb-1 fw-bold" />{product.price}
                                        </span>
                                    </p>
                                    <div className="d-flex justify-content-around align-items-center">
                                        <Button variant="danger"><MdDelete /></Button>
                                        <Button variant="warning" onClick={() => EditProduct(product)}> <CiEdit /></Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
                <div className="d-flex justify-content-center gap-3 mt-3">
                    <Button
                        variant="light"
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        ⬅️
                    </Button>
                    <Button
                        variant="light"
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                    >
                        ➡️
                    </Button>
                </div>
            </Container>

            {isEdit && (
                <MerchantEdit
                    product={editData}
                    show={isEdit}
                    onHide={handleEditClose}
                    onSave={handleEditSave}
                />
            )}
        </>
    );
}
