import React from "react";
import {createRoot} from 'react-dom/client'
import { App } from "./src/App";


const root = document.getElementById('root')
const reactDom = createRoot(root)

reactDom.render(<App/>)