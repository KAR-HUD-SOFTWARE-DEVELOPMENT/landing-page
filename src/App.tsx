import React from "react"
import { Registration } from "./registration"
import { Login } from "./Login"
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"
import { Succesfull } from "./youLogIn"

export const App = () => {
    return (
        <>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/youLogIn" element={<Succesfull />} />
              <Route path="/Registration" element={<Registration />} />
            </Routes>
          </BrowserRouter>
        </>
      );
    };
    