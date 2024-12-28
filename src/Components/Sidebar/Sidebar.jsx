import { useState } from "react";
import "./Sidebar.css";

const Sidebar = () => {

    const sidebarItems = [
        {id: 1, bezeichnung: "Dashboard", icon: <i class='bx bx-home-alt'></i>},
        {id: 2, bezeichnung: "Ideen", icon: <i class='bx bx-bulb'></i>},
        {id: 3, bezeichnung: "Entwürfe", icon: <i class='bx bx-edit'></i>},
        {id: 4, bezeichnung: "Suche", icon: <i class='bx bx-search'></i>},
        {id: 5, bezeichnung: "Konversationen", icon: <i class='bx bx-chat'></i>},
    ];

    const [activeItem, setActiveItem] = useState(1);

    return(
        <div className="sidebar">
            <div className="top">
                <div className="logo">
                    <h2> 👋 Hey Kani! </h2>
                    <i class='bx bx-chevron-right'></i>
                </div>
            </div>

            <ul>
                {sidebarItems.map((item)=> (
                    <li key={item.id}>
                        <a href="#" className={activeItem === item.id ? "active" : ""}
                        onClick={(e) =>{
                            e.preventDefault();
                            setActiveItem(item.id);
                        }}>
                            <span>{item.icon}</span>
                            <span>{item.bezeichnung}</span>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Sidebar