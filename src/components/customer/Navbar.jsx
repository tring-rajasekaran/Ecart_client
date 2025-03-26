import React, { useState, useEffect, useContext } from 'react';
import { FaUserLarge, FaLocationDot } from "react-icons/fa6";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";



import '@fortawesome/fontawesome-free/css/all.min.css';
import { GET_CART_QUANTITY } from '../../graphql/query/productQuery';
import { useMutation, useQuery } from '@apollo/client';
import { CustomerContext } from '../../App';
import { set } from 'react-hook-form';
// import { SET_SEARCHED_PRODUCT } from '../../graphql/mutation/customerMutation';

export default function Navbar() {
    const [userId, setUserId] = useState(true);
    const [showLoginAlert, setShowLoginAlert] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    const {quantity,setQuantity} = useContext(CustomerContext)


    // useEffect(() => {
    //     const storedUserId = localStorage.getItem('user_id');
    //     if (!storedUserId) {
    //         setShowLoginAlert(true);
    //     }
    //     setUserId(storedUserId);
    // }, []);

      const { data, loading, error } = useQuery(GET_CART_QUANTITY, { fetchPolicy: "no-cache" });
      useEffect(()=>{
        if(data?.getCartQuantity){
            setQuantity(data?.getCartQuantity);
        }
      },[data?.getCartQuantity])
      console.log("csrt fdgfhj", data?.getCartQuantity);
      
    //   const [saveSearch]  = useMutation(SET_SEARCHED_PRODUCT);
     

    useEffect(() => {
        if (searchTerm && searchTerm.trim() !== "") {
            navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
        }
    }, [searchTerm]); 


    const gotocart = () => {
        navigate("/cart")
    }
    const MerchantLogin = () => {
        navigate(`/MerchantLogin?type=Merchant`)
    }
    const CustomerLogin = () => {
        console.log("moving to login");
        navigate("login")
    }
    const moveTohome = () => {
        navigate("/slide")
    }

    return (
        <>
            {showLoginAlert && (
                <div className="position-fixed top-0 start-50 translate-middle-x mt-1 alert alert-danger text-center" style={{ zIndex: 1 }}>
                    <strong>Please login first!</strong> Click the user icon to log in.
                    <button type="button" className="btn-close ms-2 " onClick={() => setShowLoginAlert(false)}></button>
                </div>
            )}

            <nav className="navbar navbar-expand bg-warning w-100 d-flex justify-content-between px-4">
                <div className='d-flex align-items-center'>
                    <h5 className="navbar-brand" style={{ cursor: "pointer" }} onClick={() => moveTohome()}>E-cart</h5>
                    <div className='d-flex align-items-center gap-2 ms-3'>
                        <FaLocationDot className='mb-1' />
                        <h5 className='mb-1'>Chennai</h5>
                    </div>
                </div>
                <div>
                    <form className="d-flex w-100" role="search" onSubmit={(e) => e.preventDefault()}>
                        <div className="d-flex bg-white align-items-center p-2" style={{ width: "400px", height: "40px", borderRadius: "10px" }}>
                            <input
                                className="form-control border-0 shadow-none w-100 h-100"
                                type="search"
                                placeholder="Search Products"
                                aria-label="Search"
                                value={searchTerm} // Ensure the value stays after pressing Enter
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <FaSearch className="px-2 text-warning" style={{ fontSize: "35px" }} />
                        </div>
                    </form>

                </div>

                <div className="d-flex align-items-center gap-3">
                    <div className="position-relative">
                        <FaShoppingCart className="fs-3 text-dark" style={{ cursor: "pointer" }} onClick={() => gotocart()} />
                        <span className="position-absolute top-0 start-80 translate-middle badge rounded-pill bg-danger text-white">
                            {quantity}
                        </span>
                    </div>


                    <div className="dropdown">
                        <button className="btn btn-warning dropdown-toggle" data-bs-toggle="dropdown" type="button" aria-expanded="false">
                            <FaUserLarge />
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end mt-2 border border-none">
                            {userId ? (
                                <>
                                    <button className="dropdown-btn">
                                        <a className="dropdown-item" href="/MerchantLogin">Enter as Merchant</a>
                                    </button>
                                    <button className="dropdown-btn">
                                        <a className="dropdown-item" href="/orders">Orders</a>
                                    </button>
                                    <button className="dropdown-btn">
                                        <a className="dropdown-item" href="/profile">Your Profile</a>
                                    </button>
                                    <button className="dropdown-btn">
                                        <a className="dropdown-item" href="#">Logout</a>
                                    </button>
                                </>
                            ) : (
                                // <Fragment className="align-items-start d-flex flex-start">
                                // <button className="dropdown-item text-success fw-bold text-center" onClick={()=>CustomerLogin()} >Login </button>
                                // <button className="dropdown-item text-success fw-bold text-center" onClick={()=>MerchantLogin()}>Login as Merchant</button>
                                // </Fragment>
                                <>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}
