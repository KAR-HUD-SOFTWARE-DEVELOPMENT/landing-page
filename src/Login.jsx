import React from "react";
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form";



export const Login =()=>{
const {register, handleSubmit} = useForm()
const navigate = useNavigate()


const onSubmit = async (dataLog)=>{
  let encodedObject = encodeURIComponent(JSON.stringify(dataLog));
  const res = await fetch(`http://localhost:8008/youLogIn=${encodedObject}`)
  const json = await res.json()
  if(json){  
      alert("ZALOGOWANO POPRAWNIE")
      navigate("/youLogIn")
    }
  else{alert("BŁĘDNE DANE")}

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