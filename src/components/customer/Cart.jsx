import React from 'react'
import { BsCurrencyRupee } from "react-icons/bs";
import { MdDeleteForever } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";

export default function Cart() {
    return (
        <>
            <div className='w-100 h-100'>
                <div className='ms-5 py-3 d-flex align-items-center justify-content-center'>
                    <h3>Your Cart <FaShoppingCart className="fs-3 text-dark mb-1" /></h3>
                </div>
                <div className=' bg-light w-100 h-100 d-flex' style={{ background: "#E7E9EB" }}>
                    <div className="w-75 vh-50  border-end border-dark bg-light overflow-auto" style={{ maxHeight: "420px" }}>
                        <div className="container mt-4 ">
                            <div className="card border border-warning shadow w-100 p-4">
                                <div className="row g-0 align-items-center">
                                    <div className="col-md-4 d-flex">
                                        <input type="checkbox" className="me-2" />
                                        <img
                                            src="https://via.placeholder.com/150"
                                            className="img-fluid border border-dark rounded w-100"
                                            style={{ height: "200px", objectFit: "cover" }}
                                            alt="Product"
                                        />
                                    </div>

                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <h4 className="card-title">Product Name</h4>
                                            <textarea
                                                readOnly
                                                className="card-text border border-none w-100">
                                                This is the product description
                                            </textarea>
                                            <h5 className=" text-success fw-bold"> <BsCurrencyRupee /> 99,000</h5>
                                            <div className='d-flex justify-content-between w-100 align-items-center'>
                                                <button className="btn btn-warning mt-2">Order</button>
                                                <MdDeleteForever style={{ fontSize: "30px" }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="container mt-4">
                            <div className="card border border-warning shadow w-100 p-4">
                                <div className="row g-0 align-items-center">
                                    <div className="col-md-4 d-flex">
                                        <input type="checkbox" className="me-2" />
                                        <img
                                            src="https://via.placeholder.com/150"
                                            className="img-fluid border border-dark rounded w-100"
                                            style={{ height: "200px", objectFit: "cover" }}
                                            alt="Product"
                                        />
                                    </div>

                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <h4 className="card-title">Product Name</h4>
                                            <textarea
                                                readOnly
                                                className="card-text border border-none w-100">
                                                This is the product description
                                            </textarea>
                                            <h5 className="text-success fw-bold"> <BsCurrencyRupee />99,000</h5>
                                            <div className='d-flex justify-content-between w-100 align-items-center'>
                                                <button className="btn btn-warning mt-2">Order</button>
                                                <MdDeleteForever style={{ fontSize: "30px" }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="container mt-4">
                            <div className="card border border-warning shadow w-100 p-4">
                                <div className="row g-0 align-items-center">
                                    <div className="col-md-4 d-flex">
                                        <input type="checkbox" className="me-2" />
                                        <img
                                            src="https://via.placeholder.com/150"
                                            className="img-fluid border border-dark rounded w-100"
                                            style={{ height: "200px", objectFit: "cover" }}
                                            alt="Product"
                                        />
                                    </div>

                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <h4 className="card-title">Product Name</h4>
                                            <textarea
                                                readOnly
                                                className="card-text border border-none w-100">
                                                This is the product description
                                            </textarea>
                                            <h5 className="text-success fw-bold"> <BsCurrencyRupee />99,000</h5>
                                            <div className='d-flex justify-content-between w-100 align-items-center'>
                                                <button className="btn btn-warning mt-2">Order</button>
                                                <MdDeleteForever style={{ fontSize: "30px" }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=' w-25 h-100 align-items-center mt-5 p-3'>
                        <div className=' w-100 h-100'>
                            <div>
                                <h5>Sub Total ( 1 items) : <BsCurrencyRupee /> 55,000</h5>
                            </div>
                            <div className="d-flex align-items-center ms-5">
                                <input type="checkbox" className="me-2" style={{ transform: "translateY(1px)" }} />
                                <p className="m-0">Pack this item as Gift</p>
                            </div>
                            <button className="ms-5 mt-3 btn bg-success text-white rounded-pill px-4 py-2">
                                Proceed to Buy
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
