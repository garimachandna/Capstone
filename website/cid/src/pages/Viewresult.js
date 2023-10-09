import React from "react";
import Layout from "../components/layout/layout";
import "../styles/viewresult.css";
import { Link } from "react-router-dom";

const imageData = [
  {
    label: "Accidents",
    url: "/images/carousel/accident2.jpg",
    alt: "accident",
  },
  {
    label: "Kidnaps",
    url: "images/carousel/missing.jpg",
    alt: "kidnap",
  },
  {
    label: "Murder",
    url: "images/carousel/murder.jpg",
    alt: "murder",
  },
  {
    label: "Rape/Molestation",
    url: "/images/carousel/rape.jpg",
    alt: "rape",
  },
  {
    label: "Robbery",
    url: "images/carousel/robbery2.jpg",
    alt: "theft",
  },
];

const card = imageData.map((image) => (
  <div className="cards" key={image.alt}>
    <div className="card-body">
      <h3 className="card-title">{image.label}</h3>
      {/* <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6> */}
      <Link to="/viewcategory" state={{ category: image.alt }}>
        <img src={image.url} alt=""></img>
      </Link>
      {/* <p className="card-text">
        Some quick example text to build on the card title and make up the bulk
        of the card's content.
      </p> */}
      {/* <a href="#" className="card-link">
        Card link
      </a> */}
      {/* <a href="#" className="card-link">
        Another link
      </a> */}
    </div>
  </div>
));

const Viewresult = () => {
  return (
    <Layout>
      <div className="viewresult">
        <h1 id="title">View Result</h1>
        <div className="card-container">{card}</div>
      </div>
    </Layout>
  );
};

export default Viewresult;
