import React, { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import order_img from '../../../assets/customer/order.jpg'
import '../../customer/profile/Your_profile.css'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "Rajasekaran",
    email: "Rajasekaran@gmail.com",
    address: "3/2 Thiruvalluvar street Othakkal mandapam ",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
              <h4>Your Profile </h4>
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
                  value={formData.name}
                  onChange={handleChange}
                />
              ) : (
                <p className="border p-2">{formData.name}</p>
              )}
            </div>
            <div className="mb-2">
              <label className="fw-bold py-1">Email</label>
              <p className="border p-2 bg-light">{formData.email}</p>
            </div>

            <div className="mb-2">
              <label className="fw-bold py-1">Delivery Address</label>
              {isEditing ? (
                <textarea
                  className="form-control border border-none focus-ring focus-ring-warning"
                  rows="2"
                  value={formData.address}
                  onChange={handleChange}
                ></textarea>
              ) : (
                <p className="border p-2 h-50">{formData.address}</p>
              )}
            </div>
            <button
              className="btn btn-warning w-100"
              onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? "Save" : "Edit"}
            </button>
          </div>
        </div>

        <div className="w-50">
          <div className="w-100 h-50 d-flex justify-content-around align-items-center p-2 mt-3 border border-warning rounded">
            <div className="w-100 h-100 ms-3">
              <img src={order_img} alt="Order" className="rounded float-center w-50" />
            </div>
            <div className="w-100 h-50 d-flex flex-column align-items-center justify-content-center me-3 ">
              <button className="btn rounded bg-warning border border-none p-2 mb-3" href="/orders">Your orders</button>
              <p>Please Check Your Orders !</p>
            </div>
          </div>
          <div className="w-100 h-50 d-flex justify-content-center align-items-center">
           
          </div>

        </div>
      </div>
    </>
  );
}



