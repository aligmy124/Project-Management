import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BASE_URL, USERS_URL } from "../../../../Backend/URL";
import { useForm } from "react-hook-form";

export default function CreateUsers() {
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
  // create
  const createProject = async (data) => {
    try {
      let res = await axios.post(`${BASE_URL}/Users/Create`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res);
      navigate("/dashboard/users")
      toast.success("create Success");
    } catch (error) {
      console.log(error);
      toast.error("create Failed!");
    }
  };
  return (
        <div className="container">
          {/* عنوان الصفحة */}
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
            <h2 className="mt-2" style={{ color: "rgba(14, 56, 47, 1)", fontSize: "24px" }}>
              Add a New User
            </h2>
          </div>
    
          {/* نموذج إضافة المستخدم */}
          <div className="card shadow-lg p-4 w-75 m-auto">
            <form onSubmit={handleSubmit(createProject)}>
              <div className="row">
                {/* userName */}
                <div className="col-md-6 mb-3">
                  <label htmlFor="userName" className="form-label ">User Name</label>
                  <input
                    className="form-control"
                    placeholder="Enter user name"
                    id="userName"
                    {...register("userName", { required: "User Name is required" })}
                  />
                  {errors.userName && <span className="text-danger">{errors.userName.message}</span>}
                </div>
    
                {/* email */}
                <div className="col-md-6 mb-3">
                  <label htmlFor="email" className="form-label ">Email</label>
                  <input
                    className="form-control"
                    placeholder="Enter email"
                    id="email"
                    {...register("email", { required: "Email is required" })}
                  />
                  {errors.email && <span className="text-danger">{errors.email.message}</span>}
                </div>
    
                {/* country */}
                <div className="col-md-6 mb-3">
                  <label htmlFor="country" className="form-label ">Country</label>
                  <input
                    className="form-control"
                    placeholder="Enter country"
                    id="country"
                    {...register("country", { required: "Country is required" })}
                  />
                  {errors.country && <span className="text-danger">{errors.country.message}</span>}
                </div>
    
                {/* phoneNumber */}
                <div className="col-md-6 mb-3">
                  <label htmlFor="phoneNumber" className="form-label ">Phone Number</label>
                  <input
                    className="form-control"
                    placeholder="Enter phone number"
                    id="phoneNumber"
                    {...register("phoneNumber", { required: "Phone Number is required" })}
                  />
                  {errors.phoneNumber && <span className="text-danger">{errors.phoneNumber.message}</span>}
                </div>
    
                {/* password */}
                <div className="col-md-6 mb-3">
                  <label htmlFor="password" className="form-label ">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    id="password"
                    {...register("password", { required: "Password is required" })}
                  />
                  {errors.password && <span className="text-danger">{errors.password.message}</span>}
                </div>
    
                {/* confirmPassword */}
                <div className="col-md-6 mb-3">
                  <label htmlFor="confirmPassword" className="form-label ">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Confirm password"
                    id="confirmPassword"
                    {...register("confirmPassword", { required: "Confirm Password is required" })}
                  />
                  {errors.confirmPassword && <span className="text-danger">{errors.confirmPassword.message}</span>}
                </div>
              </div>
    
              {/* الأزرار */}
              <div className="d-flex justify-content-between mt-4">
                <button
                  type="button"
                  onClick={() => navigate("/dashboard/projects")}
                  className="btn btn-outline-dark px-4 py-2 rounded-3"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn text-white px-4 py-2 rounded-3"
                  style={{ backgroundColor: "rgba(239, 155, 40, 1)", border: "none" }}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    }