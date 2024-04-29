import React from "react";
import { Registration } from "./registration";
import { Login } from "./Login";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { Succesfull } from "./youLogIn";

export const App = () => {
  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route
                    exact
                    path="/"
                    element={<Login/>}
                />
                <Route
                    exact
                    path="/youLogIn"
                    element={<Succesfull/>}
                />
                <Route
                    exact
                    path="/Registration"
                    element={<Registration />}
                />
            </Routes>
        </BrowserRouter>
    </>
    );
}