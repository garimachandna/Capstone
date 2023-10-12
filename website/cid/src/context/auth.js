import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const storedAuth = localStorage.getItem("auth");
    return storedAuth ? JSON.parse(storedAuth) : { user: null, token: "" };
  });

  //default axios
  axios.defaults.headers.common["Authorization"] = auth?.token;

  useEffect(() => {
    // const data = localStorage.getItem("auth");
    // // console.log("data", data);
    // if (data) {
    //   const parseData = JSON.parse(data);
    //   // console.log("parseData", parseData);
    //   // console.log("parseData.user", parseData.user);
    //   // console.log("parseData.token", parseData.token);

    //   // console.log("auth before ", auth);

    //   setAuth((prevAuth) => ({
    //     ...prevAuth,
    //     user: parseData.user,
    //     token: parseData.token,
    //   }));

    //   axios.defaults.headers.common["Authorization"] = parseData.token;
    // }
    //eslint-disable-next-line

    localStorage.setItem("auth", JSON.stringify(auth));
    // console.log("auth after ", auth);
  }, [auth]);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

// custom hook
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
