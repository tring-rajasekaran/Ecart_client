import React, { useContext, useEffect, useState } from "react";
import { BsCurrencyRupee } from "react-icons/bs";
import { MdDeleteForever } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { GET_CART_PRODUCT } from "../../graphql/query/productQuery";
import { REMOVE_FROM_CART } from "../../graphql/mutation/customerMutation";
import { useQuery, useMutation } from "@apollo/client";
import { CustomerContext } from "../../App";

export default function Cart() {
  const { data, loading, error } = useQuery(GET_CART_PRODUCT, { fetchPolicy: "no-cache" });
  const [cartProducts, setCartProducts] = useState([]);
  const {quantity,setQuantity} = useContext(CustomerContext);
  const [selectedProduct , setSelectedProduct] = useState([]);

  const [deleteCartProduct] = useMutation(REMOVE_FROM_CART, {
    onCompleted: (response) => {
      console.log("Product removed:", response);
    },
    onError: (error) => {
      console.error("Error removing product:", error);
    },
  });

  useEffect(() => {
    if (data?.getCartProducts) {
      setCartProducts(data.getCartProducts);
    }
  }, [data]);

  const handleDelete = async (id) => {
    try {
      await deleteCartProduct({ variables: { product_id: id } });
      setCartProducts((prev) => prev.filter((product) => product.product_id !== id));
      setQuantity(quantity-1);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <>
      <div className="w-100 h-100">
        <div className="ms-5 py-3 d-flex align-items-center justify-content-center">
          <h3>
            Your Cart <FaShoppingCart className="fs-3 text-dark mb-1" />
          </h3>
        </div>
        <div className="bg-light w-100 h-100 d-flex" style={{ background: "#E7E9EB" }}>
          <div className="w-75 vh-50 border-end border-dark bg-light overflow-auto" style={{ maxHeight: "420px" }}>
            <div className="container mt-4">
              {cartProducts.length > 0 ? (
                cartProducts.map((product) => (
                  <div key={product.product_id} className="card border border-warning shadow w-100 p-4 mb-3">
                    <div className="row g-0 align-items-center">
                      <div className="col-md-4 d-flex">
                        <input type="checkbox" className="me-2" checked=""/>
                        <img
                          src={product.image || "https://via.placeholder.com/150"}
                          className="img-fluid rounded w-100 p-3"
                          style={{ height: "200px", objectFit: "contain" }}
                          alt={product.product_name}
                        />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <h4 className="card-title">{product.product_name}</h4>
                          <textarea readOnly className="card-text border w-100 no-resize">
                            {product.description}
                          </textarea>
                          <h5 className="text-success fw-bold">
                            <BsCurrencyRupee /> {product.price}
                          </h5>
                          <div className="d-flex justify-content-between w-100 align-items-center">
                            <button className="btn btn-warning mt-2"></button>
                            <MdDeleteForever className="text-danger"
                              onClick={() => handleDelete(product.product_id)}
                              style={{ cursor: "pointer", fontSize: "30px" }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center align-items-center">Your cart is empty.</p>
              )}
            </div>
          </div>
          <div className="w-25 h-100 align-items-center mt-5 p-3">
            <div className="w-100 h-100">
              <div>
                <h5>
                  Sub Total ({cartProducts.length} items): <BsCurrencyRupee />{" "}
                  {cartProducts.reduce((total, item) => total + item.price * item.quantity, 0)}
                </h5>
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
  );
}
