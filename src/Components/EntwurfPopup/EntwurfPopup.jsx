import { useState } from "react";
import "./EntwurfPopup.css"

const EntwurfPopup = ({onClose}) => {

    const handlePopupClick = (e) => {
        e.stopPropagation();
    };

    const [active, setActive] = useState("active");

    return(
        <div className="entwurf-popup-overlay" onClick={onClose}>
            <div className="entwurf-popup" onClick={handlePopupClick}>
                <div className="inhalte-sidebar">
                    <h3> Entwurf Planen </h3>
                    <ul>
                        <li><i className='bx bx-edit' ></i> Beschreibung </li>  {/* Projektname, Beschreibung, Tech-stack, */}
                        <li><i className='bx bx-list-plus'></i> Features </li>  {/* Features, */}
                        <li><i className='bx bx-upload' ></i> Hochladen </li>  {/* Inspirations screenshots hochladen, Mockups.. */}
                        <li><i className='bx bx-info-circle' ></i> Informationen </li>  {/* Start- Enddatum, Weitere Notizen, Gedanken..*/}
                    </ul>
                </div>
                <div className="inhalt-top">
                    <i className='bx bx-x' onClick={onClose}></i>
                </div>
            </div>
        </div>
    );
}

export default EntwurfPopup