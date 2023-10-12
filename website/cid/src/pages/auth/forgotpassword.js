import React, { useState } from "react";
import Layout from "../../components/layout/layout";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/login.css";
// import "../../styles/AuthStyles.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newpassword, setNewPassword] = useState("");

  const navigate = useNavigate();
  //form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log(email, newpassword);
      const res = await Axios.post(
        `http://localhost:8080/api/forgot-password`,
        {
          email,
          newpassword,
        }
      );
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout title={"forgot password- ecommerce app"}>
      <div className="form-container">
        <div className="text">
          <h1>Reset Password</h1>
        </div>
        <form className="container" onSubmit={handleSubmit}>
          <div className="forminfo">
            <div className="mb-3">
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
            <div className="mb-3">
              <input
                type="password"
                value={newpassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Enter your new password"
                required
              />
            </div>

            <button type="submit" className="buttons btn btn-primary">
              RESET
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
