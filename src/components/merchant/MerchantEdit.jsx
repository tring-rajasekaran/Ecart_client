import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { FaSave } from 'react-icons/fa';

export default function MerchantEdit({ product, show, onHide, onSave , refetch }) {
    const [editedProduct, setEditedProduct] = useState({ ...product });
    const [imagePreview, setImagePreview] = useState(product.image);
    const [errors, setErrors] = useState({});

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

    const validateForm = () => {
        let newErrors = {};
        if (!editedProduct.product_name.trim()) newErrors.product_name = "Product name is required";
        if (!editedProduct.description.trim()) newErrors.description = "Description is required";
        if (!editedProduct.price || editedProduct.price <= 0) newErrors.price = "Price must be greater than zero";
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = () => {
        if (validateForm()) {
            onSave(editedProduct);
            refetch();
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
                            isInvalid={!!errors.product_name}
                        />
                        <Form.Control.Feedback type="invalid">{errors.product_name}</Form.Control.Feedback>
                        
                        <h5>Description</h5>
                        <Form.Control 
                            as="textarea"
                            value={editedProduct.description}
                            onChange={(e) => handleInputChange("description", e.target.value)}
                            className="mb-2 no-resize"
                            style={{ height: "80px" }}
                            isInvalid={!!errors.description}
                        />
                        <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
                        
                        <h5>Price</h5>
                        <Form.Control
                            type="number"
                            value={editedProduct.price}
                            onChange={(e) => handleInputChange("price", e.target.value)}
                            className="mb-2"
                            isInvalid={!!errors.price}
                        />
                        <Form.Control.Feedback type="invalid">{errors.price}</Form.Control.Feedback>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Cancel</Button>
                <Button variant="success" onClick={handleSave}>
                    <FaSave /> Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
