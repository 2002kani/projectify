import { useEffect, useState } from "react";
import "./Suche.css"


const Suche = () => {

    const [alleIdeen, setAlleIdeen] = useState([]);
    const [alleEntwürfe, setAlleEntwürfe] = useState([]);



    return(
        <div className="suche">
            <div className="suchleiste">
                <input type="text" placeholder="Titel des Projekts..." id="suchleiste-input" maxLength={40}/>
                <i className='bx bx-search-alt' id="suchleiste-btn" ></i>
            </div>

            <div className="suchanzeigen">
                <div className="ideen-reihe">
                    
                </div>
                <div className="entwürfe-reihe">
                    
                </div>
            </div>

        </div>
    );
}
 
export default Suche