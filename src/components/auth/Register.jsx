import React from "react";
import CommonRegister from "../common/CommonRegister";

export default function Register() {
  const handleRegister = (data) => {
    console.log("Register Data:", data);
  };

  return (
    <div className="container">
      <div className="row d-flex justify-content-center align-items-center">
        <div className="col-md-4 mt-5">
          <CommonRegister title="Register" onSubmit={handleRegister} />
        </div>
      </div>
    </div>
  );
}
 