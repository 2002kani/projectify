import { useState } from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen, onToggle }) => {

    const sidebarItems = [
        {id: 1, bezeichnung: "Dashboard", icon: <i className='bx bx-home-alt'></i>},
        {id: 2, bezeichnung: "Ideen", icon: <i className='bx bx-bulb'></i>},
        {id: 3, bezeichnung: "Entwürfe", icon: <i className='bx bx-edit'></i>},
        {id: 4, bezeichnung: "Suche", icon: <i className='bx bx-search'></i>},
        {id: 5, bezeichnung: "Konversationen", icon: <i className='bx bx-chat'></i>},
    ];

    const [activeItem, setActiveItem] = useState(1);

    return(
        <div className={`sidebar ${isOpen ? "" : "closed"}`}>
            <div className="top">
                <div className="logo">
                    <h2><i className='bx bxs-customize'></i> Projectify</h2>
                    <i className='bx bx-chevron-right' onClick={onToggle}></i>
                </div>
            </div>

            <ul>
                {sidebarItems.map((item)=> (
                    <li key={item.id}>
                        <Link to={`/${item.bezeichnung}`} className={activeItem === item.id ? "active" : ""}
                        onClick={() =>
                            setActiveItem(item.id)
                        }>
                            <span>{item.icon}</span>
                            <span className="bezeichnung">{item.bezeichnung}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Sidebar