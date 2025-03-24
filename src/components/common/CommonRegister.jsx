import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function CommonRegister({ title, onSubmit }) {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword((prev) => !prev);

    const register_type = new URLSearchParams(location.search).get('type')

    const loginUrl = register_type === "Merchant" ? `/MerchantLogin?type=Merchant` : "/login";

    const password = watch("password");

    return (
        <div className="card p-3 shadow border border-warning" style={{ maxWidth: "400px" }}>
            <h2 className="text-center mb-3">{title}</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Name Field */}
                <div className="mb-2">
                    <label className="form-label">Name</label>
                    <input
                        type="text"
                        className={`form-control ${errors.name ? "is-invalid" : ""}`}
                        {...register("name", {
                            required: "Name is required",
                            minLength: { value: 3, message: "Name must be at least 3 characters" },
                        })}
                    />
                    {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
                </div>

                {/* Email Field */}
                <div className="mb-2">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className={`form-control ${errors.email ? "is-invalid" : ""}`}
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: "Invalid email address",
                            },
                        })}
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                </div>

                {/* Password Field */}
                <div className="mb-2">
                    <label className="form-label">Password</label>
                    <div className="input-group">
                        <input
                            type={showPassword ? "text" : "password"}
                            className={`form-control ${errors.password ? "is-invalid" : ""}`}
                            {...register("password", {
                                required: "Password is required",
                                minLength: { value: 6, message: "Password must be at least 6 characters long" },
                            })}
                        />
                        <button type="button" className="btn btn-outline-warning" onClick={togglePasswordVisibility}>
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                    {errors.password && <div className="invalid-feedback d-block">{errors.password.message}</div>}
                </div>

                {/* Confirm Password Field */}
                <div className="mb-2">
                    <label className="form-label">Confirm Password</label>
                    <div className="input-group">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
                            {...register("confirmPassword", {
                                required: "Confirm Password is required",
                                validate: (value) => value === password || "Passwords do not match",
                            })}
                        />
                        <button type="button" className="btn btn-outline-warning" onClick={toggleConfirmPasswordVisibility}>
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                    {errors.confirmPassword && <div className="invalid-feedback d-block">{errors.confirmPassword.message}</div>}
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn btn-warning w-100 text-white">{title}</button>

                {/* Login Link */}
                <div className="w-100 d-flex mt-2 justify-content-center">
                    <p>Already have an account? <a href={loginUrl} className="text-decoration-underline">Login</a></p>
                </div>
            </form>
        </div>
    );
}
