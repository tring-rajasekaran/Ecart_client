import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CommonLogin from "../common/CommonLogin";
import { useMutation, useQuery } from "@apollo/client";
import { LOGIN_USER } from "../../graphql/mutation/customerMutation";
import CryptoJS from "crypto-js";
import { CustomerContext } from "../../App";
import { toast } from "react-hot-toast";
import { EncryptPassword } from "../EncryptPassword";

export default function Login() {
  const {setIsLogin}=useContext(CustomerContext)
  console.log(setIsLogin, " setIsLogin")
  const navigate = useNavigate();
  const [loginUser, { data, error, loading }] = useMutation(LOGIN_USER, {
    fetchPolicy: "no-cache"
  });

  const handleLogin = async (userdata) => {
        const encryptedPassword = EncryptPassword(userdata.password)
        console.log(encryptedPassword ,"<<<<<<<<<< ");
    
    try {
      await loginUser({
        variables: {
          email: userdata.email,
          password: encryptedPassword,
        }
      });

      console.log("User logged in successfully");
      toast.success("User logged in successfully");
      setIsLogin(true)
      navigate("/slide"); 

    } catch (err) {
      console.error("Login error:", err.message);
    }
  };

  useEffect(() => {
    if (error) {
      console.error("Error:", error.message);
      if (error.message.includes("User not found")) {
        toast.error("User not found, prompting registration")
        console.log("User not found, prompting registration...");
        navigate("/register");
      } else if (error.message.includes("Invalid credentials")) {
        toast.error("Invalid password, alert user")
        console.log("Invalid password, alert user...");
      }
    }
  }, [error]);

  return (
    <div className="container">
      <div className="row d-flex justify-content-center align-items-center">
        <div className="col-md-4 mt-5">
          <CommonLogin title="Login" onSubmit={handleLogin} showRegisterLink={true}/>
        </div>
      </div>
    </div>
  );
}
