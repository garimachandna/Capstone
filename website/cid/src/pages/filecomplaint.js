import axios from "axios";
import "../styles/filecomplaint.css";
import Layout from "../components/layout/layout";
import React from "react";
import { useState, useEffect } from "react";
import { AiTwotoneMail, AiFillLock } from "react-icons/ai";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";

const Filecomplaint = () => {
  const [complaintData, setComplaintData] = useState({
    name: "",
    address: "",
    phone: "",
    complaintText: "",
  });

  const user = useAuth()[0].user;
  // console.log("user filing complaint ", user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== 0) {
      navigate("/login");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // You can handle the submission of the complaint data here
    console.log("Complaint Data:", complaintData);

    // You can send the complaint data to the backend here
    const response = await axios.post("http://localhost:8080/api/predict", {
      complaintData,
    });
    console.log("status: ", response);
    if (response.data.success) {
      //show success message
      response.data.message = "File uploaded successfully";
      alert("Complaint registered successfully!!!!");
    } else {
      //show error message
      response.data.message = "File upload failed";
    }
  };

  const handleChange = (e) => {
    // console.log("e: ", e.target);
    const { name, value } = e.target;
    console.log("name: ", name, "value: ", value);
    setComplaintData({ ...complaintData, [name]: value });
    console.log(complaintData);
  };

  return (
    <Layout>
      <div className="filecomplaint">
        <div id="headings" className="text">
          <h1>File your complaint here!</h1>
          <p>Enter the details </p>
        </div>
        <div id="file">
          <div className="myform-container">
            <form className="container" onSubmit={handleSubmit}>
              <div className="forminfo">
                <div className="box mb-3">
                  <AiTwotoneMail />
                  <input
                    type="text"
                    name="name"
                    value={complaintData.name}
                    onChange={handleChange}
                    className="form-control"
                    id="exampleInputName"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div className="box mb-3">
                  <AiFillLock />
                  <input
                    type="tel"
                    name="phone"
                    pattern="[0-9]{10}"
                    value={complaintData.phone}
                    onChange={handleChange}
                    className="form-control"
                    id="exampleInputPhone"
                    placeholder="Enter your contact number"
                    required
                  />
                </div>
                <div className="box mb-3">
                  <AiFillLock />
                  <input
                    type="text"
                    name="address"
                    value={complaintData.address}
                    onChange={handleChange}
                    className="form-control"
                    id="exampleInputAddress"
                    placeholder="Enter your address"
                    required
                  />
                </div>
                <div className="box mb-3">
                  <AiFillLock />
                  <textarea
                    type="text"
                    name="complaintText"
                    value={complaintData.complaintText}
                    onChange={handleChange}
                    className="form-control"
                    id="exampleInputComplaint"
                    placeholder="Enter your complaint"
                    required
                  />
                </div>

                <div className="buttons mb-3">
                  {/* <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  navigate("/forgot-password");
                }}
              >
                Forgot Password
              </button> */}
                  <button
                    type="submit"
                    // className="btn btn-primary"
                    onSubmit={handleSubmit}
                  >
                    File Complaint
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Filecomplaint;
