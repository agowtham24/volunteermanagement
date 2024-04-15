import "./tasks.css";
import { Header } from "../header/header";
import { api } from "../../utils/apiconfig";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";
import { Organization } from "../../admin/viewOrganizations/viewOrganizations";
import { Volunteer } from "../../admin/viewVolunteers/viewVolunteers";
export interface Task {
  id: number;
  name: string;
  description: string;
  file: string;
  date: string;
  organization: number;
  volunteer: number;
}
export function OrgTasks() {
  const addForm = useForm();
  const editForm = useForm();
  const [organizations, setOrganizations] = useState<Organization[]>([
    {
      id: 0,
      name: "gowtham",
      email: "gowtham@gmail.com",
      mobile: "8008213299",
      address: "vijayawada",
    },
  ]);
  const [volunteers, setVolunteers] = useState<Volunteer[]>([
    {
      id: 0,
      name: "gowtham",
      email: "gowtham@gmail.com",
      mobile: "8008213299",
      address: "vijayawada",
    },
  ]);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({} as Task);
  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: "gowtham",
      description: "gowtham",
      file: "gowtham",
      date: "gowtham",
      organization: 1,
      volunteer: 1,
    },
  ] as Task[]);
  const fetchVolunteers = async () => {
    const response = await api.get("/admin/volunteers");
    setVolunteers(response.data);
  };

  const fetchOrganizations = async () => {
    const response = await api.get("/admin/organizations");
    setOrganizations(response.data);
  };

  const fetchTasks = async () => {
    const response = await api.get("/organization/tasks");
    setTasks(response.data);
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      fetchVolunteers();
      fetchOrganizations();
      fetchTasks();
    }
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <>
      <Header />
      <div className="container organization">
        <div className="card">
          <div className="card-body">
            {editMode === false && <div className="h5">Create Task</div>}
            {editMode === true && <div className="h5">Edit Task</div>}
            <form>
              {editMode === false && (
                <div className="row">
                  <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                    <label htmlFor="name" className="form-label">
                      Name <span>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      maxLength={35}
                      id="name"
                      {...addForm.register("name", {
                        required: "Field is required",
                        pattern: {
                          value: /^[a-zA-Z\s]*$/,
                          message: "Only alphabets are allowed",
                        },
                      })}
                    />
                    {addForm.formState.errors.name && (
                      <span className="text-danger">
                        {addForm.formState.errors.name.message?.toString()}
                      </span>
                    )}
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                    <label htmlFor="description" className="form-label">
                      Description <span>*</span>
                    </label>
                    <textarea
                      className="form-control"
                      id="description"
                      {...addForm.register("description", {
                        required: "Field is required",
                      })}
                    ></textarea>
                    {addForm.formState.errors.description && (
                      <span className="text-danger">
                        {addForm.formState.errors.description.message?.toString()}
                      </span>
                    )}
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                    <label htmlFor="file" className="form-label">
                      File
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="file"
                      {...addForm.register("file")}
                    />
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                    <label htmlFor="date" className="form-label">
                      Date <span>*</span>
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="date"
                      {...addForm.register("date", {
                        required: "Field is required",
                      })}
                    />
                    {addForm.formState.errors.date && (
                      <span className="text-danger">
                        {addForm.formState.errors.date.message?.toString()}
                      </span>
                    )}
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                    <label htmlFor="organization" className="form-label">
                      Organization <span>*</span>
                    </label>
                    <select
                      className="form-select"
                      id="organization"
                      {...addForm.register("organization", {
                        required: "Field is required",
                      })}
                    >
                      <option value="">Select Organization</option>
                      {organizations.map((organization) => (
                        <option key={organization.id} value={organization.id}>
                          {organization.name}
                        </option>
                      ))}
                    </select>
                    {addForm.formState.errors.organization && (
                      <span className="text-danger">
                        {addForm.formState.errors.organization.message?.toString()}
                      </span>
                    )}
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                    <label htmlFor="volunteer" className="form-label">
                      Volunteer <span>*</span>
                    </label>
                    <select
                      className="form-select"
                      id="volunteer"
                      {...addForm.register("volunteer", {
                        required: "Field is required",
                      })}
                    >
                      <option value="">Select Volunteer</option>
                      {volunteers.map((volunteer) => (
                        <option key={volunteer.id} value={volunteer.id}>
                          {volunteer.name}
                        </option>
                      ))}
                    </select>
                    {addForm.formState.errors.volunteer && (
                      <span className="text-danger">
                        {addForm.formState.errors.volunteer.message?.toString()}
                      </span>
                    )}
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 col-12 text-center">
                    <button
                      type="submit"
                      className="btn btn-primary mt-3"
                      onClick={addForm.handleSubmit(async (data) => {
                        const formData = new FormData();
                        formData.append("name", data.name);
                        formData.append("description", data.description);
                        formData.append("date", data.date);
                        formData.append("organization", data.organization);
                        formData.append("volunteer", data.volunteer);
                        if (data.file.length > 0) {
                          formData.append("file", data.file[0]);
                        }
                        const response = await api.post(
                          "/organization/tasks",
                          formData
                        );
                        if (response.status === 201) {
                          toast.success("Task created successfully");
                          fetchTasks();
                        }
                      })}
                    >
                      Create Task
                    </button>
                  </div>
                </div>
              )}
              {editMode === true && (
                <div className="row">
                  <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                    <label htmlFor="name" className="form-label">
                      Name <span>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      maxLength={35}
                      id="name"
                      defaultValue={editData.name}
                      {...editForm.register("name", {
                        required: "Field is required",
                        pattern: {
                          value: /^[a-zA-Z\s]*$/,
                          message: "Only alphabets are allowed",
                        },
                      })}
                    />
                    {editForm.formState.errors.name && (
                      <span className="text-danger">
                        {editForm.formState.errors.name.message?.toString()}
                      </span>
                    )}
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                    <label htmlFor="description" className="form-label">
                      Description <span>*</span>
                    </label>
                    <textarea
                      className="form-control"
                      id="description"
                      defaultValue={editData.description}
                      {...editForm.register("description", {
                        required: "Field is required",
                      })}
                    ></textarea>
                    {editForm.formState.errors.description && (
                      <span className="text-danger">
                        {editForm.formState.errors.description.message?.toString()}
                      </span>
                    )}
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                    <label htmlFor="file" className="form-label">
                      File
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="file"
                      {...editForm.register("file")}
                    />
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                    <label htmlFor="date" className="form-label">
                      Date <span>*</span>
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="date"
                      defaultValue={editData.date}
                      {...editForm.register("date", {
                        required: "Field is required",
                      })}
                    />
                    {editForm.formState.errors.date && (
                      <span className="text-danger">
                        {editForm.formState.errors.date.message?.toString()}
                      </span>
                    )}
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                    <label htmlFor="organization" className="form-label">
                      Organization <span>*</span>
                    </label>
                    <select
                      className="form-select"
                      id="organization"
                      {...editForm.register("organization", {
                        required: "Field is required",
                      })}
                    >
                      <option value="">Select Organization</option>
                      {organizations.map((organization) => (
                        <option key={organization.id} value={organization.id}>
                          {organization.name}
                        </option>
                      ))}
                    </select>
                    {editForm.formState.errors.organization && (
                      <span className="text-danger">
                        {editForm.formState.errors.organization.message?.toString()}
                      </span>
                    )}
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                    <label htmlFor="volunteer" className="form-label">
                      Volunteer <span>*</span>
                    </label>
                    <select
                      className="form-select"
                      id="volunteer"
                      {...editForm.register("volunteer", {
                        required: "Field is required",
                      })}
                    >
                      <option value="">Select Volunteer</option>
                      {volunteers.map((volunteer) => (
                        <option key={volunteer.id} value={volunteer.id}>
                          {volunteer.name}
                        </option>
                      ))}
                    </select>
                    {editForm.formState.errors.volunteer && (
                      <span className="text-danger">
                        {editForm.formState.errors.volunteer.message?.toString()}
                      </span>
                    )}
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 col-12 text-center">
                    <button
                      type="submit"
                      className="btn btn-primary mt-3"
                      onClick={editForm.handleSubmit(async (data) => {
                        const formData = new FormData();
                        formData.append("name", data.name);
                        formData.append("description", data.description);
                        formData.append("date", data.date);
                        formData.append("organization", data.organization);
                        formData.append("volunteer", data.volunteer);
                        if (data.file.length > 0) {
                          formData.append("file", data.file[0]);
                        }
                        const response = await api.put(
                          `/organization/tasks/${editData.id}`,
                          formData
                        );
                        if (response.status === 200) {
                          toast.success("Task updated successfully");
                          fetchTasks();
                          setEditMode(false);
                        }
                      })}
                    >
                      Update Task
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger mt-3"
                      onClick={() => {
                        setEditMode(false);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
        <div className="card mt-3">
          <div className="card-body">
            <div className="h5">Tasks List</div>
            <table className="table table-bordered text-center">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>File</th>
                  <th>Date</th>
                  <th>Organization</th>
                  <th>Volunteer</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task: Task, index: number) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{task.name}</td>
                    <td>{task.description}</td>
                    <td>
                      {task.file.length > 0 && (
                        <a
                          href={task.file}
                          target="_blank"
                          rel="noreferrer"
                          download
                        >
                          Download
                        </a>
                      )}
                    </td>
                    <td>{task.date}</td>
                    <td>
                      {organizations.map((organization) => {
                        if (organization.id === task.organization) {
                          return organization.name;
                        }
                      })}
                    </td>
                    <td>
                      {volunteers.map((volunteer) => {
                        if (volunteer.id === task.volunteer) {
                          return volunteer.name;
                        }
                      })}
                    </td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          setEditMode(true);
                          setEditData(task);
                          editForm.setValue("name", task.name);
                          editForm.setValue("description", task.description);
                          editForm.setValue("date", task.date);
                          editForm.setValue("organization", task.organization);
                          editForm.setValue("volunteer", task.volunteer);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        style={{
                          marginLeft: "5px",
                        }}
                        className="btn btn-danger"
                        onClick={async () => {
                          const response = await api.delete(
                            `/organization/tasks/${task.id}`
                          );
                          if (response.status === 204) {
                            toast.success("Task deleted successfully");
                            fetchTasks();
                          }
                        }}
                      >
                        Delete
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
