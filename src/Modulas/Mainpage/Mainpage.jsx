import React from 'react'
import "./Mainpage.css"
import PMS from "../../assets/images/PMS 2.png"
import { Link } from 'react-router-dom'
export default function Mainpage() {
  return (
    <div className="background-main">
        <div className="img-center">
          <Link to={"/login"}>
          <img src={PMS} alt="" className='img-fluid' width={"250px"}/>
          </Link>
        </div>
    </div>
  )
}
