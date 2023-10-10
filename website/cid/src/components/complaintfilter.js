import React from "react";

const ComplaintFilter = ({ onSortChange, ispriority }) => {
  return (
    <div id="filter">
      <label>Sort by:</label>
      <select onChange={(e) => onSortChange(e.target.value, ispriority)}>
        <option value="newest">Newest to Oldest</option>
        <option value="oldest">Oldest to Newest</option>
      </select>
    </div>
  );
};

export default ComplaintFilter;
