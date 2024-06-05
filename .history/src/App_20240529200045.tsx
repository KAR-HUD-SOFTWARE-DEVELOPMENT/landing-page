import React, { createContext } from "react"
import { Registration } from "./registration"
import { Login } from "./Login"
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"
import { Succesfull } from "./youLogIn"

export const Context = createContext({})

export const App = () => {

    return (
        <>
        <Context.Provider value={{theme: 'dark'}}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/logged" element={<Succesfull />} />
              <Route path="/registration" element={<Registration />} />
            </Routes>
          </BrowserRouter>
        </Context.Provider>

        </>
      );
    };
    