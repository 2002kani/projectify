import { useState } from "react";
import Sidebar from "../../Components/Sidebar/sidebar";
import Titelkarte from "../../Components/Titelkarte/Titelkarte";
import "./Entwurf.css"
import EntwurfPopup from "../../Components/EntwurfPopup/EntwurfPopup";

const Entwurf = () => {

    const [isEntwurfErstellt, setIsEntwurfErstellt] = useState(false);
    const [isEntwurfVisible, setIsEntwurfVisible] = useState(false);

    const handleEntwurfVisibility = () => {
        setIsEntwurfVisible(!isEntwurfVisible);
    }

    const handleCreateClick = () => {
        setIsEntwurfErstellt(true);
    }

    return(
        <div className="enwturf">
                <div className="entwürfe-kein-entwurf">
                    <div className="eingabe-feld">
                        <div className="information">
                            <h1> Noch kein Entwurf erstellt? </h1>
                            <p> Lass deine Projekte Wirklichkeit werden, indem du jetzt deinen Entwurf planst und umsetzt!</p>
                        </div>
                        <button className="entwurf-erstellen" onClick={handleEntwurfVisibility}> + </button>
                    </div>
                </div>
                {isEntwurfVisible ?
                    <div className="projekt-inhalt">
                    <EntwurfPopup onClose={handleEntwurfVisibility}/>
                </div>: ""}
        </div>
    );
}

export default Entwurf