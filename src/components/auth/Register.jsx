import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Register() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
    };

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <div className="container d-flex justify-content-center align-items-center mt-4">
            <div className="row w-100 justify-content-center">
                <div className="col-12 col-sm-8 col-md-6 col-lg-4">
                    <div className="card p-4 shadow border border-warning">
                        <h2 className="text-center mb-4">Register</h2>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-3">
                                <label className="form-label ">Name</label>
                                <input
                                    type="text"
                                    className={`form-control border border-none focus-ring focus-ring-warning ${errors.name ? 'is-invalid' : ''}`}
                                    {...register("name", {
                                        required: "Name is required",
                                        minLength: {
                                            value: 3,
                                            message: "Name must atleast 3 characters"
                                        },
                                    },

                                    )}
                                />
                                {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input
                                    type="text"
                                    className={`form-control border border-none focus-ring focus-ring-warning ${errors.email ? 'is-invalid' : ''}`}
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
                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <div className="input-group">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        className={`form-control border border-none focus-ring focus-ring-warning ${errors.password ? 'is-invalid' : ''}`}
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
                                        className="btn btn-outline-warning "
                                        onClick={togglePasswordVisibility}
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                                {errors.password && <div className="invalid-feedback d-block">{errors.password.message}</div>}
                            </div>
                            <button type="submit" className="btn btn-warning w-100 text-white">Register</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}