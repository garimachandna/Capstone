import React, { useState } from "react";
import Layout from "../../components/layout/layout";
import Axios, { AxiosHeaders } from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
// import "../../../src/styles/AuthStyles.css";
import "../../styles/login.css";
import { useAuth } from "../../context/auth";
import { AiTwotoneMail, AiFillLock } from "react-icons/ai";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const location = useLocation();

  // Axios.defaults.withCredentials = true;
  Axios.defaults.headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "https://shikayat.vercel.app",
  };

  //form function
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      Axios.post(
        `https://shikayat.vercel.app/api/login/`,
        // Axios.post(`http://localhost:8080/api/login`,
        {
          email,
          password,
        }
      ).then((res) => {
        if (res && res.data.success) {
          toast.success(res.data && res.data.message);
          setAuth({
            ...auth,
            user: res.data.user,
            token: res.data.token,
            role: res.data.user.role,
          });
          localStorage.setItem("auth", JSON.stringify(res.data));
          // console.log("auth", auth);
          navigate(location.state || "/");
        } else {
          toast.error(res.data.message);
        }
      });
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Login"}>
      <div className="form-container">
        <div className="text">
          <h1>Login Page</h1>
          <p>Enter your email and password to login</p>
        </div>
        <form className="container" onSubmit={handleSubmit}>
          <div className="forminfo">
            <div className="box mb-3">
              <AiTwotoneMail />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                id="exampleInputEmail"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="box mb-3">
              <AiFillLock />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="buttons mb-3">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  navigate("/forgot-password");
                }}
              >
                Forgot Password
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                onSubmit={handleSubmit}
              >
                LOGIN
              </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
