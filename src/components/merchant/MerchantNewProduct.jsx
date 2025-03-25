import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaArrowLeft } from "react-icons/fa";

export default function MerchantNewProduct() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [imagePreview, setImagePreview] = useState(null);
  const [imageUrl, setImageUrl] = useState(""); 
  const [isUploading, setIsUploading] = useState(false);

  const onSubmit = (data) => {
    if (!imageUrl) {
      alert("Please wait until the image is uploaded.");
      return;
    }
    const productData = { ...data, image: imageUrl };
    console.log("Product Data:", productData);
    alert("Product added successfully!");
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setIsUploading(true); // Prevent multiple uploads

      // Prepare form data
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("https://api.upload.io/v1/files/basic", {
          method: "POST",
          headers: {
            Authorization: "Bearer public_kW2K8HR3LZ43CXy53qZJJuZhG7ZT", 
          },
          body: formData,
        });

        const result = await response.json();
        if (result.fileUrl) {
          const publicUrl = result.fileUrl + "?public=1"; // Attempt to make it public
          setImageUrl(publicUrl);
          console.log("Public Image URL:", publicUrl);
        } else {
          alert("Image upload failed");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Error uploading image");
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <div>
      {/* Navbar */}
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
              {/* Left Column: Name & Description */}
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
                    className={`form-control ${errors.description ? "is-invalid" : ""}`}
                  />
                  {errors.description && <div className="invalid-feedback">{errors.description.message}</div>}
                </div>
              </div>

              {/* Right Column: Image & Price */}
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Product Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    {...register("image", { required: "Image is required" })}
                    className={`form-control ${errors.image ? "is-invalid" : ""}`}
                    onChange={handleImageChange}
                  />
                  {errors.image && <div className="invalid-feedback">{errors.image.message}</div>}

                  {/* Image Preview */}
                  {imagePreview && (
                    <img src={imagePreview} alt="Preview" className="mt-2 img-thumbnail" style={{ width: "100px", height: "100px" }} />
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

            {/* Submit Button */}
            <button type="submit" className="btn btn-warning w-100 fw-bold" disabled={!imageUrl || isUploading}>
              {isUploading ? "Uploading Image..." : "Add Product"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
 