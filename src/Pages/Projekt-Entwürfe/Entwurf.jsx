import Sidebar from "../../Components/Sidebar/sidebar";
import Titelkarte from "../../Components/Titelkarte/Titelkarte";
import "./Entwurf.css"

const Entwurf = () => {

    return(
        <div className="entwürfe-kein-entwurf">
            <div className="eingabe-feld">
                <div className="information">
                    <h1> Noch kein Entwurf erstellt? </h1>
                    <p> Lass deine Projekte Wirklichkeit werden, indem du jetzt deinen Entwurf planst und umsetzt!</p>
                </div>
                <button className="entwurf-erstellen"> + </button>
            </div>
        </div>
    );
}

export default Entwurf