import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { USERS_URL } from "../../../../Backend/URL";
import { toast } from "react-toastify";
export default function Register() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(USERS_URL.register, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/dashboard"); // Redirect to login page after successful registration
      toast.success("Register Successfully")
    } catch (error) {
      console.error(error);
      if(error.status===409){
        toast.error("The username or email already exists in the database.")
      }
      
    }
  };

  return (
    <div className="auth-container vh-100 d-flex align-items-center justify-content-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 bg-form p-5 rounded">
          <div className="title">
            <p
              style={{
                color: "rgba(255, 255, 255, 1)",
                fontSize: "13px",
                fontWeight: "500",
                marginBottom: "0",
              }}
            >
              welcome to PMS
            </p>
            <h3
              style={{
                color: "rgba(239, 155, 40, 1)",
                borderBottom: "4px solid rgba(239, 155, 40, 1)",
                width: "12px",
                fontSize: "30px",
                fontWeight: "700",
                lineHeight: "46px",
              }}
              className="mb-4"
            >
              Register
            </h3>
          </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row">
                {/* العمود الأول */}
                <div className="col-md-6">
                  <div className="mb-3">
                    <label
                      htmlFor="userName"
                      className=""
                      style={{color:"rgba(239, 155, 40, 1)"}}
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      className={` ${errors.userName ? "is-invalid" : ""}`}
                      id="userName"
                      placeholder="Enter your username"
                      {...register("userName", {
                        required: "Username is required",
                      })}
                    />
                    {errors.userName && (
                      <div className="invalid-feedback">
                        {errors.userName.message}
                      </div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="" style={{color:"rgba(239, 155, 40, 1)"}}>
                      Email
                    </label>
                    <input
                      type="email"
                      className={`  ${
                        errors.email ? "is-invalid" : ""
                      }`}
                      id="email"
                      placeholder="Enter your email"
                      {...register("email", { required: "Email is required" })}
                    />
                    {errors.email && (
                      <div className="invalid-feedback">
                        {errors.email.message}
                      </div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="country"
                      className=""
                      style={{color:"rgba(239, 155, 40, 1)"}}
                    >
                      Country
                    </label>
                    <input
                      type="text"
                      className={`  ${
                        errors.country ? "is-invalid" : ""
                      }`}
                      id="country"
                      placeholder="Enter your country"
                      {...register("country", {
                        required: "Country is required",
                      })}
                    />
                    {errors.country && (
                      <div className="invalid-feedback">
                        {errors.country.message}
                      </div>
                    )}
                  </div>
                </div>

                {/* العمود الثاني */}
                <div className="col-md-6">
                  <div className="mb-3">
                    <label
                      htmlFor="phoneNumber"
                      className=""
                      style={{color:"rgba(239, 155, 40, 1)"}}
                    >
                      Phone Number
                    </label>
                    <input
                      type="text"
                      className={`  ${
                        errors.phoneNumber ? "is-invalid" : ""
                      }`}
                      id="phoneNumber"
                      placeholder="Enter your phone number"
                      {...register("phoneNumber", {
                        required: "Phone number is required",
                      })}
                    />
                    {errors.phoneNumber && (
                      <div className="invalid-feedback">
                        {errors.phoneNumber.message}
                      </div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="password"
                      className=""
                      style={{color:"rgba(239, 155, 40, 1)"}}
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      className={`  ${
                        errors.password ? "is-invalid" : ""
                      }`}
                      id="password"
                      placeholder="Enter your password"
                      {...register("password", {
                        required: "Password is required",
                      })}
                    />
                    {errors.password && (
                      <div className="invalid-feedback">
                        {errors.password.message}
                      </div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="confirmPassword"
                      className=""
                      style={{color:"rgba(239, 155, 40, 1)"}}
                    >
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      className={`  ${
                        errors.confirmPassword ? "is-invalid" : ""
                      }`}
                      id="confirmPassword"
                      placeholder="Confirm your password"
                      {...register("confirmPassword", {
                        required: "Confirm Password is required",
                        validate: (value) =>
                          value === watch("password") ||
                          "Passwords do not match",
                      })}
                    />
                    {errors.confirmPassword && (
                      <div className="invalid-feedback">
                        {errors.confirmPassword.message}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* زر التسجيل */}
              <button
                type="submit"
                className="w-100 mt-4 py-2 rounded-pill text-white"
                style={{
                  backgroundColor: "rgba(239, 155, 40, 1)",
                  border: "none",
                }}
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
