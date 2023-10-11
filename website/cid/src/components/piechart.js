import React, { useEffect, useRef } from "react";
import {
  Chart,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
  PieController,
  ArcElement,
} from "chart.js";
import { useNavigate } from "react-router-dom"; // Import useHistory from React Router

const PieChart = ({ data, links }) => {
  const chartRef = useRef(null);
  const navigate = useNavigate();
  let myChart = null;

  const handleChartClick = (event, elements) => {
    if (elements.length > 0) {
      const clickedIndex = elements[0].index;
      const link = links[clickedIndex];

      navigate(link.url, { state: link.state });
    }
  };

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    Chart.register(
      CategoryScale,
      Title,
      Tooltip,
      Legend,
      PieController,
      ArcElement
    );

    myChart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: data.map((item) => item.label),
        datasets: [
          {
            data: data.map((item) => item.value),
            backgroundColor: data.map((item) => item.color),
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Complaint Categories",
          },
        },
        onClick: handleChartClick, // Handle chart click events
      },
    });

    return () => {
      myChart.destroy();
    };
  }, [data, links]);

  return (
    <div>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default PieChart;
