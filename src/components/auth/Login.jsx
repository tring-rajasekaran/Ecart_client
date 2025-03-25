import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CommonLogin from "../common/CommonLogin";
import { useMutation, useQuery } from "@apollo/client";
import { LOGIN_USER } from "../../graphql/mutation/customerMutation";

export default function Login() {
  const navigate = useNavigate();
  const [loginUser, { data, error, loading }] = useMutation(LOGIN_USER, {
    fetchPolicy: "no-cache"
  });

  const handleLogin = async (userdata) => {
    try {
      await loginUser({
        variables: {
          email: userdata.email,
          password: userdata.password,
        }
      });

      console.log("User logged in successfully");
      navigate("/slide"); 

    } catch (err) {
      console.error("Login error:", err.message);
    }
  };

  useEffect(() => {
    if (error) {
      console.error("Error:", error.message);
      if (error.message.includes("User not found")) {
        console.log("User not found, prompting registration...");
        navigate("/register");
      } else if (error.message.includes("Invalid credentials")) {
        console.log("Invalid password, alert user...");
      }
    }
  }, [error]);

  return (
    <div className="container">
      <div className="row d-flex justify-content-center align-items-center">
        <div className="col-md-4 mt-5">
          <CommonLogin title="Login" onSubmit={handleLogin} />
        </div>
      </div>
    </div>
  );
}
