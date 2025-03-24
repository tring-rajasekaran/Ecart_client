import React, { Fragment } from "react";
import CommonLogin from "../common/CommonLogin";

export default function MerchantLogin() {
  const login_type = new URLSearchParams(location.search).get('type')

  const handleLogin = (data) => {
    console.log("Login Data:", data);
  };

  return (
    <>
      <div
        className="border border-dark w-100 min-vh-100 d-flex flex-row"
        style={{
          backgroundImage: "linear-gradient(to bottom right,black,grey,white)",
        }}
      >
        <div className="w-50 align-items-center d-flex justify-content-center">
          <h1 className="fw-bold display-4 text-uppercase text-warning">
            From a home<br />grow to a well<br />known brand
          </h1>
        </div>
        <div className="mt-5 p-5" style={{ width: "450px" }}>
          <CommonLogin title="Login" onSubmit={handleLogin} showRegisterLink={true} />
        </div>
      </div>
    </>
  );
}
