import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { USERS_URL } from "../../../../Backend/URL";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Verify() {
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
        let res=await axios.post(USERS_URL.verify,data)
        console.log(res);
        navigate("/dashboard");
      } catch (error) {
        toast.error(error.response.data.message);
        console.log(error);
      }
    };
  return (
    <div className="auth-container"style={{overflow:"hidden"}}>
      <div className="row vh-100 justify-content-center align-items-center">
        <div className="col-md-6 col-10 bg-form p-5">
          <div className="title">
            <p style={{color:"rgba(255, 255, 255, 1)",fontSize:"13px",fontWeight:"500",marginBottom:"0"}}>welcome to PMS</p>
            <h3 style={{color:"rgba(239, 155, 40, 1)",fontSize:"30px",fontWeight:"700",lineHeight:"46px"}} className="mb-4">Verify Account</h3>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
          <div className="email-box">
            <label htmlFor="email" style={{color:"rgba(239, 155, 40, 1)",fontSize:"13px",fontWeight:"500",marginBottom:"2px"}}>E-mail</label>
            <input id="email"  placeholder="Enter your E-mail"
            {...register("email", {
              required: "This Field is Required",
            })}
            />
            {errors.email && <p className="text-danger mb-0">{errors.email.message}</p>}
            </div>
            <div className="otp-box">
            <label htmlFor="otp" style={{color:"rgba(239, 155, 40, 1)",fontSize:"13px",fontWeight:"500",marginTop:"20px",marginBottom:"2px"}}>OTP Verification</label>
            <input id="otp" type="text" placeholder="Enter Verification"
            {...register("code",{
              required:"This Field is Required",
            })}
            />
            {errors.code && <p className="text-danger mb-0">{errors.code.message}</p>}
            </div>
            <button type="submit" className="btn text-white d-block w-100 my-4 rounded rounded-5" style={{ backgroundColor: 'rgba(239, 155, 40, 1)', minHeight: '50px' }}>Save</button>
          </form>
        </div>
      </div>
    </div>
    
  );
}
