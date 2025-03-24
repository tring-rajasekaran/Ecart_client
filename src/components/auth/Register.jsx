import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CommonRegister from "../common/CommonRegister";
import { useMutation } from "@apollo/client";
import { CREATE_CUSTOMER } from "../../graphql/mutation/customerMutation";

export default function Register() {
  const navigate = useNavigate();
  const [createCustomer, { data, error, loading }] = useMutation(CREATE_CUSTOMER, {
    fetchPolicy: "no-cache"
  });

  const handleRegister = async (userdata) => {
    try {
      await createCustomer({
        variables: {
          name: userdata.name,
          email: userdata.email,
          password: userdata.password,
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
