import { useEffect, useState } from "react";
import "./Suche.css"
import axios from "axios";


const Suche = () => {

    const [alleIdeen, setAlleIdeen] = useState([]);
    const [alleEntwürfe, setAlleEntwürfe] = useState([]);


    useEffect(()=>{
        axios.get("http://localhost:5001/ideen")
            .then((response) => setAlleIdeen(response.data))
            .catch((err) => console.log("Fehler beim Abrufen der Ideen: ", err));
    },[]);

    return(
        <div className="suche">
            <div className="suchleiste">
                <input type="text" placeholder="Titel des Projekts..." id="suchleiste-input" maxLength={40}/>
                <i className='bx bx-search-alt' id="suchleiste-btn" ></i>
            </div>

            <div className="suchanzeigen">
                <div className="ideen-reihe">
                    {alleIdeen.map((idee, index)=>(
                        <div key={index} className="idee-karte">
                        <div className="ideen-top">
                            
                        </div>
                        <h2>{idee.titel}</h2>
                        <p>{idee.beschreibung}</p>
                    </div>
                    ))}
                </div>
                <div className="entwürfe-reihe">
                    
                </div>
            </div>

        </div>
    );
}
 
export default Suche