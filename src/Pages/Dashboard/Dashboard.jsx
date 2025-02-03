import { useEffect, useState } from "react";
import Sidebar from "../../Components/Sidebar/sidebar";
import Titelkarte from "../../Components/Titelkarte/Titelkarte";
import "./Dashboard.css";
import axios from "axios";

 
const Dashboard = () => {

    const [alleIdeen, setAlleIdeen] = useState([]);
    const [alleEntwürfe, setAlleEntwürfe] = useState([]);

    const [gefilterteIdeen, setGefilterteIdeen] = useState([]);
    const [gefilterteEntwürfe, setGefilterteEntwürfe] = useState([]);

    const [suchErgebnis, setSuchErgebnis] = useState("");

    useEffect(()=>{
        axios.get("http://localhost:5001/ideen")
            .then((response) => { setAlleIdeen(response.data); 
                                  setGefilterteIdeen(response.data); })
            .catch((err) => console.log("Fehler beim Abrufen der Ideen: ", err));  
    },[]);

    useEffect(()=> {
        axios.get("http://localhost:5001/entwuerfe")
            .then((response) => {setAlleEntwürfe(response.data);
                                 setGefilterteEntwürfe(response.data); })
            .catch((error)=> console.log("Fehler beim Abrufen der Entwürfe: ", error));  
    },[]);

    const handleSucheChange = (e) => {
        const sucheInput = e.target.value.toLowerCase();
        setSuchErgebnis(sucheInput);

        // Gefilterte Ideen definieren
        const gefilterteIdeen = alleIdeen.filter((idee) => idee.titel.toLowerCase().includes(sucheInput));
        setGefilterteIdeen(gefilterteIdeen);

        // Gefilterte Entwürfe definieren
        const gefilterteEntwürfe = alleEntwürfe.filter((entwurf)=> entwurf.titel.toLowerCase().includes(sucheInput));
        setGefilterteEntwürfe(gefilterteEntwürfe);
    }

    const kartenKlick = (e) => {
        const key = e.currentTarget.getAttribute("data-key");
        console.log(key);
    }

    return(
        <div className="dashboard">
            <Titelkarte titel={"Dashboard"} SucheChange={handleSucheChange} suchErgebnis={suchErgebnis}/>
            <div className="dashboard-inhalt">
            <div className="suchanzeigen">
                <div className="ideen-reihe">
                    {gefilterteIdeen.map((idee, index)=>(
                        <div key={index} className="idee-karte">
                        <div className="ideen-top">
                            
                        </div>
                        <h2>{idee.titel}</h2>
                        <p>{idee.beschreibung}</p>
                    </div>
                    ))}
                </div>
                <div className="entwürfe-reihe">
                    {gefilterteEntwürfe.map((entwurf, index) => (
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
 
export default Dashboard
