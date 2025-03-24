import React from "react";
import CommonRegister from "../common/CommonRegister";
import { useMutation } from "@apollo/client";
import { CREATE_CUSTOMER } from "../../graphql/mutation/customerMutation";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";



export default function MerchantRegister() {
  const navigate = useNavigate();
  const register_type = new URLSearchParams(location.search).get("type");

   const [createCustomer, { data, error, loading }] = useMutation(CREATE_CUSTOMER, {
      fetchPolicy: "no-cache"
    });

  const handleRegister = async (userdata) => {
    console.log(userdata+"data");
    
    try {
        await createCustomer({
          variables: {
            name: userdata.name,
            email: userdata.email,
            password: userdata.password,
            register_type : register_type
          }
        });
  
        console.log("User registered successfully");
        navigate("/login"); 
  
      } catch (err) {
        console.error("Registration error:", err.message);
      } 
  };

   useEffect(() => {
      if (error?.register) {
        console.error("Error:", error?.register);
        if (error.message.includes("User already found")) {
          console.log("User already exists, redirecting to login...");
          navigate("/login");
        }
      }
    }, [error]);

  return (
    <>
      <div
        className="border border-dark w-100 vh-100 d-flex flex-row"
        style={{
          backgroundImage: "linear-gradient(to bottom right,black,grey,white)",
        }}
      >
        <div className="w-50 align-items-center d-flex justify-content-center">
          <h1 className="fw-bold display-4 text-uppercase text-warning">
            From a home<br />grow to a well<br />known brand
          </h1>
        </div>
        <div className="p-5" style={{ width: "450px", marginTop:"-20px" }}>
          <CommonRegister title="Register" onSubmit={handleRegister} />
        </div>
      </div>
    </>
  );
}
