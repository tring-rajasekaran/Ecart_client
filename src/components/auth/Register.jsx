import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CommonRegister from "../common/CommonRegister";
import { useMutation } from "@apollo/client";
import { CREATE_CUSTOMER } from "../../graphql/mutation/customerMutation";
import { EncryptPassword } from "../EncryptPassword";
import CryptoJS from "crypto-js";

export default function Register() {
  const navigate = useNavigate();
  const [createCustomer, { data, error, loading }] = useMutation(CREATE_CUSTOMER, {
    fetchPolicy: "no-cache"
  });

  
  const secretKey = "Rajasekaran3300";
  
  const handleRegister = async (userdata) => {
    const encryptedPassword = CryptoJS.AES.encrypt(userdata.password, secretKey).toString();
    console.log(encryptedPassword +" ecy password");
    
    try {
      await createCustomer({
        variables: {
          name: userdata.name,
          email: userdata.email,
          password: encryptedPassword,
          register_type:null
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
    <div className="container">
      <div className="row d-flex justify-content-center align-items-center">
        <div className="col-md-4 mt-5">
          <CommonRegister title="Register" onSubmit={handleRegister} />
        </div>
      </div>
    </div>
  );
}
