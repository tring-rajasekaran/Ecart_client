import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import { BsCurrencyRupee } from "react-icons/bs";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useLocation } from "react-router-dom";
import useSearchProducts from "../../hooks/useSearchProducts";

export default function ProductSearch() {
    const location = useLocation();
    const searchedTerm = new URLSearchParams(location.search).get("search") || "";
    const { products, loading } = useSearchProducts(searchedTerm, 2000);

    // Pagination Setup
    const itemsPerPage = 8;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(products.length / itemsPerPage);

    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    return (
        <Container className="p-3 text-center">
            {loading ? (
                <p>Loading products...</p>
            ) : products.length === 0 ? (
                <p>No products found.</p>
            ) : (
                <>
                    <Row className="justify-content-center">
                        {currentProducts.map((product) => (
                            <Col key={product.product_id} lg={3} className="mb-4">
                                <Card style={{ width: "100%", height: "450px" }}>
                                    <Card.Img
                                        variant="top"
                                        src={product.image || "https://via.placeholder.com/300x120"}
                                        style={{ height: "220px", objectFit: "contain" }}
                                    />
                                    <Card.Body className="d-flex flex-column">
                                        <Card.Title>{product.product_name}</Card.Title>
                                        <Card.Text
                                            className="flex-grow-1 text-muted p-1"
                                            style={{
                                                maxHeight: "70px",
                                                overflowY: "auto",
                                                textOverflow: "ellipsis",
                                                whiteSpace: "normal"
                                            }}>
                                            {product.description}
                                        </Card.Text>
                                        <p>
                                            Price:{" "}
                                            <span className="text-success fw-bold">
                                                <BsCurrencyRupee className="mb-1 fw-bold" />
                                                {product.price}
                                            </span>
                                        </p>
                                        <Button variant="warning">Add to Cart</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>

                    {/* Pagination Buttons */}
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
                </>
            )}
        </Container>
    );
}
