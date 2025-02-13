import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BASE_TASKS, TASKS_URL } from "../../../../Backend/URL";
import { useForm } from "react-hook-form";

export default function CreateTasks() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

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

      const fetchedData = res.data.data;
      setUsers(fetchedData.map((item) => item.employee));
      setProjects(fetchedData.map((item) => item.project));
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // استدعاء جلب البيانات عند تحميل الصفحة
  useEffect(() => {
    getTask();
  }, []);

  // إرسال البيانات إلى API
  const createTask = async (data) => {
    try {
      let res = await axios.post(
        BASE_TASKS,
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
      <div className="title mb-5">
        <div className="d-flex align-items-center">
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
          style={{ color: "rgba(14, 56, 47, 1)", fontSize: "24px" }}
        >
          Add a New Task
        </h2>
      </div>

      <div className="cards shadow-lg p-4 w-75 m-auto">
        <form onSubmit={handleSubmit(createTask)}>
          {/* حقل العنوان */}
          <div className="form-group">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Title"
              id="title"
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && (
              <span className="text-danger">{errors.title.message}</span>
            )}
          </div>

          {/* حقل الوصف */}
          <div className="form-group">
            <label htmlFor="description" className="my-1">
              Description
            </label>
            <textarea
              className="form-control"
              placeholder="Description"
              id="description"
              {...register("description", {
                required: "Description is required",
              })}
            />
            {errors.description && (
              <span className="text-danger">{errors.description.message}</span>
            )}
          </div>

          <div className="row">
            {/* اختيار المستخدم */}
            <div className="col-md-6 mb-3">
              <label htmlFor="employeeId" className="form-label">
                User
              </label>
              <select
                className="form-select"
                aria-label="Default select example"
                {...register("employeeId", { required: "User is required" })}
                onChange={(e) => setSelectedUser(e.target.value)}
              >
                <option value="">Open this select menu</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.userName}
                  </option>
                ))}
              </select>
              {errors.employeeId && (
                <span className="text-danger">{errors.employeeId.message}</span>
              )}
            </div>

            {/* اختيار المشروع */}
            <div className="col-md-6 mb-3">
              <label htmlFor="projectId" className="form-label">
                Project
              </label>
              <select
                className="form-select"
                aria-label="Default select example"
                {...register("projectId", { required: "Project is required" })}
                onChange={(e) => setSelectedProject(e.target.value)}
              >
                <option value="">Open this select menu</option>
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.title}
                  </option>
                ))}
              </select>
              {errors.projectId && (
                <span className="text-danger">{errors.projectId.message}</span>
              )}
            </div>
          </div>

          {/* الأزرار */}
          <div className="d-flex justify-content-between mt-4">
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
