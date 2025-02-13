import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { USERS_URL } from "../../../../Backend/URL";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../../../../Context/Components/AuthJWT/AuthJWT";
export default function Login() {
  // context
  const {saveLoginData}=useContext(AuthContext)
  // navagite
  const navigate=useNavigate();
  // useform
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      let res = await axios.post(USERS_URL.login, data);
      console.log(res);
      const token = res.data.token;
      if (!token) throw new Error("No token received");
      localStorage.setItem("token", token); // ✅ تخزين التوكن في localStorage
      console.log(token)
      saveLoginData(); // ✅ تحديث بيانات المستخدم بعد تسجيل الدخول
      navigate("/dashboard");
  
    } catch (error) {
      toast.error("Login Failed!");
      console.log(error);
    }
  };
  return (
    <div className="auth-container" style={{ overflow: "hidden" }}>
      <div className="row vh-100 justify-content-center align-items-center">
        <div className="col-md-6 col-10 bg-form p-5">
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
              Login
            </h3>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="email-box">
              <label
                htmlFor="email"
                style={{
                  color: "rgba(239, 155, 40, 1)",
                  fontSize: "13px",
                  fontWeight: "500",
                  marginBottom: "2px",
                }}
              >
                E-mail
              </label>
              <input
                id="email"
                placeholder="Enter your E-mail"
                {...register("email", {
                  required: "This Field is Required",
                })}
              />
                {errors.email && <p className="text-danger mb-0">{errors.email.message}</p>}
            </div>
            <div className="password-box position-relative">
              <label
                htmlFor="password"
                style={{
                  color: "rgba(239, 155, 40, 1)",
                  fontSize: "13px",
                  fontWeight: "500",
                  marginTop: "20px",
                  marginBottom: "2px",
                }}
              >
                password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: "This Field is Required",
                })}
              />
              {errors.password && <p className="text-danger mb-0">{errors.password.message}</p>}
            </div>
            <div className="link-form d-flex justify-content-between flex-column flex-md-row mt-3">
              <Link
                to={"/register"}
                style={{
                  textDecoration: "none",
                  color: " rgba(255, 255, 255, 1)",
                }}
              >
                Register Now ?
              </Link>
              <Link
                to={"/forget"}
                style={{
                  textDecoration: "none",
                  color: " rgba(255, 255, 255, 1)",
                }}
              >
                Forget Password ?
              </Link>
            </div>
            <button
              type="submit"
              className="btn text-white d-block w-100 my-4 rounded rounded-5"
              style={{
                backgroundColor: "rgba(239, 155, 40, 1)",
                minHeight: "50px",
              }}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
