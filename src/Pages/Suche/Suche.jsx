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

    useEffect(()=> {
        axios.get("http://localhost:5001/entwuerfe")
            .then((response) => setAlleEntwürfe(response.data))
            .catch((error)=> console.log("Fehler beim Abrufen der Entwürfe: ", error));  
    },[]);

    const kartenKlick = (e) => {
        const key = e.currentTarget.getAttribute("data-key");
        console.log(key);
    }

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
                    <div className="entwürfe-reihe">
                        {alleEntwürfe.map((entwurf, index) => (
                            <div className="entwurf-karte" key={index} data-key={index} onClick={kartenKlick}>
                            <div className="karte-top">
                                <h1>{entwurf.titel}</h1>
                                <div className="karte-top-links">
                    
                                </div>
                            </div>
                            <div className="karte-main">
                                <div className="karte-beschreibung">
                                    <p>{entwurf.beschreibung}</p>
                                </div>
                                <div className="karte-features">
                                    <div className="features-links">
                                        {entwurf.feature1 ?
                                        <p>{entwurf.feature1}</p> : ""}
                                        {entwurf.feature2 ?
                                        <p>{entwurf.feature2}</p> : ""}
                                        {entwurf.feature3 ?
                                        <p>{entwurf.feature3}</p> : ""}
                                    </div>
                                    <div className="features-rechts">
                                        {entwurf.feature4 ?
                                        <p>{entwurf.feature4}</p> : ""}
                                        {entwurf.feature5 ?
                                        <p>{entwurf.feature5}</p> : ""}
                                        {entwurf.feature6 ?
                                        <p>{entwurf.feature6}</p> : ""}  
                                    </div>
                                </div>
                                <div className="karte-information">
                                    <p>{entwurf.notizen}</p>
                                </div>
                                <div className="karte-bottom">
                                    <p className="start-karte">{entwurf.startdatum}</p>
                                    <div className="stack-farbe-scroll">
                                    {Array.isArray(entwurf.stack) ? (
                                        entwurf.stack.map((stack, index) => (
                                            <p className="stack-farbe" key={index}>{stack}</p>
                                        ))
                                    ) : ""}  
                                    </div>     
                                </div>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
}
 
export default Suche