import axios from "axios";
import "../styles/uploadcsv.css";
import Layout from "../components/layout/layout";
import React, { Component } from "react";

class Uploadcsv extends Component {
  state = {
    // Initially, no file is selected
    selectedFile: null,
  };

  // On file select (from the pop up)
  onFileChange = (event) => {
    // Update the state
    this.setState({ selectedFile: event.target.files[0] });
  };

  // On file upload (click the upload button)
  onFileUpload = async () => {
    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    try {
      formData.append(
        "myFile",
        this.state.selectedFile,
        this.state.selectedFile.name
      );

      // Details of the uploaded file
      console.log("selected file\n", this.state.selectedFile);

      // Request made to the backend api
      // Send formData object
      console.log("before ", formData.get("myFile"));
      const response = await axios.post(
        "https://shikayat.vercel.app/api/uploadfile",
        // "http://localhost:8080/api/uploadfile",
        formData
      );

      console.log("status: ", response);
      if (response.data.status === "success") {
        //show success message
        response.data.message = "File uploaded successfully";
      } else {
        //show error message
        response.data.message = "File upload failed";
      }

      alert("File uploaded successfully.");
      // alert(response.data.message);
    } catch (e) {
      alert("Please choose a file before uploading");
    }
  };

  // File content to be displayed after
  // file upload is complete
  fileData = () => {
    if (this.state.selectedFile) {
      return (
        <div>
          <h2>File Details:</h2>
          <p>File Name: {this.state.selectedFile.name}</p>

          <p>File Type: {this.state.selectedFile.type}</p>

          <p>
            Last Modified:{" "}
            {this.state.selectedFile.lastModifiedDate.toDateString()}
          </p>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      );
    }
  };

  render() {
    return (
      <Layout>
        <div className="uploadcsv">
          <div id="headings">
            <h1>Upload Portal</h1>
            <h3>Upload the complaints and we will classify them for you!</h3>
          </div>
          <div id="upload">
            <input type="file" onChange={this.onFileChange} />
            <button onClick={this.onFileUpload}>Upload!</button>
          </div>
          <div className="data">{this.fileData()}</div>
        </div>
      </Layout>
    );
  }
}

export default Uploadcsv;
