import React from 'react'
import { BsCurrencyRupee } from "react-icons/bs";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';


export default function MerchantOrders() {
    return (
        <>
            <div className=''>
                <div className='p-2 ms-0 bg-warning'>
                    <h3>Your Orders :</h3>
                </div>
            </div>
            <div className='d-flex justify-content-around'>
                <div className='w-75'>
                    <div className='py-2 w-100  overflow-auto ' style={{ maxHeight: "530px" }}>
                        <div className='border border-secondary rounded h-50 w-80 ms-5 mb-4'>
                            <div className=' w-100 px-2 rounded' style={{ backgroundColor: "#F0F2F2" }}>
                                <div className='w-50 h-25  d-flex flex-row justify-content-between align-items-center'>
                                    <p className='text-success fw-bold mt-3'>ORDERED</p>
                                    <div className='d-flex flex-column'>
                                        <p className="mb-0">TOTAL :</p>
                                        <p className="mb-0"><BsCurrencyRupee className='mb-1' />530</p>
                                    </div>
                                    <div className='d-flex flex-column'>
                                        <p className="mb-0">ORDERED BY:</p>
                                        <p className="mb-0">Rajasekaran</p>
                                    </div>
                                </div>
                            </div>
                            <div className="row g-0 align-items-center p-2">
                                <div className="col-md-4 d-flex">
                                    <img
                                        src="https://via.placeholder.com/150"
                                        className="img-fluid border border-dark rounded w-100 "
                                        style={{ height: "200px", objectFit: "cover" }}
                                        alt="Product"
                                    />
                                </div>
                                <div className="col-md-8 px-5">
                                    <div className="card-body">
                                        <h4 className="card-title py-2">Product Name</h4>
                                        <textarea
                                            readOnly
                                            className="card-text border border-none w-100">
                                            This is the product description
                                        </textarea>
                                        <h5 className=" text-success fw-bold"> <BsCurrencyRupee className='mb-1' />99,000</h5>
                                        <div className='d-flex justify-content-start w-100 align-items-end gap-2'>
                                            <p>Details: </p>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-25 d-flex flex-column align-items-center justify-content-center gap-0">
                    <h4 className="fw-bold text-center mb-0">Total Number of <br />Orders: 3</h4>
                </div>

            </div>


        </>
    )
}

