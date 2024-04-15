import "./viewVolunteers.css";
import { Header } from "../header/header";
import { api } from "../../utils/apiconfig";
import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
export interface Volunteer {
  id: number;
  name: string;
  email: string;
  mobile: string;
  address: string;
}
export function ViewVolunteers() {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([
    {
      id: 0,
      name: "gowtham",
      email: "gowtham@gmail.com",
      mobile: "8008213299",
      address: "vijayawada",
    },
  ]);
  const fetchVolunteers = async () => {
    const response = await api.get("/admin/volunteers");
    setVolunteers(response.data);
  };
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      fetchVolunteers();
    }
    return () => {
      mounted = false;
    };
  }, []);
  return (
    <>
      <Header />
      <div className="container admin">
        <div
          className="h5 text-center"
          style={{
            marginTop: "60px",
          }}
        >
          View Volunteers
        </div>
        <div className="card mt-3">
          <div className="card-body">
            <table className="table table-bordered text-center">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>Address</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {volunteers.map((volunteer, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{volunteer.name}</td>
                    <td>{volunteer.email}</td>
                    <td>{volunteer.mobile}</td>
                    <td>{volunteer.address}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={async () => {
                          const response = await api.delete(
                            `/admin/volunteers/${volunteer.id}`
                          );
                          if (response.status === 200) {
                            fetchVolunteers();
                            toast.success("Volunteer deleted successfully");
                          }
                        }}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
}
