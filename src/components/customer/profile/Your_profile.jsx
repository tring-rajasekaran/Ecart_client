import React, { useState, useEffect } from "react";
import order_img from '../../../assets/customer/order.jpg';
import '../../customer/profile/Your_profile.css';
import { USER_DETAILS } from "../../../graphql/query/customerQuery";
import { UPDATE_CUSTOMER_DETAILS } from "../../../graphql/mutation/customerMutation";
import { useQuery, useMutation } from '@apollo/client';
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Profile() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  const { loading, error, data } = useQuery(USER_DETAILS, {
    variables: { id: 2 },
  });

  const [updateCustomerDetails] = useMutation(UPDATE_CUSTOMER_DETAILS);

  useEffect(() => {
    if (data && data.getCustomerDetails?.length > 0) {
      setFormData({
        name: data.getCustomerDetails[0].name ,
        email: data.getCustomerDetails[0].email,
        address: data.getCustomerDetails[0].address || "Add your Delivery Address By clicking Edit Button ⬇️",
      });
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    console.log(+ formData.name + " address ");
  }, [formData.address]);

  const handleSave = async () => {
    try {
      if(formData.name ==="" || formData.address===""){
         toast("⚠️ Cannot be empty")
         return;
      }
      await updateCustomerDetails({
        variables: {
          name: formData.name,
          address: formData.address,
        },
      });

      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating profile:", err);
      toast.error("Failed to update profile!");
    }
  };


  return (
    <>
      <div className="d-flex justify-content-center">
        <h1>Your Account</h1>
      </div>
      <div className="mt-2 d-flex flex-row justify-content-evenly ms-5">
        <div className="card p-3 border border-warning" style={{ width: "350px" }}>
          <div className="text-center position-relative">
            <h4>Your Profile</h4>
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
                  className="form-control border border-none focus-ring focus-ring-warning no-resize"
                  rows="2"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                ></textarea>
              ) : (
                <p className="border p-2 h-50">
                  {formData.address.trim() !== "" ? formData.address : "Please fill your delivery address by clicking the edit button."}
                </p>
              )}
            </div>

            <button className="btn btn-warning w-100" onClick={isEditing ? handleSave : () => setIsEditing(true)}>
              {isEditing ? "Save" : "Edit"}
            </button>
          </div>
        </div>

        {/* Orders Section */}
        <div className="w-50">
          <div className="w-100 h-50 d-flex justify-content-around align-items-center p-2 mt-3 border border-warning rounded">
            <div className="w-100 h-100 ms-3">
              <img src={order_img} alt="Order" className="rounded float-center w-50" />
            </div>
            <div className="w-100 h-50 d-flex flex-column align-items-center justify-content-center me-3">
              <button
                className="btn rounded bg-warning border border-none p-2 mb-3"
                onClick={() => navigate("/orders")}>Your orders</button>   
              <p>Please Check Your Orders!</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
