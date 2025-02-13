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
            className="mb-0"
            style={{
              fontSize: "14px",
              fontWeight: "400",
              color: "rgba(14, 56, 47, 1)",
            }}
          >
            <i
              className="fa-solid fa-chevron-left"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/dashboard/projects")}
            ></i>{" "}
            View All Projects
          </p>
          <h2
            style={{
              color: "rgba(14, 56, 47, 1)",
              fontSize: "24px",
              fontWeight: "500",
            }}
          >
            Add a New Project
          </h2>
        </div>
      </div>
      <div className="form-pro">
        <div className="form shadow-lg p-5 w-75 m-auto">
          <form onSubmit={handleSubmit(createProject)}>
          <div className="my-2">
          <label htmlFor="title" className="my-1">
            title
          </label>
          <input
            className="form-control "
            placeholder="title"
            id="title"
            {...register("title", { required: "title is required " })}
          />
          {errors.title && (
            <span className="text-danger">{errors.title.message}</span>
          )}
        </div>
        <div className="my-2">
          <label htmlFor="description" className="my-1">
            description
          </label>
          <textarea
            className="form-control"
            placeholder="description"
            id="description"
            {...register("description", {
              required: "description is required ",
            })}
          />
          {errors.description && (
            <span className="text-danger">{errors.description.message}</span>
          )}
        </div>
            <div className="d-flex justify-content-between mt-4">
              <button
              onClick={()=>navigate("/dashboard/projects")}
                style={{
                  padding: "14px 28px",
                  border: "rgba(0, 0, 0, 1) 1px solid",
                  borderRadius: "16px",
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                style={{
                  padding: "14px 28px",
                  backgroundColor: "rgba(239, 155, 40, 1)",
                  border: "none",
                  borderRadius: "16px",
                  color: "#fff",
                }}
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
