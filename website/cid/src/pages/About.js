import React from "react";
import Layout from "../components/layout/layout";
import "../styles/about.css";
const About = () => {
  return (
    <Layout title={"About us - Ecommerce app"}>
      <div className="row aboutus ">
        <div className="col-md-6 ">
          <img
            className="aboutimg"
            src="/images/about.jpeg"
            alt="contactus"
            style={{
              // width: "100%"
              padding: "30px",
            }}
          />
        </div>
        <div className="col-md-4">
          <h1 className="about-head">About Us</h1>
          <p className="aboutp text-justify mt-2">
            शिकायत is dedicated to revolutionizing the complaint classification
            process within the Criminal Investigation Department (CID). We
            understand the critical role accurate complaint classification plays
            in ensuring effective law enforcement and investigative outcomes.
            Our mission is to streamline and optimize the classification system,
            leveraging cutting-edge technologies to deliver faster, more
            accurate, and data-driven solutions.
          </p>
          <p className="aboutp text-justify">
            For further information, collaboration opportunities, or inquiries,
            please reach out to us via our contact form or email us at
            admin@admin.com. Follow us on social media channels to stay updated
            with the latest developments and industry insights.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
