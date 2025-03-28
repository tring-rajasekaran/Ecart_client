import React, { Fragment, useEffect } from "react";
import CommonLogin from "../common/CommonLogin";
import { MERCHANT_LOGIN } from "../../graphql/mutation/merchantMutation";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";



export default function MerchantLogin() {

  const navigate = useNavigate();
  const login_type = new URLSearchParams(location.search).get('type')
  
  const [merchantLogin, { data, error, loading }] = useMutation(MERCHANT_LOGIN, {
      fetchPolicy: "no-cache"
    });
  const handleLogin = async (data) => {
      
    try{
      await merchantLogin({
        variables: {
          email: data.email,
          password: data.password,
          login_type :"Merchant"
        }
      });

      console.log("logged in successfully");
      navigate("/MerchantPage")
      

    }
    catch(err){
      console.log(err.message ,"error occured ");
      
    }

    useEffect(() => {
        if (error) {
          console.error("Error:", error.message);
          if (error.message.includes("Merchant not found")) {
            alert("Merchant not found, redirecting to registration...");
            navigate("/MerchantRegister");
          } else if (error.message.includes("Invalid credentials")) {
            console.log("Invalid password, alert user...");
          }
        }
      }, [error]);
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
