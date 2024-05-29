
import { useContext } from "react";
import { useNavigate } from "react-router-dom"
import { Context } from "./App";


export const Succesfull = () =>{
       const navigateLogin = useNavigate();
       navigateLogin("/");

       const context = useContext(Context)
    return (
    <div>
        <div>myślisz że jesteś fajny? chuj ci w dupe cfelu</div>
        <button onClick={()=>navigateLogin("/")}> WYLOGUJ</button>
    </div>
)
}

