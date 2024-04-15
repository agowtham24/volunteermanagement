import "./home.css";
import { useNavigate } from "react-router-dom";

export function Home() {
  const navigate = useNavigate();

  return (
    <>
      <div className="container home">
        <div
          className="row align-items-center justify-content-center"
          style={{
            height: "100vh",
          }}
        >
          <div className="h3 text-center" style={{ color: "#334155" }}>
            Welcome to Volunteer Management System
          </div>
          <div className="col-lg-4 col-md-4 col-sm-6 col-12">
            <div
              className="card"
              onClick={() => {
                navigate("/admin/login");
              }}
            >
              <div className="card-body">
                <div className="h4 text-center mt-5">Admin Login</div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-6 col-12">
            <div
              className="card"
              onClick={() => {
                navigate("/volunteer/login");
              }}
            >
              <div className="card-body">
                {" "}
                <div className="h4 text-center mt-5">Volunteer Login</div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-6 col-12">
            {" "}
            <div
              className="card"
              onClick={() => {
                navigate("/organization/login");
              }}
            >
              <div className="card-body">
                {" "}
                <div className="h4 text-center mt-5">Organization Login</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
