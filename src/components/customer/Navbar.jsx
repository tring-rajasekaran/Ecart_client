import React, { useState, useEffect, useContext } from 'react';
import { FaLocationDot } from "react-icons/fa6";
import { FaSearch, FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';
import {GET_RECENT_SEARCH } from '../../graphql/query/productQuery';
import { useMutation, useQuery } from '@apollo/client';
import { CustomerContext } from '../../App';
import LogoutModal from './LogoutModal'
import Location from './Location';
import { LOG_OUT } from '../../graphql/mutation/merchantMutation';
import toast from 'react-hot-toast';


export default function Navbar() {
    const [userId, setUserId] = useState(true);
    const [showLoginAlert, setShowLoginAlert] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const { quantity, setQuantity, isLogin, setIsLogin, jwt } = useContext(CustomerContext)
    const [searchedTerm, setSearchedTerm] = useState([]);
    const [showRecent, setShowRecent] = useState(false);
    const [logoutPopup, setLogoutPopup] = useState(false);

    const [address, setAddress] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [locationPopup, setLocationPopup] = useState(false);
    const navigate = useNavigate()

    const [logoutmutation] = useMutation(LOG_OUT)




    const { data: Searchdata } = useQuery(GET_RECENT_SEARCH, { fetchPolicy: "no-cache", skip: !isLogin });

    // console.log(Searchdata?.getRecentSearch,"Searchdata");


    useEffect(() => {
        if (Searchdata?.getRecentSearch) {
            console.log(Searchdata?.getRecentSearch);
            setSearchedTerm(Searchdata?.getRecentSearch.map(item => item.searched_product_name));
        }
    }, [Searchdata]);

    // console.log(searchedTerm + " searhed term");



    useEffect(() => {
        if (searchTerm && searchTerm?.trim() !== "") {
            navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
        }
    }, [searchTerm]);



    const gotocart = () => {
        console.log(!jwt + " login state");
        navigate("/cart");
    }




    const moveTohome = () => {
        navigate("/slide")
    }
    const logout = () => {
        console.log("logout >>>>>>>>>>>>>>>>>>");
        setLogoutPopup(true);
    }
    const handlelogoutClose = () => setLogoutPopup(false);
    const handlelogout = async () => {
        const { data: logout } = await logoutmutation()
        toast.success(logout?.logout)
        setLogoutPopup(false)
        setQuantity(0)
        setIsLogin(false)
        setSearchedTerm([]);
        localStorage.clear();
        navigate("/login")
    }

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;

                    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)
                        .then((response) => response.json())
                        .then((data) => {
                            setAddress(data.display_name);
                            setLoading(false);
                        })
                        .catch((error) => {
                            setError("Error fetching address");
                            setLoading(false);
                        });
                },
                (error) => {
                    setError("Error getting location");
                    setLoading(false);
                }
            );
        } else {
            setError("Geolocation is not available");
            setLoading(false);
        }
    }, []);
    const ShowLocation = () => {
        setLocationPopup(true);
    }
    const handleLocationPopup = () => {
        setLocationPopup(false);
    }
    // console.log(address + " address");
    const CustomerLogin = () => {
        navigate("/login");
    }
    const MerchantLogin = () => {
        navigate("/MerchantLogin?type=Merchant")
    }
    const EnterMerchant = async () => {
        const { data: logout } = await logoutmutation()
        toast.success("Logged out and Enter into Merchant")
        setLogoutPopup(false)
        setQuantity(0)
        setIsLogin(false)
        setSearchedTerm([]);
        navigate("/MerchantLogin?type=Merchant")
    }


    console.log(jwt, " jwt ");

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
                    <div className='d-flex align-items-center gap-2 ms-3' style={{ cursor: "pointer" }} onClick={() => ShowLocation()}>
                        <FaLocationDot className='mb-1' />
                        <h5 className='mb-1'>Chennai</h5>
                    </div>
                    <div className="position-relative px-3">
                        <FaShoppingCart className="fs-3 text-dark" style={{ cursor: "pointer" }} onClick={() => gotocart()} />
                        <span className="position-absolute top-0 start-80 translate-middle badge rounded-pill bg-danger text-white">
                            {quantity}
                        </span>
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
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onFocus={() => setShowRecent(true)}
                                onBlur={() => setTimeout(() => {
                                    setShowRecent(false)
                                }, 1000)}
                            />
                            <FaSearch className="px-2 text-warning" style={{ fontSize: "35px" }} />
                            {showRecent && searchedTerm.length > 0 && (
                                <ul
                                    className="list-group position-absolute shadow bg-white rounded"
                                    style={{
                                        top: "100%",
                                        left: "50", width: "30%", zIndex: 1000, maxHeight: "200px", overflowY: "auto",
                                    }}>
                                    {searchedTerm.map((term, index) => (
                                        <li
                                            key={index}
                                            className="list-group-item list-group-item-action"
                                            onMouseDown={() => setSearchTerm(term)}
                                            style={{
                                                cursor: "pointer",
                                                padding: "10px",
                                            }}>
                                            {term}
                                        </li>
                                    ))}
                                </ul>
                            )}

                        </div>
                    </form>

                </div>

                <div className="d-flex align-items-center gap-3">
                    <div>
                        {localStorage.getItem("username") &&
                            <h5>Hello ,{localStorage.getItem("username")}</h5>
                        }
                    </div>


                    <div className="dropdown">
                        <button className="btn btn-warning " data-bs-toggle="dropdown" type="button" aria-expanded="false">
                            <FaUserCircle style={{ height: "30px ", width: "30px", marginLeft: "-20px" }} />
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end mt-2 bg-carning border border-none">
                            {localStorage.getItem("username") ? (
                                <>
                                    <button className="dropdown-btn">
                                        <a className="dropdown-item" onClick={() => EnterMerchant()}>Enter as Merchant</a>
                                    </button>
                                    <button className="dropdown-btn">
                                        <a className="dropdown-item" onClick={() => navigate("/orders")}>Orders</a>
                                    </button>
                                    <button className="dropdown-btn">
                                        <a className="dropdown-item" onClick={() => navigate("/profile")}>Your Profile</a>
                                    </button>
                                    <button className="dropdown-btn">
                                        <a className="dropdown-item" onClick={() => logout()}>Logout</a>
                                    </button>
                                </>
                            ) : (
                                <>
                                    <div className="align-items-start d-flex flex-column flex-start">
                                        <button className="dropdown-item text-success fw-bold text-center" onClick={() => CustomerLogin()} >Login </button>
                                        <button className="dropdown-item text-success fw-bold text-center" onClick={() => MerchantLogin()}>Login as Merchant</button>
                                    </div>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>

            {logoutPopup &&
                <>
                    <LogoutModal
                        show={true}
                        handleClose={handlelogoutClose}
                        handleLogout={handlelogout}
                    />
                </>
            }

            {locationPopup &&
                <Location
                    show={true}
                    handleClose={handleLocationPopup}
                    address={address}
                />
            }
        </>
    );
}
