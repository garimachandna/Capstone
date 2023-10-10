import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/auth";

function Header() {
  const [auth, setAuth] = useAuth();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
  };

  console.log(auth);
  console.log(auth.user);
  if (auth.user) console.log(auth.user.role);
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
              <Link to="/" className="navbar-brand">
                StreamlineCID
              </Link>
            </div>
            <li className="nav-item">
              <NavLink to="/" className="nav-link ">
                Home
              </NavLink>
            </li>

            {auth?.user?.role === 2 ? (
              <li className="nav-item">
                <NavLink to="/viewresult" className="nav-link ">
                  View Complaints
                </NavLink>
              </li>
            ) : (
              <></>
            )}
            {auth?.user?.role === 0 ? (
              <>
                <li className="nav-item">
                  <NavLink to="/filecomplaint" className="nav-link ">
                    Lodge a Complaint
                  </NavLink>
                </li>
              </>
            ) : (
              <></>
            )}

            {auth?.user?.role === 1 ? (
              <li className="nav-item">
                <NavLink to="/register" className="nav-link ">
                  Register
                </NavLink>
              </li>
            ) : (
              <></>
            )}
            {!auth?.user ? (
              <>
                <li className="nav-item">
                  <NavLink to="/registeruser" className="nav-link">
                    Register
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/login" className="nav-link">
                    Login
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink
                    onClick={handleLogout}
                    to="/login"
                    className="nav-link"
                  >
                    Logout
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Header;
