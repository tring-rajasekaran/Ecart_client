import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function CommonLogin({ title, onSubmit, showRegisterLink }) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const login_type = new URLSearchParams(location.search).get('type')

  const registerUrl = login_type === "Merchant" ? "/MerchantRegister?type=Merchant" : "/register";

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="card p-4 shadow border border-warning">
      <h2 className="text-center">{title}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Email Field */}
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="text"
            className={`form-control border border-none focus-ring focus-ring-warning ${errors.email ? "is-invalid" : ""}`}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email address"
              }
            })}
          />
          {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
        </div>

        {/* Password Field */}
        <div className="mb-3 position-relative">
          <label className="form-label">Password</label>
          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              className={`form-control border border-none focus-ring focus-ring-warning ${errors.password ? "is-invalid" : ""}`}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long"
                }
              })}
            />
            <button
              type="button"
              className="btn btn-outline-warning text-black padding-2px"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.password && <div className="invalid-feedback d-inline">{errors.password.message}</div>}
        </div>

        {/* Forgot Password */}
        <div className="mb-3 text-end">
          <a href="#" className="text-decoration-underline text-black">Forgot Password?</a>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-warning w-100 text-white">
          {title}
        </button>

        {showRegisterLink && (
          <div className="w-100 d-flex mt-3 justify-content-center">
            <p>Don't have an Account ? 
            <a href={registerUrl} className="text-decoration-underline">Register </a>
              </p>
          </div>
        )}
      </form>
    </div>
  );
}
