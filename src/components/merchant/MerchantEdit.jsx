import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { FaSave } from 'react-icons/fa';

export default function MerchantEdit({ product, show, onHide, onSave }) {
    const [editedProduct, setEditedProduct] = useState({ ...product });
    const [imagePreview, setImagePreview] = useState(product.image);

    const handleInputChange = (field, value) => {
        setEditedProduct(prev => ({ ...prev, [field]: value }));
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <Modal show={show} onHide={onHide} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Edit Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col md={5} className="d-flex flex-column align-items-center">
                        <img
                            src={imagePreview}
                            alt="Product Preview"
                            className="img-fluid mb-2"
                            style={{ height: "200px", objectFit: "contain" }}
                        />
                        <Form.Control
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </Col>
                    <Col md={7}>
                        <h5>Name</h5>
                        <Form.Control
                            type="text"
                            value={editedProduct.product_name}
                            onChange={(e) => handleInputChange("product_name", e.target.value)}
                            className="mb-2"
                        />
                        <h5>Description</h5>
                        <Form.Control
                            as="textarea"
                            value={editedProduct.description}
                            onChange={(e) => handleInputChange("description", e.target.value)}
                            className="mb-2"
                            style={{ height: "80px" }}
                        />
                        <h5>Price</h5>
                        <Form.Control
                            type="number"
                            value={editedProduct.price}
                            onChange={(e) => handleInputChange("price", e.target.value)}
                            className="mb-2"
                        />
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Cancel</Button>
                <Button variant="success" onClick={() => onSave(editedProduct)}>
                    <FaSave /> Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
