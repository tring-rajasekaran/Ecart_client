import React, { useState } from "react";
import { useForm  } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaArrowLeft } from "react-icons/fa";
import "../customer/profile/Your_profile.css";
import { UploadButton } from "@bytescale/upload-widget-react";
import { ADD_PRODUCT } from "../../graphql/mutation/merchantMutation";
import { useMutation } from "@apollo/client";


export default function MerchantNewProduct() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const [imagePreview, setImagePreview] = useState(null);

    const [addProduct]= useMutation(ADD_PRODUCT ,{fetchPolicy :"no-cache"});


    const onSubmit = async (data) => {
        const productData = { ...data, image: imagePreview };
        console.log(productData);
        
        if (!imagePreview) {
            alert("Please wait until the image is uploaded.");
        }

        try{
            const{data} = await addProduct({
                variables :{
                    input:{
                        description : productData.description,
                        image : productData.image,
                        price :parseInt( productData.price),
                        product_id : productData.product_id,
                        product_name : productData.productName
                    }
                }
            })
        }
        catch(err){
            console.log(err.message);
        }
        console.log("Product Data:", productData);
        alert("Product added successfully!");
        reset();
        setImagePreview(null)

    };

    const handleImg=(files)=>{
        console.log(files[0].fileUrl +" imgurl");
        setImagePreview(files[0].fileUrl)
    }

    const options = {
        apiKey: "public_kW2K8HR3LZ43CXy53qZJJuZhG7ZT", 
        maxFileCount: 1
      };

    return (
        <div>
            <nav className="navbar bg-warning p-2">
                <button className="btn btn-link text-dark" onClick={() => window.history.back()}>
                    <FaArrowLeft size={20} />
                </button>
                <h5 className="m-0 mx-auto">Add Product</h5>
            </nav>

            <div className="d-flex justify-content-center align-items-center mt-5 p-5 h-100">
                <div className="card p-4 shadow-lg" style={{ width: "600px" }}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label className="form-label">Product Name</label>
                                    <input
                                        type="text"
                                        {...register("productName", { required: "Product name is required" })}
                                        className={`form-control ${errors.productName ? "is-invalid" : ""}`}
                                    />
                                    {errors.productName && <div className="invalid-feedback">{errors.productName.message}</div>}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Description</label>
                                    <textarea
                                        {...register("description", { required: "Description is required" })}
                                        className={`form-control no-resize ${errors.description ? "is-invalid" : ""}`}
                                    />
                                    {errors.description && <div className="invalid-feedback">{errors.description.message}</div>}
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label className="form-label">Product Image</label><br></br>
                                    <UploadButton options={options} 
                                        onComplete={files => handleImg(files)}> 
                                        {({ onClick }) =>
                                            <button onClick={onClick} className="border border-none p-2 bg-warning rounded fw-bold">
                                                Upload a Image...
                                            </button>
                                        }
                                    </UploadButton>
                                    {errors.image && <div className="invalid-feedback">{errors.image.message}</div>}

                                    {imagePreview && (
                                        <img src={imagePreview} alt="Preview" className="mt-2 img-thumbnail" style={{ width: "200px", height: "200px" }} />
                                    )}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Price</label>
                                    <input
                                        type="number"
                                        {...register("price", { required: "Price is required", min: { value: 0, message: "Price cannot be negative" } })}
                                        className={`form-control ${errors.price ? "is-invalid" : ""}`}
                                    />
                                    {errors.price && <div className="invalid-feedback">{errors.price.message}</div>}
                                </div>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-warning w-100 fw-bold">
                            Add Product
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
