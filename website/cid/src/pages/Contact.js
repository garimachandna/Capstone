import React from "react";
import Layout from "../components/layout/layout";
import "../styles/contact.css";

function ContactUs() {
  return (
    <Layout title={"Contact us"}>
      <div className="row contactus contactdivus">
        <div className="col-md-6 ">
          <img
            className="aboutimg contactimg"
            src="/images/contactus.jpg"
            alt="contactus"
            style={{
              // width: "100%"
              padding: "30px",
            }}
          />
        </div>
        <div className="contactinfo col-md-4">
          <h1>Contact Us</h1>
          <p className="aboutp">Feel free to contact us for any queries</p>
          <p className="aboutp">Phone: 1234567890</p>
          <p className="aboutp">
            Email:<span> </span>
            <a href="mailto:cid@cid.com">cid@cid.com</a>
          </p>
        </div>
      </div>
    </Layout>
  );
}

export default ContactUs;
