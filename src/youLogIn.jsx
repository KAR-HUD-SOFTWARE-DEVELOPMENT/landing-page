import React from "react";
import { useNavigate } from "react-router-dom"

export const Succesfull =() =>{
    const navigateLogin = useNavigate()

    const handleReg = () => {
        navigateLogin('/Registration');
    }

    return (
    <div className="success">
        <div>Jesteś zalogowany!</div>
        <button onClick={()=>navigateLogin(-1)}> WYLOGUJ
      </button>
        <button onClick={()=>handleReg(-2)}> WRÓĆ DO REJESTRACJI
      </button>
    </div>
)
}

