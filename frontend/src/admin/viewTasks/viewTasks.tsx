import "./viewTasks.css";
import { Header } from "../header/header";
import { api } from "../../utils/apiconfig";
import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
export interface Task {
  id: number;
  name: string;
  description: string;
  file: string;
  organization: string;
  volunteer: string;
  date: string;
}
export function ViewTasks() {
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
  const fetchTasks = async () => {
    const response = await api.get("/admin/tasks");
    setTasks(response.data);
  };
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      fetchTasks();
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
                            fetchTasks();
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
