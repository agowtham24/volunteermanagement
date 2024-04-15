import "./viewOrganizations.css";
import { Header } from "../header/header";
import { api } from "../../utils/apiconfig";
import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
export interface Organization {
  id: number;
  name: string;
  email: string;
  mobile: string;
  address: string;
}

export function ViewOrganizations() {
  const [organizations, setOrganizations] = useState<Organization[]>([
    {
      id: 0,
      name: "gowtham",
      email: "gowtham@gmail.com",
      mobile: "8008213299",
      address: "vijayawada",
    },
  ]);
  const fetchOrganizations = async () => {
    const response = await api.get("/admin/organizations");
    setOrganizations(response.data);
  };
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      fetchOrganizations();
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
          View Organizations
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
                {organizations.map(
                  (organization: Organization, index: number) => (
                    <tr key={organization.id}>
                      <td>{index + 1}</td>
                      <td>{organization.name}</td>
                      <td>{organization.email}</td>
                      <td>{organization.mobile}</td>
                      <td>{organization.address}</td>
                      <td>
                        <button
                          className="btn btn-danger"
                          type="button"
                          onClick={async () => {
                            try {
                              await api.delete(
                                `/admin/organizations/${organization.id}`
                              );
                              toast.success(
                                "Organization deleted successfully"
                              );
                              fetchOrganizations();
                            } catch (error) {
                              toast.error("Failed to delete organization");
                            }
                          }}
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
}
