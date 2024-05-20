
import React from "react";
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form";

interface FormData {
  email: string;
  password: string;
}

export const Login =()=>{
const {register, handleSubmit} = useForm<FormData>()
const navigate = useNavigate()


const onSubmit = async (dataLog :FormData)=>{
  let encodedObject = encodeURIComponent(JSON.stringify(dataLog));
  const res = await fetch(`http://localhost:8008/youLogIn=${encodedObject}`)
  if(res.status === 200){  
      alert("ZALOGOWANO POPRAWNIE")
      navigate("/youLogIn")
    } 
  else if (res.status === 422){
    console.log(res)
    alert("BŁĘDNE DANE MENDO")
}
}
return(
  <div className="login">
  <form onSubmit={handleSubmit(onSubmit)}>
    <label>
      Email :
      <input {...register("email",{
        required:true,
      })}
      type="email"
      placeholder="Email" />
      Password:
      <input {...register("password",{
        required:true,
      })}
      type="password"
      placeholder="Password"/>
    </label>
    <button type="submit" value="ZALOGUJ SIĘ">ZALOGUJ SIĘ</button>
    <div>
    <button onClick={()=>navigate("/Registration")} type="submit" value="ZAREJESTRUJ SIĘ">ZAREJESTRUJ SIE</button>
    </div>
  </form>
  </div>
)
}
