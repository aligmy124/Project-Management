import React from "react";
import { Link } from "react-router-dom";
export default function Change() {
  return (
    <div className="auth-container"style={{overflow:"hidden"}}>
      <div className="row vh-100 justify-content-center align-items-center">
        <div className="col-md-6 col-10 bg-form p-5">
          <div className="title">
            <p style={{color:"rgba(255, 255, 255, 1)",fontSize:"13px",fontWeight:"500",marginBottom:"0"}}>welcome to PMS</p>
            <h3 style={{color:"rgba(239, 155, 40, 1)",fontSize:"30px",fontWeight:"700",lineHeight:"46px"}} className="mb-2">Change Password</h3>
          </div>
          <form>
            <div className="Oldpassword-box">
            <label htmlFor="oldpassword" style={{color:"rgba(239, 155, 40, 1)",fontSize:"13px",fontWeight:"500",marginTop:"20px",marginBottom:"2px"}}>Old Password</label>
            <input id="oldpassword" type="password" placeholder="Enter your Old Password"/>
            </div>
            <div className="password-box">
            <label htmlFor="password" style={{color:"rgba(239, 155, 40, 1)",fontSize:"13px",fontWeight:"500",marginTop:"20px",marginBottom:"2px"}}>New Password</label>
            <input id="password" type="password" placeholder="Enter your New Password"/>
            </div>
            <div className="confirm_password-box">
            <label htmlFor="confirmpassword" style={{color:"rgba(239, 155, 40, 1)",fontSize:"13px",fontWeight:"500",marginTop:"20px",marginBottom:"2px"}}>Confirm Password</label>
            <input id="confirmpassword" type="password" placeholder="Confirm New Password"/>
            </div>
            <button type="submit" className="btn text-white d-block w-100 my-4 rounded rounded-5" style={{ backgroundColor: 'rgba(239, 155, 40, 1)', minHeight: '50px' }}>save</button>
          </form>
        </div>
      </div>
    </div>
    
  );
}
