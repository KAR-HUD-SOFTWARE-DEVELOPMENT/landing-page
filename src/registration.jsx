import React from "react";
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";

export const Registration = ()=> {
  const { register, handleSubmit } = useForm()
  const navigate = useNavigate()
  

  const onSubmit = async (dataReg) => {
    let encodedObject = encodeURIComponent(JSON.stringify(dataReg));
    const res = await fetch(`http://localhost:8008/Registration=${encodedObject}`)
    const json = await res.json()
    console.log(json)
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
      <button onClick={()=>navigate(-1)}> WRÓĆ DO LOGOWANIA</button>
    </form>
    </div>
  )
}