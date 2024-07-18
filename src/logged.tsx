import { useNavigate } from "react-router-dom"
import { FetchCompanyProfile} from "./FetchCompanyProfile";

export const Succesfull = () =>{
       const navigateLogin = useNavigate();
       navigateLogin("/");
    return (
    <div>
        <div >Zostałeś Zalogowany!</div>
        <button onClick={()=>navigateLogin("/")}> WYLOGUJ</button>
        <FetchCompanyProfile/>
    </div>
)
}

