
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";
import "./registration.css"

interface FormData {
  email: string;
  password: string;
}

export const Registration = ()=> {
  const { register, handleSubmit } = useForm<FormData>();
  const navigate = useNavigate()
  
  const onSubmit = async (dataReg : FormData) => {
    let encodedObject = encodeURIComponent(JSON.stringify(dataReg));
    const res = await fetch(`http://localhost:8008/registration=${encodedObject}`)
    if (res.status === 201){
      alert("Zarejestrowano Poprawnie")
    }
    else if(res.status === 403){
      alert("Email już istnieje")}
    
  }
  return (
    <div >
      <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="email">
          Email :
          <input {...register("email",{
            required:true,
          })}
          name= "email"
          type="email"
          placeholder="Email" />
          </label>
          <label htmlFor="password">
          Password:
          <input {...register("password",{
            required:true,
          })}
          name ="password"
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