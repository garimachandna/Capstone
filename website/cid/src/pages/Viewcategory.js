import React from "react";
import "../styles/viewcategory.css";
import Axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Layout from "../components/layout/layout";
// import delete icon from react-icons
import { FaTrash } from "react-icons/fa";

const Viewcategory = () => {
  const location = useLocation();
  let [complaints, setComplaints] = useState([]);
  let [priorityComplaints, setPriorityComplaints] = useState([]);
  let category = location.state.category;
  console.log(category);
  useEffect(() => {
    let ignore = false;

    if (!ignore) {
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
          if (res && res.data.success) {
            console.log("res ", res.data);
            setComplaints(res.data.complaints);
            setPriorityComplaints(res.data.prioritycomplaints);
            // console.log("complaints ", complaints);
            // console.log("priority complaints ", priorityComplaints);
          } else {
            console.log("some error occured");
          }
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handlePriorityChange = async (category, id) => {
    console.log("category ", category);
    console.log("id ", id);
    // setComplaints(
    //   complaints.map((complaint) => {
    //     if (complaint._id === id) {
    //       complaint.priority = !complaint.priority;
    //       priority = complaint.priority;
    //     }
    //     return complaint;
    //   })
    // );

    console.log("calling priority api");
    await Axios.post("http://localhost:8080/api/updatepriority", {
      category,
      id,
    }).then((res) => {
      if (res && res.data.success) {
        console.log("priority updated");
        console.log("res ", res.data.complaint.priority);
        const priority = res.data.complaint.priority;
        //add the complaint to priorityComplaints and remove from complaints
        if (priority === true) {
          console.log("priority is true");
          setPriorityComplaints([...priorityComplaints, res.data.complaint]);
          setComplaints(
            complaints.filter((complaint) => {
              return complaint._id !== res.data.complaint._id;
            })
          );
        } else {
          setComplaints([...complaints, res.data.complaint]);
          setPriorityComplaints(
            priorityComplaints.filter((complaint) => {
              return complaint._id !== res.data.complaint._id;
            })
          );
        }
      } else {
        console.log("some error occured");
      }
    });
  };

  const handleDelete = (category, id) => {
    setComplaints(
      complaints.filter((complaint) => {
        return complaint._id !== id;
      })
    );
    setPriorityComplaints(
      priorityComplaints.filter((complaint) => {
        return complaint._id !== id;
      })
    );

    Axios.post("http://localhost:8080/api/deletecomplaint", {
      category,
      id,
    }).then((res) => {
      if (res && res.data.success) {
        console.log("complaint deleted");
      } else {
        console.log("some error occured");
      }
    });
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
            <th>Priority</th>
            {/* <th>Delete</th> */}
            {/* Add more table headers for other complaint details */}
          </tr>
        </thead>
        <tbody>
          {complaints.map((complaint, index) => (
            <tr key={index + 1}>
              <td>{index + 1}</td>
              <td>{complaint.name}</td>
              <td>{complaint.address}</td>
              <td>{complaint.phone}</td>
              <td>{complaint.complaint}</td>
              <td>
                <input
                  type="checkbox"
                  className="priority-checkbox"
                  checked={complaint.priority}
                  onChange={() => handlePriorityChange(category, complaint._id)}
                />
              </td>
              <td className="no-border">
                <FaTrash
                  className="delete-icon"
                  onClick={() => handleDelete(category, complaint._id)}
                />
              </td>
              {/* Add more table cells for other complaint details */}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  //download the complaints in csv format
  const downloadComplaintsCSV = (complaints) => {
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
        {priorityComplaints.length > 0 && (
          <h2 id="priority-heading">Priority {category}s</h2>
        )}
        {priorityComplaints.length > 0 && (
          <div className="prioritycomplaints">
            <ComplaintsList complaints={priorityComplaints} />
          </div>
        )}
        {priorityComplaints.length > 0 && (
          <button
            onClick={downloadComplaintsCSV.bind(this, priorityComplaints)}
            className="prioritydownload downloadbutton"
          >
            Download
          </button>
        )}

        {complaints.length > 0 && (
          <h2 className="category-heading">{category}s</h2>
        )}
        {complaints.length > 0 && <ComplaintsList complaints={complaints} />}
        {complaints.length > 0 && (
          <button
            onClick={downloadComplaintsCSV.bind(this, complaints)}
            className="downloadbutton"
          >
            Download
          </button>
        )}

        {complaints.length === 0 && priorityComplaints.length === 0 && (
          <h2 className="no-complaints">No complaints found</h2>
        )}
      </div>
    </Layout>
  );
};

export default Viewcategory;
