import React, { useState } from "react";
import Titelkarte from "../../Components/Titelkarte/Titelkarte";
import "./Ideen.css";
import FilterButtons from "../../Components/FilterButtons/FilterButtons";
import ErstellenButton from "../../Components/ErstellenButton/ErstellenButton";
import IdeenPopup from "../../Components/IdeenPopup/IdeenPopup";

const Ideen = () => {

    const [isPopupVisible, setIsPopupVisible] = useState(false);

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
                {isPopupVisible && (
                    <IdeenPopup onClose={handleClose} />
                )}
            </div>
        </div>
    );
}

export default Ideen