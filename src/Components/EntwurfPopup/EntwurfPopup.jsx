import { useState } from "react";
import "./EntwurfPopup.css"

const EntwurfPopup = ({onClose}) => {
    
    const [selectedSection, setSelectedSection] = useState("beschreibung");

    const handleSelectedSection = (section) => {
        setSelectedSection(section);
    }

    const BeschreibungSection = ()=>{
        return(
        <div className="beschreibung-section">
            <h2>Projektbeschreibung</h2>
            <div className="input-gruppe">
                <label>Projektname</label>
                <input type="text" placeholder="Gib den Projektnamen ein" />
            </div>
            <div className="input-gruppe">
                <label>Beschreibung</label>
                <textarea placeholder="Beschreibe dein Projekt"></textarea>
            </div>
            <div className="input-gruppe">
                <label>Tech-Stack</label>
                <input type="text" placeholder="z.B. React, Node.js, MongoDB..." />
            </div>
        </div>);
    }

    const FeaturesSection = ()=>{
        return(
        <div className="feature-section">
            <h2>Projekt Features</h2>
        </div>);
    }

    const HochladenSection = ()=>{
        return(
        <div className="hochladen-section">
            <h2>Inspiration & Mockups</h2>
        </div>);
    }

    const InformationenSection = ()=>{
        return(
        <div className="informationen-section">
            <h2>Weitere Informationen</h2>
        </div>);
    }

    const handlePopupClick = (e) => {
        e.stopPropagation();
    };

    const gerenderteSection = () => {
        switch(selectedSection){
            case "beschreibung": return <BeschreibungSection/>;
            case "feature": return <FeaturesSection/>;
            case "hochladen": return <HochladenSection/>;
            case "informationen": return <InformationenSection/>;
            default: return <BeschreibungSection/>;
        }
    };

    return(
        <div className="entwurf-popup-overlay" onClick={onClose}>
            <div className="entwurf-popup" onClick={handlePopupClick}>
                <div className="inhalte-sidebar">
                    <h3> Entwurf Planen </h3>
                    <ul>
                        <li onClick={() => handleSelectedSection("beschreibung")}><i className='bx bx-edit' ></i> Beschreibung </li>  {/* Projektname, Beschreibung, Tech-stack, */}
                        <li onClick={() => handleSelectedSection("feature")}><i className='bx bx-list-plus'></i> Features </li>  {/* Features, */}
                        <li onClick={() => handleSelectedSection("hochladen")}><i className='bx bx-upload' ></i> Hochladen </li>  {/* Inspirations screenshots hochladen, Mockups.. */}
                        <li onClick={() => handleSelectedSection("informationen")}><i className='bx bx-info-circle' ></i> Informationen </li>  {/* Start- Enddatum, Weitere Notizen, Gedanken..*/}
                    </ul>
                    <button> Speichern </button>
                </div>
                <div className="content-container">
                    {gerenderteSection()}
                </div>
                <div className="inhalt-top">
                    <i className='bx bx-x' onClick={onClose}></i>
                </div>
            </div>
        </div>
    );
}

export default EntwurfPopup