import { Registration } from "./registration"
import { Login } from "./Login"
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"
import { Succesfull } from "./logged"

export const App = () => {
    return (
        <>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/logged" element={<Succesfull />} />
              <Route path="/registration" element={<Registration />} />
            </Routes>
          </BrowserRouter>
        </>
      );
    };
    