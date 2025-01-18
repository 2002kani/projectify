import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import { createBrowserRouter, Outlet, RouterProvider, useNavigate } from "react-router-dom"

import Dashboard from './Pages/Dashboard/Dashboard.jsx'
import Error from './Pages/ErrorSeite/Error.jsx'
import Entwurf from "./Pages/Projekt-Entwürfe/Entwurf.jsx"
import Ideen from "./Pages/Projekt-Ideen/ideen.jsx"
import Konversation from "./Pages/Konversationen/Konversation.jsx"
import Sidebar from './Components/Sidebar/sidebar.jsx'
import Login from './Pages/Login/Login.jsx'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase.js';

const Layout = () =>{

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, async(user) => {
      if(user){
        console.log("Eingeloggt!");
        navigate("/");
      } else{
        console.log("Ausgeloggt!");
        navigate("/Login");
      }
    })
  }, [])

  return(
    <div className={`app ${isSidebarOpen ? "" : "closed"}`}>
      <Sidebar isOpen={isSidebarOpen} onToggle={()=> setIsSidebarOpen(!isSidebarOpen)}/>
      <div className="content">
        <Outlet/>
      </div>
    </div>
  );
}

const AuthLayout = () => {
  return(
    <div className="auth-layout">
      <Outlet/>
    </div>
  );
};

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
    },]
  },
  {
    path: "/Login",
    element: <AuthLayout />,
    children: [{ path: "/Login", element: <Login/>}]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
    <ToastContainer theme="dark" />
  </StrictMode>,
)
