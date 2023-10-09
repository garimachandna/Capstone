import React from "react";
import "../styles/viewcategory.css";
import Axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Layout from "../components/layout/layout";

const Viewcategory = () => {
  const location = useLocation();
  let [complaints, setComplaints] = useState([]);
  let category = location.state.category;
  console.log(category);
  useEffect(() => {
    let ignore = false;

    if (!ignore) {
      //   console.log("category ", category);
      getComplaints(category);
    }
    return () => {
      ignore = true;
    };
  }, [category]);

  const getComplaints = (category) => {
    console.log("finding for category ", category);
    try {
      Axios.post("http://localhost:8080/api/viewcategory", { category }).then(
        (res) => {
          //   console.log("res ", res.data);
          if (res && res.data.success) {
            console.log("res ", res.data);
            setComplaints(res.data.complaints);
          } else {
            console.log("some error occured");
          }
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const ComplaintsList = ({ complaints }) => {
    return (
      <table>
        <thead>
          <tr>
            <th>S. No.</th>
            <th>Complainant Name</th>
            <th>Complaint Address</th>
            <th>Complainant Phone</th>
            <th>Complaint</th>
            {/* Add more table headers for other complaint details */}
          </tr>
        </thead>
        <tbody>
          {complaints.map((complaint, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{complaint.name}</td>
              <td>{complaint.address}</td>
              <td>{complaint.phone}</td>
              <td>{complaint.complaint}</td>
              {/* Add more table cells for other complaint details */}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  //download the complaints in csv format
  const downloadComplaintsCSV = () => {
    const csvHeader =
      "S. No.,Complainant Name,Complaint Address,Complainant Phone,Complaint\n";
    const csvData = complaints.map((complaint, index) => {
      const encodedName = complaint.name;
      const encodedAddress = `"${complaint.address}"`;
      const encodedComplaint = complaint.complaint;

      console.log(
        "downloading: ",
        complaint.name,
        complaint.address,
        complaint.complaint,
        complaint.phone
      );
      return `${index + 1},${encodedName},${encodedAddress},${
        complaint.phone
      },"${encodedComplaint}"`;
    });
    const csvContent = csvHeader + csvData.join("\n");
    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
      encoding: "utf-8",
    });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "complaints.csv";
    a.click();

    window.URL.revokeObjectURL(url);
  };

  //   console.log("complaints stored ", complaints);
  return (
    <Layout>
      <div className="viewcategory">
        <h1 className="category-heading">{category}s</h1>
        {/* <ol className="complaints">
          {complaints.map((complaint) => (
            <li className="complaint" key={complaint._id}>
              <small>{complaint.complaint}</small>
            </li>
          ))}
        </ol> */}

        <ComplaintsList complaints={complaints} />
        {complaints.length > 0 && (
          <button onClick={downloadComplaintsCSV} className="downloadbutton">
            Download Complaints (CSV)
          </button>
        )}
      </div>
    </Layout>
  );
};

export default Viewcategory;
