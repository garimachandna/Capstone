import Layout from "../components/layout/layout";
import "../styles/viewresult.css";
import { Link, useNavigate } from "react-router-dom";
import PieChart from "../components/piechart";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/auth";

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
    label: "Rape",
    url: "/images/carousel/rape.jpg",
    alt: "rape",
  },
  {
    label: "Thefts",
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
    </div>
  </div>
));

const Viewresult = () => {
  const [count, setCount] = useState([]);
  const user = useAuth()[0].user;
  const navigate = useNavigate();

  // console.log("user", auth);
  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      if (!user || user.role === 0) {
        navigate("/login");
      }
      fetchData();

      const interval = setInterval(fetchData, 20000); // Poll every 20 seconds

      return () => clearInterval(interval);
    }
    return () => {
      ignore = true;
    };
  }, [user, navigate]);

  const fetchData = async () => {
    const response = await axios.post(
      "https://shikayat.vercel.app/api/getcount"
    );
    // const response = await axios.post("http://localhost:8080/api/getcount");
    const data = await response.data.count;

    setCount(data);
    // console.log("count of complaints received ", count, response.data.count);
  };

  let colors = ["#FFDDD5", "#D483B5", "#ED93AC", "#F7AEB7", "#A878AC"];

  let data = [
    { label: "Accident", value: count[0], color: colors[0] },
    { label: "Kidnap", value: count[1], color: colors[1] },
    { label: "Murder", value: count[2], color: colors[2] },
    { label: "Rape", value: count[3], color: colors[3] },
    { label: "Theft", value: count[4], color: colors[4] },
  ];

  const links = [
    { url: "/viewcategory", state: { category: "accident" } },
    { url: "/viewcategory", state: { category: "kidnap" } },
    { url: "/viewcategory", state: { category: "murder" } },
    { url: "/viewcategory", state: { category: "rape" } },
    { url: "/viewcategory", state: { category: "theft" } },
  ];

  console.log("data", data);
  return (
    // the user should access this page only if logged in
    // check if user is logged in else redirect to login page

    <Layout>
      <div className="viewresult">
        <h1 id="title" className="view-title">
          View Complaints
        </h1>
        <div className="pieandcard">
          <div className="pie">
            <PieChart data={data} links={links} />
          </div>
          <div className="card-container">{card}</div>
        </div>
      </div>
    </Layout>
  );
};

export default Viewresult;
