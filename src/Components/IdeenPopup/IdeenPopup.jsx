import "./IdeenPopup.css"

const IdeenPopup = ({ onClose }) => {

    const handlePopupClick = (e) => {
        e.stopPropagation();
    };

    return(
        <div className="ideen-popup-overlay" onClick={onClose}>
            <div className="ideen-popup" onClick={handlePopupClick}>
            <div className="ideen-titel">
                <h2> Name der Idee </h2>
                <input type="text" placeholder="To-do Liste.." maxLength={30}></input>
            </div>
            <div className="ideen-beschreibung">
                <h2> Beschreibung </h2>
                <textarea></textarea>
            </div>
            <div className="ideen-button">
                <button> Hinzufügen </button>
            </div>
        </div>
        </div>
    );
}

export default IdeenPopup