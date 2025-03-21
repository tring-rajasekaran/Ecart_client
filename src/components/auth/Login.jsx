import React from "react";
import CommonLogin from "../common/CommonLogin";

export default function Login() {
  const handleLogin = (data) => {
    console.log("Login Data:", data);
  };

  return (
    <div className="container">
      <div className="row d-flex justify-content-center align-items-center">
        <div className="col-md-4 mt-5">
          <CommonLogin title="Login" onSubmit={handleLogin} showRegisterLink={true} />
        </div>
      </div>
    </div>
  );
}
