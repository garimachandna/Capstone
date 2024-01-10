import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

const CircularIndeterminate = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CircularProgress />
    </div>
  );
};

export default CircularIndeterminate;
