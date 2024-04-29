import React from "react";
import { useNavigate } from "react-router-dom"

export const Succesfull =() =>{
    const navigateLogin = useNavigate()

    return (
    <div className="success">
        <div>Jesteś zalogowany!</div>
        <button onClick={()=>navigateLogin(-1)}> WYLOGUJ
      </button>
    </div>
)
}

