import "./Titelkarte.css"
import BenutzerIcon from "../../Assets/IMG_1983.JPG"

const Titelkarte = ({titel}) => {
    return(
        <div className="titelkarte">
            <div className="titel">
                <h1>{titel ? titel : "Dasboard"}</h1>
            </div>
            <div className="icons">
                <img src={BenutzerIcon} alt="Profilbild"/>
                <i class='bx bx-chevron-down'></i>
                <div className="abmelden">
                    <p>Abmelden</p>
                </div>
            </div>
        </div>
    );
}

export default Titelkarte