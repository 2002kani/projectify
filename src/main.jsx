import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { createBrowserRouter, RouterProvider } from "react-router-dom"

import Dashboard from './Pages/Dashboard/Dashboard.jsx'
import Error from './Pages/ErrorSeite/Error.jsx'
import Entwurf from "./Pages/Projekt-Entwürfe/Entwurf.jsx"
import Ideen from "./Pages/Projekt-Ideen/Ideen.jsx"
import Konversation from "./Pages/Konversationen/Konversation.jsx"

const router = createBrowserRouter([
  {	
    path: "/",
    element: <Dashboard/>,
    errorElement: <Error/>
  },{
    path: "/Dashboard",
    element: <Dashboard/>,
    errorElement: <Error/>
  },{
    path: "/Entwürfe",
    element: <Entwurf/>,
    errorElement: <Error/>
  },{
    path: "/Ideen",
    element: <Ideen/>,
    errorElement: <Error/>
  },{
    path: "/Konversationen",
    element: <Konversation/>,
    errorElement: <Error/>
  }]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
