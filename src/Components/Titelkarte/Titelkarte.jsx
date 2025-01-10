import "./Titelkarte.css"
import BenutzerIcon from "../../Assets/IMG_1984.PNG"

const Titelkarte = ({titel, suchErgebnis, SucheChange}) => {
    return(
        <div className="titelkarte">
            <div className="titel">
                <h1>{titel ? titel : "Unbenannt"}</h1>
            </div>
            {titel === "Dashboard" ? 
            <div className="suchleiste">
                <input type="text" value={suchErgebnis} onChange={SucheChange} placeholder="Titel des Projekts..." id="suchleiste-input" maxLength={40}/>
                <i className='bx bx-search-alt' id="suchleiste-btn"></i>
            </div> : ""}
            <div className="icons">
                <img src={BenutzerIcon} alt="Profilbild"/>
                <i className='bx bx-chevron-down'></i>
                <div className="abmelden">
                    <p>Abmelden</p>
                </div>
            </div>
        </div>
    );
}

export default Titelkarte