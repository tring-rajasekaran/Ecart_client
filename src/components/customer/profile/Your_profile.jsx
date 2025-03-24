import React, { useState, useEffect } from "react";
import order_img from '../../../assets/customer/order.jpg';
import '../../customer/profile/Your_profile.css';
import { USER_DETAILS } from "../../../graphql/query/customerQuery";
import { useQuery } from "@apollo/client";

export default function Profile() {
  const { data, loading, error } = useQuery(USER_DETAILS);
  const [user, setUser] = useState({ name: "", email: "", address: "" }); 

  useEffect(() => {
    if (data && data.getCustomerDetails) {
      setUser(data.getCustomerDetails);
    }
  }, [data]);
  
  console.log(data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching user details</p>;

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="d-flex justify-content-center">
        <h1>Your Account</h1>
      </div>
      <div className="mt-2 d-flex flex-row justify-content-evenly ms-5">
        <div className="card p-3 border border-warning" style={{ width: "350px" }}>
          <div className="text-center position-relative">
            <div className="position-relative d-inline-block">
              <h4>Your Profile</h4>
            </div>
          </div>

          <div className="card-body">
            <div className="mb-2">
              <label className="fw-bold py-1">Name</label>
              {isEditing ? (
                <input
                  type="text"
                  className="form-control border border-none focus-ring focus-ring-warning"
                  name="name"
                  value={user.name} 
                  onChange={handleChange}
                />
              ) : (
                <p className="border p-2">{user.name}</p>
              )}
            </div>
            <div className="mb-2">
              <label className="fw-bold py-1">Email</label>
              <p className="border p-2 bg-light">{user.email}</p>
            </div>

            <div className="mb-2">
              <label className="fw-bold py-1">Delivery Address</label>
              {isEditing ? (
                <textarea
                  className="form-control border border-none focus-ring focus-ring-warning"
                  name="address"
                  rows="2"
                  value={user.address}  
                  onChange={handleChange}
                ></textarea>
              ) : (
                <p className="border p-2 h-50">{user.address}</p>
              )}
            </div>
            <button className="btn btn-warning w-100" onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? "Save" : "Edit"}
            </button>
          </div>
        </div>

        <div className="w-50">
          <div className="w-100 h-50 d-flex justify-content-around align-items-center p-2 mt-3 border border-warning rounded">
            <div className="w-100 h-100 ms-3">
              <img src={order_img} alt="Order" className="rounded float-center w-50" />
            </div>
            <div className="w-100 h-50 d-flex flex-column align-items-center justify-content-center me-3">
              <a className="btn rounded bg-warning border border-none p-2 mb-3" href="/orders">
                Your orders
              </a>
              <p>Please Check Your Orders!</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
