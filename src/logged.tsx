import { useNavigate } from "react-router-dom"
import {fetchCompanyProfile} from "./fetchData"

export const Succesfull = () =>{
       const navigateLogin = useNavigate();
       navigateLogin("/");
       fetchCompanyProfile()
    return (
    <div>
        <div >Zostałeś Zalogowany!</div>
        <button onClick={()=>navigateLogin("/")}> WYLOGUJ</button>
    </div>
)
}

