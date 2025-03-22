import React, { useState } from "react";
import { Navbar, Container, Dropdown, Card, Row, Col, Button, Form, Modal } from "react-bootstrap";
import { FaUserLarge } from "react-icons/fa6";
import { BsCurrencyRupee } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { FaEdit, FaSave } from "react-icons/fa";

export default function MerchantPage() {
    const initialProducts = Array.from({ length: 20 }, (_, index) => ({
        id: index + 1,
        title: `Product ${index + 1}`,
        description: "Quick example text about this product.",
        price: 540,
        imageUrl: "https://via.placeholder.com/300x120",
        isEditing: false
    }));

    const itemsPerPage = 8; 
    const [products, setProducts] = useState(initialProducts);
    const [currentPage, setCurrentPage] = useState(1);
    const [showConfirm, setShowConfirm] = useState(false);
    const [editProduct, setEditProduct] = useState(null);

    const totalPages = Math.ceil(products.length / itemsPerPage);
    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    // Handle Edit
    const handleEdit = (id) => {
        setProducts(products.map(product => 
            product.id === id ? { ...product, isEditing: true } : product
        ));
    };

    // Handle Save
    const handleSave = (id) => {
        setEditProduct(products.find(product => product.id === id));
        setShowConfirm(true); // Show confirmation popup
    };

    // Confirm Save
    const confirmSave = () => {
        setProducts(products.map(product =>
            product.id === editProduct.id ? { ...editProduct, isEditing: false } : product
        ));
        setShowConfirm(false);
    };

    // Handle Input Change
    const handleInputChange = (id, field, value) => {
        setProducts(products.map(product => 
            product.id === id ? { ...product, [field]: value } : product
        ));
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
                        <Dropdown.Item href="/orders">Orders</Dropdown.Item>
                        <Dropdown.Item href="/logout">Logout</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Navbar>

            {/* Product List */}
            <Container className="p-3">
                <Row className="justify-content-center">
                    {currentProducts.map((product) => (
                        <Col key={product.id} lg={3} className="mb-4">
                            <Card style={{ width: "100%", height: "auto" }}>
                                {product.isEditing ? (
                                    <Form.Control 
                                        type="text"
                                        value={product.imageUrl}
                                        onChange={(e) => handleInputChange(product.id, "imageUrl", e.target.value)}
                                    />
                                ) : (
                                    <Card.Img 
                                        variant="top"
                                        src={product.imageUrl}
                                        style={{ height: "220px", objectFit: "cover" }}
                                    />
                                )}
                                <Card.Body className="d-flex flex-column">
                                    {product.isEditing ? (
                                        <>
                                            <Form.Control
                                                type="text"
                                                value={product.title}
                                                onChange={(e) => handleInputChange(product.id, "title", e.target.value)}
                                            />
                                            <Form.Control
                                                as="textarea"
                                                value={product.description}
                                                onChange={(e) => handleInputChange(product.id, "description", e.target.value)}
                                                className="mt-2"
                                            />
                                            <Form.Control
                                                type="number"
                                                value={product.price}
                                                onChange={(e) => handleInputChange(product.id, "price", e.target.value)}
                                                className="mt-2"
                                            />
                                        </>
                                    ) : (
                                        <>
                                            <Card.Title>{product.title}</Card.Title>
                                            <Card.Text className="flex-grow-1">{product.description}</Card.Text>
                                            <p>
                                                Price:{" "}
                                                <span className="text-success fw-bold">
                                                    <BsCurrencyRupee className="mb-1 fw-bold" />
                                                    {product.price}
                                                </span>
                                            </p>
                                        </>
                                    )}
                                    <div className="d-flex justify-content-center align-items-center gap-2">
                                        <Button variant="danger"><MdDelete /></Button>
                                        {product.isEditing ? (
                                            <Button variant="success" onClick={() => handleSave(product.id)}><FaSave /></Button>
                                        ) : (
                                            <Button variant="warning" onClick={() => handleEdit(product.id)}><FaEdit /></Button>
                                        )}
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>

                {/* Pagination */}
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

            {/* Confirmation Modal */}
            <Modal show={showConfirm} onHide={() => setShowConfirm(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Save</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to save the changes?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowConfirm(false)}>Cancel</Button>
                    <Button variant="success" onClick={confirmSave}>Confirm</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
