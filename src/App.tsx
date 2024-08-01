import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Registration } from "./registration/registration";
import { Login } from "./login/Login";
import { Succesfull } from "./logged";
import { DetailsCompany } from "./DetailsCompany";
import { FetchCompanyProfile } from './FetchCompanyProfile';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/logged" element={<Succesfull />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/DetailsCompany/:symbol" element={<DetailsCompany />} />
        <Route path="/FetchCompanyProfile" element={<FetchCompanyProfile />} />
      </Routes>
    </BrowserRouter>
  );
};
