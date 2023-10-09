import React, { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "../styles/carousel.css";

const imageData = [
  {
    label: "Accidents",
    url: "/images/carousel/accident2.jpg",
    alt: "Image1",
  },
  {
    label: "Kidnapping",
    url: "images/carousel/missing.jpg",
    alt: "Image2",
  },
  {
    label: "Murder",
    url: "images/carousel/murder.jpg",
    alt: "Image3",
  },
  {
    label: "Rape/Molestation",
    url: "/images/carousel/rape.jpg",
    alt: "Image1",
  },
  {
    label: "Robbery",
    url: "images/carousel/robbery2.jpg",
    alt: "Image2",
  },
];

const renderSlides = imageData.map((image) => (
  <div className="image" key={image.alt}>
    <img src={image.url} alt={image.alt} />
    <p className="legend">{image.label}</p>
  </div>
));

export default function App() {
  const [currentIndex, setCurrentIndex] = useState();
  function handleChange(index) {
    setCurrentIndex(index);
  }
  return (
    <div className="card">
      <Carousel
        showArrows={true}
        autoPlay={true}
        infiniteLoop={true}
        selectedItem={imageData[currentIndex]}
        onChange={handleChange}
        className="carousel-container"
      >
        {renderSlides}
      </Carousel>
    </div>
  );
}
