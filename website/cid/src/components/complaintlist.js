import React from "react";
import { FaTrash } from "react-icons/fa";

const ComplaintsList = ({
  category,
  complaints,
  handlePriorityChange,
  handleDelete,
}) => {
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

export default ComplaintsList;
