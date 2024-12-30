import React, { useState } from "react";
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

    function addItem(){
        if(ideeTitel.trim() !== ""){
            setItems([...items, {titel: ideeTitel, beschreibung: ideeBeschreibung}]);
            setIdeeTitel("");
            setIdeeBeschreibung("");
            setIsPopupVisible(false);
        }
    }

    const togglePopupVisiblity = () => {
        setIsPopupVisible(!isPopupVisible);
    }

    const handleClose = () => {
        setIsPopupVisible(false);
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