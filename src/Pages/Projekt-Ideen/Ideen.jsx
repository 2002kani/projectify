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

    const [gefilterteIdeen, setGefilterteIdeen] = useState([]);
    const [activeFilter, setActiveFilter] = useState("datum");
 
    // GET Methode aus Backend rein, weil useEffect dafür sorgt, dass diese beim neuladen immer ausgeführt wird.
    useEffect(() => { 
        axios.get("http://localhost:5001/ideen")
            .then((response) => {setItems(response.data);
                                 setGefilterteIdeen(response.data); })
            .catch((err) => console.log("Fehler beim Abrufen der Ideen: ", err));
    }, []);

    useEffect(()=> {
        if(activeFilter === "datum"){
            filterDatum();
        }
        if(activeFilter === "titel"){
            filterTitel();
        }
        if(activeFilter === "zufall"){
            filterZufall();
        }
    }, [activeFilter, items])

    const filterDatum = () => {
        const sortiert = [...items].sort((a, b) => new Date(a.datum) - new Date(b.datum));
        setGefilterteIdeen(sortiert);
    }

    const filterTitel = () => {
        const sortiert = [...items].sort((a, b) => a.titel.localeCompare(b.titel));
        setGefilterteIdeen(sortiert);
    }

    const filterZufall = () => {
        const sortiert = [...items].sort(()=> Math.random() - 0.5);
        setGefilterteIdeen(sortiert);
    }

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
                <FilterButtons activeFilter={activeFilter} onFilterChange={setActiveFilter}/>
                {isPopupVisible && 
                (<IdeenPopup 
                    onClose={handleClose} 
                    ideeName={ideeTitel} 
                    onAdd={addItem}
                    onChange={setIdeeTitel}
                    onBeschreibungChange={setIdeeBeschreibung}/>)}

                <div className="ideenkarten">
                    {gefilterteIdeen.map((item, index)=>(
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