import React, { useContext, useEffect, useState } from "react";
import { BsCurrencyRupee } from "react-icons/bs";
import { MdDeleteForever } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { GET_CART_PRODUCT } from "../../graphql/query/productQuery";
import { ADD_TO_ORDER, REMOVE_FROM_CART } from "../../graphql/mutation/customerMutation";
import { useQuery, useMutation } from "@apollo/client";
import { CustomerContext } from "../../App";
import { toast } from "react-hot-toast";
import { MdRemoveShoppingCart } from "react-icons/md";


export default function Cart() {
    const { data, loading, error } = useQuery(GET_CART_PRODUCT, { fetchPolicy: "no-cache" });
    const [cartProducts, setCartProducts] = useState([]);
    const { quantity, setQuantity } = useContext(CustomerContext);
    const [selectedProducts, setSelectedProducts] = useState([]);

    const [orderedProduct , setOrderProduct] = useState([])
    const [terms , setTerms] = useState(false);

    const [deleteCartProduct] = useMutation(REMOVE_FROM_CART, { fetchPolicy: "no-cache" });

    useEffect(() => {
        if (data?.getCartProducts) {
            setCartProducts(data.getCartProducts);
            setSelectedProducts(data.getCartProducts.map((product) => product.product_id));
        }
    }, [data]);

    console.log(cartProducts  ,+" products");
    console.log(selectedProducts," selected");
    
    
   

    const handleDelete = async (id) => {
        try {
            await deleteCartProduct({ variables: { product_id: id } });
            setCartProducts((prev) => prev.filter((product) => product.product_id !== id));
            setSelectedProducts((prev) => prev.filter((productId) => productId !== id));
            setQuantity(quantity - 1);
            toast.success("Removed from cart!")

        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const handleCheckboxChange = (id) => {
        setSelectedProducts((prev) =>
            prev.includes(id) ? prev.filter((productId) => productId !== id) : [...prev, id]
        );
    };

    const subtotal = cartProducts
        .filter((product) => selectedProducts.includes(product.product_id))
        .reduce((total, item) => total + item.price * item.quantity, 0);


    const handleQuantityChange = (id, type) => {
        setCartProducts((prev) =>
            prev.map((product) =>
                product.product_id === id
                    ? {
                        ...product,
                        quantity: type === "increase"
                            ? Math.min(product.quantity + 1, 4) 
                            : Math.max(product.quantity - 1, 1), 
                    }
                    : product
            )
        );
    };
    const order=(  product_id ,quantity)=>{
        console.log("quantity: ",quantity+1);
        console.log("product_id ",product_id);
        
        
    }

    const [setOrder] = useMutation(ADD_TO_ORDER ,{fetchPolicy:"no-cache"});
    useEffect(() => {
        setOrderProduct(cartProducts.filter((product) => selectedProducts.includes(product.product_id)));
      }, [cartProducts, selectedProducts]); 
    
      const orderData = orderedProduct.map(({ product_id, quantity }) => ({ product_id, quantity }));
    
      const confirmOrder = async () => {
        try {
          await setOrder({ variables: { orders: orderData } }); 
          toast.success("Order placed successfully!");
        } catch (error) {
          console.error("Order Error:", error);
        }
      };



    console.log(typeof(JSON.stringify(orderData)) + " orderdata"); 
    
    const Terms=(event)=>{
        setTerms(event.target.checked);
        if(!terms){
            toast(
                "⚠️Once You placed Order it cannot be canceled, \n\n So please check Twice before ordering products",
                {
                  duration: 7000,
                  position: "top-center",
                }
              );
        }
    }
    console.log(terms +" initial ");
    

    return (
        <>
            <div className="w-100 h-100">
                <div className="ms-5 py-3 d-flex align-items-center justify-content-center">
                    <h3>
                        Your Cart <FaShoppingCart className="fs-3 text-dark mb-1" />
                    </h3>
                </div>

                <div className="w-100 h-100 d-flex" >
                    <div className="w-75 vh-50 border-end border-dark overflow-auto" style={{ maxHeight: "450px" }}>
                        <div className="container mt-4">
                            {cartProducts.length > 0 ? (
                                cartProducts.map((product) => (
                                    <div key={product.product_id} className="card border border-warning shadow w-100 p-4 mb-3">
                                        <div className="row g-0 align-items-center">
                                            <div className="col-md-4 d-flex">
                                                <input
                                                    type="checkbox"
                                                    className="me-2"
                                                    checked={selectedProducts.includes(product.product_id)}
                                                    onChange={() => handleCheckboxChange(product.product_id)}
                                                />
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
                                                        <div className="d-flex align-items-center">
                                                            <button onClick={() => {handleQuantityChange(product.product_id, "decrease") ;order(product.product_id , product.quantity)}} 
                                                                className="btn btn-outline-warning"
                                                                disabled={product.quantity === 1}
                                                                > -</button>
                                                            <span className="mx-2"  >{product.quantity } </span>
                                                            <button
                                                                className="btn btn-outline-warning"
                                                                onClick={() => {handleQuantityChange(product.product_id, "increase") ;order(product.product_id , product.quantity)}} 
                                                                disabled={product.quantity === 4}
                                                            > + </button>
                                                                
                                                            
                                                        </div>
                                                        <MdDeleteForever
                                                            className="text-danger"
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
                                <p className="text-center align-items-center fw-bold fs-4" >Your cart is empty . <MdRemoveShoppingCart className="fs-3" /></p>
                            )}
                        </div>
                    </div>
                    <div className="w-25 h-100 align-items-center mt-5 p-3">
                        <div className="w-100 h-100">
                            <div>
                                <h5>
                                    Sub Total ({selectedProducts.length} items): <BsCurrencyRupee /> {subtotal}
                                </h5>
                            </div>
                            <div className="d-flex align-items-center ms-5">
                                <input type="checkbox" className="me-2" onChange={Terms} style={{ transform: "translateY(1px)" }} />
                                <p className="m-0">Terms and Condition</p>
                            </div>
                            <button className="ms-5 mt-3 btn bg-success text-white rounded-pill px-4 py-2" onClick={()=>confirmOrder()} disabled={!terms} >
                                Proceed to Buy
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
