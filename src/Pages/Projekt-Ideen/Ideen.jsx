import React, { useEffect, useState } from "react";
import axios from "axios";
import Titelkarte from "../../Components/Titelkarte/Titelkarte";
import "./Ideen.css";
import FilterButtons from "../../Components/FilterButtons/FilterButtons";
import ErstellenButton from "../../Components/ErstellenButton/ErstellenButton";
import IdeenPopup from "../../Components/IdeenPopup/IdeenPopup";

const Ideen = () => {

    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [items, setItems] = useState([]);
    const [ideeTitel, setIdeeTitel] = useState("");
    const [ideeBeschreibung, setIdeeBeschreibung] = useState("");

    // GET Methode aus Backend rein, weil useEffect dafür sorgt, dass diese beim neuladen immer ausgeführt wird.
    useEffect(() => { 
        axios.get("http://localhost:5001/ideen")
            .then((response) => setItems(response.data))
            .catch((err) => console.log("Fehler beim Abrufen der Ideen: ", err));
    }, []);

    // POST Methode rein
    function addItem(){
        if(ideeTitel.trim() && ideeBeschreibung !== ""){
            const neuIdee = { titel: ideeTitel, beschreibung: ideeBeschreibung}  // Hier definierst du den body im backend (Titel und Beschreibung aus backend)
            axios.post("http://localhost:5001/ideen", neuIdee)
                .then((response)=>{
                    setItems([...items, response.data]);
                    setIdeeTitel("");
                    setIdeeBeschreibung("");
                    setIsPopupVisible(false);
                })
                .catch((err)=> alert("Fehler beim speichern der Idee"));
        } else{
            alert("Bitte komplett Ausfüllen");
        }
    }

    const togglePopupVisiblity = () => {
        setIsPopupVisible(!isPopupVisible);
    }

    const handleClose = () => { 
        setIsPopupVisible(false);
    }

    // DELETE Methode rein
    const handleRemoveCard = (entfernendeKarte) => {
        axios.delete(`http://localhost:5001/ideen/${entfernendeKarte._id}`)
            .then(() => {
                setItems((prevItems) => prevItems.filter((item) => item._id !== entfernendeKarte._id));
            })
            .catch((err) => alert("Fehler beim Löschen der Idee"));
    }
  
    return(
        <div className="ideen">
            <Titelkarte titel={"Projekt Ideen"}/>
            <div className="ideen-inhalt">
                <ErstellenButton onClick={togglePopupVisiblity}/>
                <FilterButtons/>
                {isPopupVisible && 
                (<IdeenPopup 
                    onClose={handleClose} 
                    ideeName={ideeTitel} 
                    onAdd={addItem}
                    onChange={setIdeeTitel}
                    onBeschreibungChange={setIdeeBeschreibung}/>)}

                <div className="ideenkarten">
                    {items.map((item, index)=>(
                        <div key={index} className="idee-karte">
                            <div className="ideen-top">
                                <i className="bx bx-x" onClick={() => handleRemoveCard(item)}></i>
                            </div>
                            <h2>{item.titel}</h2>
                            <p>{item.beschreibung}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Ideen