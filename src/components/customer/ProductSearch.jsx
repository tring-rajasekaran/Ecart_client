import React, { useContext, useState } from "react";
import Card from "react-bootstrap/Card";
import { BsCurrencyRupee } from "react-icons/bs";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useLocation } from "react-router-dom";
import useSearchProducts from "../../hooks/useSearchProducts";
import toast from "react-hot-toast";
import useAddToCart from '../common/useAddtoCart';
import { DotLottieReact } from "@lottiefiles/dotlottie-react";


export default function ProductSearch() {
    const location = useLocation();
    const searchedTerm = new URLSearchParams(location.search).get("search") || "";
    const { products, loading } = useSearchProducts(searchedTerm, 3000);

    const itemsPerPage = 8;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(products.length / itemsPerPage);

    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const { addToCartHandler } = useAddToCart();

    const calculateOfferPrice = (price, offer) => {
        if (!offer || offer < 1 || offer > 50) return price;
        return Math.round(price - (price * offer) / 100);
      };

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
                                    {product.offer &&
                                        <div className="d-flex flex-row justify-content-end gap-1 " style={{ marginBottom: "-5px" }}>
                                            <h5 className="text-success">{product.offer}</h5>
                                            <DotLottieReact
                                                src="https://lottie.host/e52be1ea-23aa-48b6-96c8-5f2e5bf2e048/jok5rqbRw0.lottie"
                                                loop
                                                autoplay
                                                style={{
                                                    height: "30px",
                                                    width: "30px",
                                                }}
                                            />
                                        </div>
                                    }
                                    <Card.Img
                                        variant="top"
                                        src={product.image || "https://via.placeholder.com/300x120"}
                                        style={{ height: "190px", objectFit: "contain", ...(!product.offer && { marginTop: "20px" }) }}
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
                                            Price:
                                            {product.offer ? (
                                                <>
                                                    <span className='text-muted text-decoration-line-through ms-2'>
                                                        ₹{product.price}
                                                    </span>
                                                    <span className='text-success fw-bold ms-2'>
                                                        ₹{calculateOfferPrice(product.price, product.offer)}
                                                    </span>
                                                </>
                                            ) : (
                                                <span className='text-success fw-bold ms-2'>
                                                    ₹{product.price}
                                                </span>
                                            )}
                                        </p>
                                        <Button variant="warning" onClick={() => addToCartHandler(product?.product_id)}>Add to Cart</Button>
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
