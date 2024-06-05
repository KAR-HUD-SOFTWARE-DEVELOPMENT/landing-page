import { useNavigate } from "react-router-dom"

export const Succesfull = () =>{
       const navigateLogin = useNavigate();
       navigateLogin("/");
    return (
    <div>
        <div>myślisz że jesteś fajny? chuj ci w dupe cfelu</div>
        <button onClick={()=>navigateLogin("/")}> WYLOGUJ</button>
    </div>
)
}

