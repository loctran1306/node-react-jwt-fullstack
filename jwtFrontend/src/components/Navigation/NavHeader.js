import React, { useContext } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import "./Nav.scss";
import { Nav, NavDropdown } from "react-bootstrap";
import { logoutUser } from "../../services/userService";
import { toast } from "react-toastify";
const NavHeader = () => {
  const { user, logoutContext } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    let data = await logoutUser(); //clear cookies
    localStorage.removeItem("jwt"); // clear localstorage
    logoutContext(); //clear context
    if (+data.data.EC === 0) {
      navigate("/login");
      toast.success(data.data.EM);
    } else {
      toast.error(data.data.EM);
    }
  };

  if ((user && user.isAuthenticated) || location.pathname === "/") {
    return (
      // <div className="topnav">
      //   <ul>
      //     <NavLink to="/">Home</NavLink>
      //     <NavLink to="/user">Users</NavLink>
      //     <NavLink to="/project">Projects</NavLink>
      //     <NavLink to="/about">About</NavLink>
      //   </ul>
      // </div>

      <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <div className="navbar-brand" href="#">
              MANAGER
            </div>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarTogglerDemo02"
              aria-controls="navbarTogglerDemo02"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink to="/">Home</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/user">Users</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/project">Projects</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/about">About</NavLink>
                </li>
              </ul>
              <Nav>
                <NavDropdown title="Setting" id="basic-nav-dropdown">
                  <NavDropdown.Item>Change Password</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item>
                    <span onClick={() => handleLogout()}>Logout</span>
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </div>
          </div>
        </nav>
      </>
    );
  }
};

export default NavHeader;
