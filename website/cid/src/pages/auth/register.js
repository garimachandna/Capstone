import React, { useState } from "react";
import Layout from "../../components/layout/layout";
import Axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
// import "../../../src/styles/AuthStyles.css";
import "../../styles/login.css";
import { useAuth } from "../../context/auth";
import { AiTwotoneMail, AiFillLock } from "react-icons/ai";
import { IoPerson } from "react-icons/io5";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const location = useLocation();
  //form function
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      Axios.post(
        `https://shikayat.vercel.app/api/register`,
        // Axios.post(`http://localhost:8080/api/register`,
        {
          name,
          email,
          password,
          role: 2,
        }
      ).then((res) => {
        if (res && res.data.success) {
          toast.success(res.data && res.data.message);
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
    <Layout title={"Register"}>
      <div className="form-container">
        <div className="text">
          <h1>Register an Official</h1>
          <p>Enter the name, email and password to register</p>
        </div>
        <form className="container" onSubmit={handleSubmit}>
          <div className="forminfo">
            <div className="box mb-3">
              <IoPerson />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control"
                id="exampleInputName"
                placeholder="Enter your name"
                required
              />
            </div>
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
                type="submit"
                className="btn btn-primary"
                onSubmit={handleSubmit}
              >
                REGISTER
              </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
