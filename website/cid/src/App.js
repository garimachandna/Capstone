import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
// import Contact from "./pages/contact";
//import Policy from "./pages/policy";
import Pagenotfound from "./pages/NoPage";
import Login from "./pages/auth/login";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./pages/user/dashboard";
import PrivateRoute from "./components/layout/routes/private";
import ForgotPassword from "./pages/auth/forgotpassword";
import Uploadcsv from "./pages/Uploadcsv";
import Viewresult from "./pages/Viewresult";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="" element={<Dashboard />} />
        </Route>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/uploadcsv" element={<Uploadcsv />} />
        <Route path="/viewresult" element={<Viewresult />} />
        {/* <Route path="/contact" element={<Contact />} /> */}
        {/* <Route path="/policy" element={<Policy />}></Route> */}
        <Route path="*" element={<Pagenotfound />}></Route>
      </Routes>
    </>
  );
}

export default App;
