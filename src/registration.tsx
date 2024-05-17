import React from "react";
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";

interface FormData {
  email: string;
  password: string;
}

export const Registration = ()=> {
  const { register, handleSubmit } = useForm<FormData>();
  const navigate = useNavigate()
  
  const onSubmit = async (dataReg : FormData) => {
    let encodedObject = encodeURIComponent(JSON.stringify(dataReg));
    const res = await fetch(`http://localhost:8008/Registration=${encodedObject}`)
    if (res.status === 201){
      alert("kongratulejszyn")
    }
    else if(res.status === 409){
      alert("kajak od tyłu to wciąż kajak, a ty od tyłu jestes jebany, bo ktoś juz ci mejla zajumał")}
    
  }
  return (
    <div className="registration">
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
      <button type="submit"> ZAREJESTRUJ</button>
      <div>
      <button type="submit" onClick={()=>navigate("/")}> WRÓĆ DO LOGOWANIA</button>
      </div>
    </form>
    </div>
  )
}