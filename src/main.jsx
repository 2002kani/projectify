import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom"

import Dashboard from './Pages/Dashboard/Dashboard.jsx'
import Error from './Pages/ErrorSeite/Error.jsx'
import Entwurf from "./Pages/Projekt-Entwürfe/Entwurf.jsx"
import Ideen from "./Pages/Projekt-Ideen/ideen.jsx"
import Konversation from "./Pages/Konversationen/Konversation.jsx"
import Sidebar from './Components/Sidebar/sidebar.jsx'

const Layout = () =>{

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return(
    <div className={`app ${isSidebarOpen ? "" : "closed"}`}>
      <Sidebar isOpen={isSidebarOpen} onToggle={()=> setIsSidebarOpen(!isSidebarOpen)}/>
      <div className="content">
        <Outlet/>
      </div>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    children: [{
      path: "/",
      element: <Dashboard/>
    },{
      path: "/Dashboard",
      element: <Dashboard/>
    },{
      path: "/Entwürfe",
      element: <Entwurf/>
    },{
      path: "/Ideen",
      element: <Ideen/>
    },{
      path: "/Konversationen",
      element: <Konversation/>
    }]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
