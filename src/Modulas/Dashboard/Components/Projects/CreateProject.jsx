import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BASE_URL, USERS_URL } from "../../../../Backend/URL";
import { useForm } from "react-hook-form";

export default function CreateProject() {
  // Height nav
  const navbarheight = 64;
  // navigite
  const navigate = useNavigate();
  //   token
  const token = localStorage.getItem("token");
  // Register
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const createProject = async (data) => {
    try {
      let res = await axios.post(`${BASE_URL}/Project`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res);
      navigate("/dashboard/projects")
      toast.success("create Success");
    } catch (error) {
      console.log(error);
      toast.error("create Failed!");
    }
  };
  return (
<div className="container">
  <div className="title mb-5">
    <div className="title-info">
      <p
        className="mb-0 d-flex align-items-center gap-2"
        style={{ fontSize: "14px", fontWeight: "400", color: "rgba(14, 56, 47, 1)" }}
      >
        <i
          className="fa-solid fa-chevron-left"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/dashboard/projects")}
        ></i>
        View All Projects
      </p>
      <h2 className="fs-4 fw-semibold text-dark">Add a New Project</h2>
    </div>
  </div>

  <div className="form-pro">
    <div className="form shadow-lg p-4 p-md-5 col-12 col-md-10 col-lg-8 m-auto rounded-4">
      <form onSubmit={handleSubmit(createProject)}>
        
        <div className="my-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            className="form-control"
            placeholder="title"
            id="title"
            {...register("title", { required: "title is required " })}
          />
          {errors.title && <span className="text-danger">{errors.title.message}</span>}
        </div>

        <div className="my-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            className="form-control"
            placeholder="description"
            id="description"
            rows="4"
            {...register("description", { required: "description is required " })}
          />
          {errors.description && <span className="text-danger">{errors.description.message}</span>}
        </div>

        <div className="d-flex flex-column flex-md-row justify-content-between gap-3 mt-4">
          <button
            type="button"
            onClick={() => navigate("/dashboard/projects")}
            className="btn btn-outline-dark rounded-3 px-4 py-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn text-white rounded-3 px-4 py-2"
            style={{backgroundColor:"rgba(239, 155, 40, 1)"}}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
</div>

  );
}
