import "./header.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export function Header() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("admin")) {
      setIsLogin(true);
    }
  }, []);

  return (
    <div className="navbox">
      <nav className="navbar navbar-expand-lg fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand">Admin Login</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse"
            id="navbarSupportedContent"
            style={{ marginLeft: "45%" }}
          >
            <ul className="navbar-nav mb-2 mb-lg-0">
              {isLogin ? (
                <>
                  <li className="nav-item">
                    <Link to="/admin/organizations" className="nav-link">
                      View Organizations
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/admin/volunteers" className="nav-link">
                      View Volunteers
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/admin/tasks" className="nav-link">
                      View Tasks
                    </Link>
                  </li>
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="fa-solid fa-user"></i>
                    </a>
                    <ul className="dropdown-menu">
                      <li>
                        <a
                          className="dropdown-item aa"
                          onClick={() => {
                            sessionStorage.removeItem("admin")
                            navigate("/admin/login");
                            window.location.reload();
                          }}
                        >
                          SignOut
                        </a>
                      </li>
                      <li>{/* <hr className="dropdown-divider" /> */}</li>
                      {/* <li>
                        <Link to="/profile" className="dropdown-item">
                          Profile
                        </Link>
                      </li> */}
                    </ul>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <Link to="/admin/login" className="nav-link">
                    login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
