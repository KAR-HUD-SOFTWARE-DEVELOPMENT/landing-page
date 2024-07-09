import { useEffect } from "react"

export const fetchCompanyProfile = () => {
 useEffect(()=>{
     const CompanyProfiles = async()=>{
     const res = await fetch(`http://localhost:8008/getApi`)
      const json = await res.json()
      console.log(json)
     }
     CompanyProfiles()
    },[])
  }


