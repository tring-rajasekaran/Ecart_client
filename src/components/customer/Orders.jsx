import React, { useEffect, useState } from 'react'
import { BsCurrencyRupee } from "react-icons/bs";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useQuery } from '@apollo/client';
import { GET_ORDERED_PRODUCT } from '../../graphql/query/productQuery';

export default function Orders() {
    const [orderedProduct, setOrderProduct] = useState([]);

    const { data, loading, error } = useQuery(GET_ORDERED_PRODUCT);

    console.log(data, " responce");

    useEffect(() => {
        if (data && data.getOrdersProduct) {
            console.log(data.getOrdersProduct, " ordered product ");
            setOrderProduct(data.getOrdersProduct);
        }
    }, [data]);

    console.log(orderedProduct, " ordered ");

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error fetching Ordered Product</p>;

    return (
        <>
            <div className=''>
                <div className='p-1 ms-5'>
                    <p>
                        <a href="/profile" className="text-decoration-underline text-dark">Your Account</a>
                        <span className="text-warning"> &gt; Your Orders</span>
                    </p>
                </div>
                <div className='p-1 ms-5'>
                    <h3>Your Orders :</h3>
                </div>
            </div>
            <div className='d-flex justify-content-around'>
                <div className='w-75'>
                    <div className='py-2 w-100 overflow-auto' style={{ maxHeight: "420px" }}>
                        {orderedProduct.length > 0 ? (
                            orderedProduct.map((order, index) => (
                                <div key={index} className='border border-secondary rounded h-50 w-80 ms-5 mb-4'>
                                    <div className='w-100 px-2 rounded' style={{ backgroundColor: "#F0F2F2" }}>
                                        <div className='w-50 h-25 d-flex flex-row justify-content-between align-items-center'>
                                            <p className='text-success fw-bold mt-3'>ORDER PLACED</p>
                                            <div className='d-flex flex-column'>
                                                <p className="mb-0">TOTAL :</p>
                                                <p className="mb-0"><BsCurrencyRupee className='mb-1' />{order.price * order.quantity}</p>
                                            </div>
                                            <div className='d-flex flex-column'>
                                                <p className="mb-0">SHIPPED TO:</p>
                                                <p className="mb-0">{order.customer_name}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row g-0 align-items-center p-2">
                                        <div className="col-md-4 d-flex">
                                            <img
                                                src={order.image || "https://via.placeholder.com/150"}
                                                className="img-fluid border border-dark rounded w-100"
                                                style={{ height: "200px", objectFit: "cover" }}
                                                alt="Product"
                                            />
                                        </div>
                                        <div className="col-md-8 px-5">
                                            <div className="card-body">
                                                <h4 className="card-title py-2">{order.product_name}</h4>
                                                <textarea
                                                    readOnly
                                                    className="card-text border border-none w-100 no-resize">
                                                    {order.description}
                                                </textarea>
                                                <h5 className="text-success fw-bold">
                                                    <BsCurrencyRupee className='mb-1' />{order.price}
                                                </h5>
                                                <p className="mb-0">Quantity: {order.quantity}</p>
                                                <div className='d-flex justify-content-between w-100 align-items-center'>
                                                    <button className="btn btn-warning mt-2">Order Again</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center">No orders found.</p>
                        )}
                    </div>
                </div>

                <div className="w-25 d-flex flex-column align-items-center justify-content-center gap-0">
                    <h4 className="fw-bold text-center mb-0">Total Number of <br />Orders: {orderedProduct.length}</h4>
                    <DotLottieReact
                        style={{ height: "100px", width: "200px" }}
                        src="https://lottie.host/b745b49a-b1ed-4011-8ff4-10698942fc70/zLes5owXRH.lottie"
                        loop
                        autoplay
                        speed={1}
                    />
                </div>
            </div>
        </>
    )
}
