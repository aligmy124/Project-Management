import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  BASE_TASKS,
  Projects_URL,
  TASKS_URL,
  USERS_URL,
} from "../../../../Backend/URL";
import { useForm } from "react-hook-form";

export default function CreateTasks() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [Load, setLoad] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // حالة لتخزين قائمة المستخدمين والمشاريع
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);

  // حالة لتخزين القيم المختارة
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedProject, setSelectedProject] = useState("");

  // جلب البيانات من API
  const getTask = async () => {
    try {
      let res = await axios.get(TASKS_URL.manager, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res);

      const fetchedData = res.data.data;
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const getUsers = async () => {
    try {
      let res = await axios.get(USERS_URL.AllUsers, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsers(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoad(false);
    }
  };
  const [projectList, setprojectList] = useState([]);
  const getProjects = async () => {
    try {
      let res = await axios.get(Projects_URL.getAll, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setprojectList(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoad(false);
    }
  };
  // استدعاء جلب البيانات عند تحميل الصفحة
  useEffect(() => {
    getTask();
    getUsers();
    getProjects();
  }, []);

  // إرسال البيانات إلى API
  const createTask = async (data) => {
    try {
      let res = await axios.post(
        TASKS_URL.create,
        { ...data, employeeId: selectedUser, projectId: selectedProject },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Task created successfully");
      navigate("/dashboard/tasks");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create task");
    }
  };

  return (
    <div className="container">
      <div className="title mb-4">
        <div className="d-flex align-items-center flex-wrap">
          <i
            className="fa-solid fa-chevron-left me-2"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/dashboard/users")}
          ></i>
          <p className="mb-0 text-muted" style={{ fontSize: "14px" }}>
            View All Users
          </p>
        </div>
        <h2
          className="mt-2"
          style={{ color: "rgba(14, 56, 47, 1)", fontSize: "20px" }}
        >
          Add a New Task
        </h2>
      </div>

      <div className="card shadow-lg p-4 mx-auto" style={{ maxWidth: "800px" }}>
        <form onSubmit={handleSubmit(createTask)}>
          {/* العنوان */}
          <div className="form-group mb-3">
            <label htmlFor="title" className="form-label fw-bold">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Task Title"
              id="title"
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && (
              <span className="text-danger small">{errors.title.message}</span>
            )}
          </div>

          {/* الوصف */}
          <div className="form-group mb-3">
            <label htmlFor="description" className="form-label fw-bold">
              Description
            </label>
            <textarea
              className="form-control"
              placeholder="Task Description"
              id="description"
              rows={3}
              {...register("description", {
                required: "Description is required",
              })}
            />
            {errors.description && (
              <span className="text-danger small">
                {errors.description.message}
              </span>
            )}
          </div>

          <div className="row">
            {/* اختيار المستخدم */}
            <div className="col-12 col-md-6 mb-3">
              <label htmlFor="employeeId" className="form-label fw-bold">
                User
              </label>
              <select
                className="form-select"
                {...register("employeeId", { required: "User is required" })}
                onChange={(e) => setSelectedUser(e.target.value)}
              >
                <option value="">Select a user</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user?.userName}
                  </option>
                ))}
              </select>
              {errors.employeeId && (
                <span className="text-danger small">
                  {errors.employeeId.message}
                </span>
              )}
            </div>

            {/* اختيار المشروع */}
            <div className="col-12 col-md-6 mb-3">
              <label htmlFor="projectId" className="form-label fw-bold">
                Project
              </label>
              <select
                className="form-select"
                {...register("projectId", { required: "Project is required" })}
                onChange={(e) => setSelectedProject(e.target.value)}
              >
                <option value="">Select a project</option>
                {projectList.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.title}
                  </option>
                ))}
              </select>
              {errors.projectId && (
                <span className="text-danger small">
                  {errors.projectId.message}
                </span>
              )}
            </div>
          </div>

          {/* الأزرار */}
          <div className="d-flex flex-column flex-md-row justify-content-between mt-4 gap-2">
            <button
              type="button"
              onClick={() => navigate("/dashboard/tasks")}
              className="btn btn-outline-dark px-4 py-2 rounded-3"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn text-white px-4 py-2 rounded-3"
              style={{
                backgroundColor: "rgba(239, 155, 40, 1)",
                border: "none",
              }}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
