import React from "react";
import "../styles/viewcategory.css";
import Axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Layout from "../components/layout/layout";
import ComplaintFilter from "../components/complaintfilter";
import ComplaintsList from "../components/complaintlist";
import ScrollToTopButton from "../components/scrolltotopbutton";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Viewcategory = () => {
  const location = useLocation();
  let [complaints, setComplaints] = useState([]);
  let [priorityComplaints, setPriorityComplaints] = useState([]);
  const [sortOption, setSortOption] = useState("newest"); // Default sorting option
  const [keyword, setKeyword] = useState("");
  const [priorityKeyword, setPriorityKeyword] = useState("");
  const [filterType, setFilterType] = useState("name");
  const [filter, setFilter] = useState("");
  const [priorityFilterType, setPriorityFilterType] = useState("name");
  const [priorityFilter, setPriorityFilter] = useState("");

  const handleFilterChange = (e, ispriority) => {
    console.log(e);
    // console.log(e.target);
    if (ispriority) setPriorityFilterType(e.target.value);
    else setFilterType(e.target.value);
  };

  const clearFilter = (ispriority) => {
    if (ispriority) {
      setPriorityKeyword("");
      setPriorityFilter("");
    } else {
      setKeyword("");
      setFilter("");
    }
    getComplaints(category, true, ispriority);
  };

  const handleSearch = async (ispriority) => {
    const key = ispriority ? priorityKeyword : keyword;
    const fil = ispriority ? priorityFilter : filter;
    const filterT = ispriority ? priorityFilterType : filterType;
    console.log(
      "searching for ",
      key,
      " in category ",
      category,
      ispriority,
      sortOption,
      filterT,
      fil
    );
    try {
      let response = await Axios.post(
        "https://shikayat.vercel.app/api/findcomplaints", //findcomplaints
        // "http://localhost:8080/api/findcomplaints", //findcomplaints
        {
          keyword: key,
          category,
          ispriority,
          sortOption,
          filterType: filterT,
          filter: fil,
        }
      );

      console.log("response ", response);
      if (response.data.success === false) {
        console.error(response.data.message);
      }

      if (response.data.complaints.length === 0) {
        // console.log("no complaints found");
        toast.error("No complaints found");
        if (ispriority) {
          setPriorityKeyword("");
          setPriorityFilter("");
        } else {
          setKeyword("");
          setFilter("");
        }
      } else {
        if (ispriority) {
          setPriorityComplaints(response.data.complaints);
        } else setComplaints(response.data.complaints);
      }

      console.log(response.data.complaints);
    } catch (err) {
      console.log(err);
    }
  };

  const user = useAuth()[0].user;
  const navigate = useNavigate();

  // console.log("location ", location);

  let category = location.state?.category;
  console.log(category);

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      if (category == null || !user || user.role === 0) {
        console.log("redirecting to login");
        navigate("/login");
      } else {
        console.log("getting complaints");
        getComplaints(category); //if (keyword == null)
      }
    }
    return () => {
      ignore = true;
    };
  }, [category, user, navigate]);

  const getComplaints = (category, isnull = false, ispriority = false) => {
    console.log("finding for category ", category);
    try {
      Axios.post(
        "https://shikayat.vercel.app/api/viewcategory",
        // "http://localhost:8080/api/viewcategory",
        { category }
      ).then((res) => {
        if (res && res.data.success) {
          console.log("res ", res.data);

          console.log(keyword, priorityKeyword);

          if (isnull === false) {
            setComplaints(res.data.complaints);
            setPriorityComplaints(res.data.prioritycomplaints);
          }

          if (isnull && !ispriority) {
            console.log("setting complaints");
            setComplaints(res.data.complaints);
            console.log("complaints ", complaints);
          }

          if (isnull && ispriority) {
            setPriorityComplaints(res.data.prioritycomplaints);
            console.log("priority complaints ", priorityComplaints);
          }

          // console.log("complaints ", complaints);
          // console.log("priority complaints ", priorityComplaints);
        } else {
          console.log("some error occured");
        }
      });
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
    await Axios.post(
      "https://shikayat.vercel.app/api/updatepriority",
      // await Axios.post("http://localhost:8080/api/updatepriority",
      {
        category,
        id,
      }
    ).then((res) => {
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

    Axios.post("https://shikayat.vercel.app/api/deletecomplaint", {
      // Axios.post("http://localhost:8080/api/deletecomplaint", {
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

  const handleSortChange = (value, ispriority) => {
    setSortOption(value);
    console.log("sort option ", value);
    // Sort the complaints list based on the selected option
    if (ispriority) {
      if (value === "newest") {
        setPriorityComplaints(
          [...priorityComplaints].sort((a, b) => b._id.localeCompare(a._id))
        );
      } else if (value === "oldest") {
        setPriorityComplaints(
          [...priorityComplaints].sort((a, b) => a._id.localeCompare(b._id))
        );
      }
      console.log("priority complaints ", priorityComplaints);
    } else {
      if (value === "newest") {
        setComplaints(
          [...complaints].sort((a, b) => b._id.localeCompare(a._id))
        );
      } else if (value === "oldest") {
        setComplaints(
          [...complaints].sort((a, b) => a._id.localeCompare(b._id))
        );
      }
      console.log("complaints ", complaints);
    }
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
          <div className="priorityblock block">
            <h2 id="priority-heading">Priority {category}s</h2>

            <div className="filters">
              <ComplaintFilter
                onSortChange={handleSortChange}
                ispriority={true}
              />

              <div className="filter-container">
                <select
                  className="filter-select"
                  value={priorityFilterType}
                  onChange={(e) => handleFilterChange(e, true)}
                >
                  <option value="name">Search by Name</option>
                  <option value="address">Search by Address</option>
                </select>
                <input
                  type="text"
                  className="searchbar"
                  placeholder="Enter keywords"
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                />
                <button onClick={handleSearch.bind(this, true)}>Search</button>
              </div>

              <div className="prioritysearch search">
                <input
                  type="text"
                  className="prioritysearchbar searchbar"
                  placeholder="Search for complaints"
                  value={priorityKeyword}
                  onChange={(e) => setPriorityKeyword(e.target.value)}
                />
                <button
                  className="searchbutton"
                  onClick={handleSearch.bind(this, true)}
                >
                  Search
                </button>
                <button onClick={clearFilter.bind(this, true)}>
                  Clear Filters
                </button>
              </div>
            </div>

            <div className="prioritycomplaints">
              <ComplaintsList
                category={category}
                complaints={priorityComplaints}
                handleDelete={handleDelete}
                handlePriorityChange={handlePriorityChange}
              />
            </div>
            <button
              onClick={downloadComplaintsCSV.bind(this, priorityComplaints)}
              className="prioritydownload downloadbutton"
            >
              Download
            </button>
          </div>
        )}

        {complaints.length > 0 && (
          <div className="block genblock">
            <h2 className="category-heading">{category}s</h2>
            <div className="filters">
              <ComplaintFilter
                onSortChange={handleSortChange}
                ispriority={false}
              />

              <div className="filter-container">
                <select
                  className="filter-select"
                  value={filterType}
                  onChange={(e) => handleFilterChange(e, false)}
                >
                  <option value="name">Search by Name</option>
                  <option value="address">Search by Address</option>
                </select>
                <input
                  type="text"
                  className="searchbar"
                  placeholder="Enter keywords"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                />
                <button onClick={handleSearch.bind(this, false)}>Search</button>
              </div>

              <div className="gensearch search">
                <input
                  type="text"
                  className="gensearchbar searchbar"
                  placeholder="Search for complaints"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
                <button
                  className="searchbutton"
                  onClick={handleSearch.bind(this, false)}
                >
                  Search
                </button>
                <button onClick={clearFilter.bind(this, false)}>
                  Clear Filters
                </button>
              </div>
            </div>
            <ComplaintsList
              category={category}
              complaints={complaints}
              handleDelete={handleDelete}
              handlePriorityChange={handlePriorityChange}
            />
            <button
              onClick={downloadComplaintsCSV.bind(this, complaints)}
              className="downloadbutton"
            >
              Download
            </button>
          </div>
        )}

        {complaints.length === 0 && priorityComplaints.length === 0 && (
          <h2 className="no-complaints">No complaints found</h2>
        )}
      </div>
      <ScrollToTopButton />
    </Layout>
  );
};

export default Viewcategory;
