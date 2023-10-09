import React from "react";
import Layout from "../components/layout/layout";
import "../styles/home.css";
import ImageSlider from "../carousel/ImageSlider.js";

const Home = () => {
  return (
    <Layout title={"Home- CID"}>
      <div className="home">
        <h1 id="title">StreamlineCID</h1>
        <div className="carouselcard">
          <ImageSlider />
          {/* <div className="background-image"></div> */}
        </div>
        <div className="info">
          {/* <h2>Our Mission</h2> */}
          <h2>Our Vision</h2>
          <p>
            StreamlineCID is dedicated to revolutionizing the complaint
            classification process within the Criminal Investigation Department
            (CID). We understand the critical role accurate complaint
            classification plays in ensuring effective law enforcement and
            investigative outcomes. Our mission is to streamline and optimize
            the classification system, leveraging cutting-edge technologies to
            deliver faster, more accurate, and data-driven solutions.
          </p>
          <h2>Contact Us</h2>
          <p>
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

export default Home;
