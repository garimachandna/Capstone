import { useState, useEffect } from "react";
import { useAuth } from "../../../context/auth";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";
import { Route, useNavigate } from "react-router-dom";
// import Spinner from "./spinner";

export default function PrivateRoute({ children }) {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get("/api/user-auth");
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) {
      authCheck();
    }
  }, [auth?.token]);

  console.log("ok", ok);
  return <Route render={(props) => (ok ? <Outlet /> : Navigate("/login"))} />;
}
