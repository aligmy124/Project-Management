import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { AuthContext } from '../../../../Context/Components/AuthJWT/AuthJWT';
import { Projects_URL, TASKS_URL, USERS_URL } from '../../../../Backend/URL';
import axios from 'axios';

export default function Header() {
  const { LoginData } = useContext(AuthContext);
  return (
    <div>
      <div className="bg-header">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="text-header "style={{marginTop:"85px",marginLeft:"20px"}}>
              <h3 style={{color:"rgba(255, 255, 255, 1)"}}>Welcome <span style={{color:"rgba(239, 155, 40, 1)"}}>{LoginData?.userName}</span></h3>
              <p style={{color:"rgba(255, 255, 255, 1)"}}>You can add project and assign tasks to your team</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
