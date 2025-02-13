import React, { createContext, useEffect, useState } from 'react'
import {jwtDecode} from "jwt-decode"
export const AuthContext=createContext(null);
export default function AuthJWT({children}) {
    const [LoginData,setLoginData]=useState()
    const token=localStorage.getItem("token")
    const saveLoginData = () => {
        const token = localStorage.getItem("token");
        if (!token) {
            console.warn("No token found in localStorage");
            return; // ✅ تجنب فك تشفير `null` أو `undefined`
        }
    
        try {
            const decodeData = jwtDecode(token);
            console.log(decodeData);
            setLoginData(decodeData);
        } catch (error) {
            console.error("Invalid Token", error);
        }
    };
    useEffect(()=>{
        if(localStorage.getItem("token")){
            saveLoginData()
        }
      },[])
  return (<AuthContext.Provider value={{LoginData,saveLoginData}}>{children}</AuthContext.Provider>)
}

