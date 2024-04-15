import "./tasks.css";
import { Header } from "../header/header";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Task } from "../../admin/viewTasks/viewTasks";
import { api } from "../../utils/apiconfig";
export function VolunteerTasks() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 0,
      name: "task1",
      description: "task1",
      file: "file1",
      organization: "org1",
      volunteer: "vol1",
      date: "date1",
    },
  ]);
  const fetchTasksByVolunteer = async () => {
    const volunteer = JSON.parse(sessionStorage.getItem("volunteer") || "{}");
    const response = await api.get(`/volunteer/tasks/${volunteer.id}`);
    setTasks(response.data);
  };
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      fetchTasksByVolunteer();
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
          View Tasks
        </div>
        <div className="card mt-3">
          <div className="card-body">
            <table className="table table-bordered text-center">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Date</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>File</th>
                  <th>Organization</th>
                  <th>Volunteer</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task: Task, index: number) => (
                  <tr key={task.id}>
                    <td>{index + 1}</td>
                    <td>{task.date}</td>
                    <td>{task.name}</td>
                    <td>{task.description}</td>
                    <td>{task.file}</td>
                    <td>{task.organization}</td>
                    <td>{task.volunteer}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={async () => {
                          try {
                            await api.delete(`/admin/tasks/${task.id}`);
                            window.location.reload();
                            toast.success("Task deleted successfully");
                          } catch (error) {
                            toast.error("Failed to delete task");
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
