import React, { useEffect, useState } from 'react'
import { BsCurrencyRupee } from "react-icons/bs";
import { useMutation, useQuery } from '@apollo/client';
import { GET_MERCHANT_ORDER, UPDATE_MERCHANT_ORDER } from '../../graphql/query/merchantQuery';
import { toast } from "react-hot-toast";
import { FaArrowLeft } from 'react-icons/fa6';


export default function MerchantOrders() {

    const [changeOrderStatus] = useMutation(UPDATE_MERCHANT_ORDER, { fetchPolicy: "no-cache" })
    const { data, loading, error, refetch } = useQuery(GET_MERCHANT_ORDER);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (data && data.getMerchantOrders) {
            setProducts(data.getMerchantOrders);
        }
    }, [data]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}Error fetching Ordered Product</p>;

    console.log(products, "ordered product");

    const ChangeStatus = async (statusofOrder, product_id) => {
        console.log(statusofOrder, " <<<<<<<<<<< ", product_id);

        try {
            const res = await changeOrderStatus({
                variables: {
                    product_id: product_id,
                    statusofOrder: statusofOrder,
                },
            });
            statusofOrder === "accepted" ? toast.success("Order Accepted") : toast.success("Order Rejected")
            console.log("Order status updated: ", res.data.updateMerchantOrder);
        } catch (err) {
            console.error("Error updating order status:", err);
        }
    };

    return (
        <>
            <div className=''>
                <div className='p-2 ms-0 bg-warning d-flex'>
                    <div className='d-flex w-50 justify-content-between'>
                        <button className="btn btn-link text-dark mb-1" onClick={() => window.history.back()}>
                            <FaArrowLeft size={20} />
                        </button>
                        <h3>Your Orders</h3>
                    </div>
                </div>
            </div>
            <div className='d-flex justify-content-around'>
                <div className='w-75'>
                    <div className='py-2 w-100 overflow-auto' style={{ maxHeight: "530px" }}>
                        {products.map((product, index) => (
                            <div key={index} className='border border-secondary rounded h-50 w-80 ms-5 mb-4'>
                                <div className='w-100 px-2 rounded d-flex justify-content-between' style={{ backgroundColor: "#F0F2F2" }}>
                                    <div className='w-50 h-25 d-flex flex-row justify-content-between align-items-center'>
                                        <p className='text-success fw-bold mt-3'>ORDERED</p>
                                        <div className='d-flex flex-column'>
                                            <p className="mb-0">TOTAL :</p>
                                            <p className="mb-0"><BsCurrencyRupee className='mb-1' />{product.price}</p>
                                        </div>
                                        <div className='d-flex flex-column'>
                                            <p className="mb-0">ORDERED BY:</p>
                                            <p className="mb-0">{product.name} </p>
                                        </div>
                                    </div>
                                    <div className='align-items-center gap-3 d-flex justify-content-center'>
                                        <span className="border border-none p-2 rounded bg-secondary text-light">
                                            Quantity : {product.quantity}
                                        </span>
                                        {product.order_status === "accepted" ? (
                                            <span className="border border-none p-2 rounded bg-success text-light">Accepted</span>
                                        ) : product.order_status === "rejected" ? (
                                            <span className="border border-none p-2 rounded bg-danger text-light">Rejected</span>
                                        ) : (
                                            product.order_status === "pending" && (
                                                <>
                                                    <button onClick={() => ChangeStatus("accepted", product.product_id)} className='border border-none p-2 rounded bg-success text-light'>
                                                        Accept
                                                    </button>
                                                    <button onClick={() => ChangeStatus("rejected", product.product_id)} className='border border-none p-2 rounded bg-danger text-light'>
                                                        Reject
                                                    </button>
                                                </>
                                            )
                                        )}
                                    </div>

                                </div>
                                <div className="row g-0 align-items-center p-2">
                                    <div className="col-md-4 d-flex">
                                        <img
                                            src={product.image}
                                            className="img-fluid rounded w-100"
                                            style={{ height: "200px", objectFit: "contain" }}
                                            alt="Product"
                                        />
                                    </div>
                                    <div className="col-md-8 px-5">
                                        <div className="card-body">
                                            <h4 className="card-title py-2">{product.product_name}</h4>
                                            <textarea
                                                readOnly
                                                className="card-text border border-none w-100 no-resize">
                                                {product.description}
                                            </textarea>
                                            <h5 className="text-success fw-bold"><BsCurrencyRupee className='mb-1' />{product.price}</h5>
                                            <div className='d-flex justify-content-start w-100 align-items-end gap-2'>
                                                <p><span className='fw-bold'>Address:</span> {product.address}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="w-25 d-flex flex-column align-items-center justify-content-center gap-0">
                    <h4 className="fw-bold text-center mb-0">Total Number of <br />Orders: {products.length}</h4>
                </div>
            </div>
        </>
    )
}
