import "./IdeenPopup.css"

const IdeenPopup = ({ onClose, ideeName, onAdd, onChange, onBeschreibungChange }) => {

    const handlePopupClick = (e) => {
        e.stopPropagation();
    };

    const handleTitelInputChange = (e) =>{
        onChange(e.target.value);
    }
 
    const handleBeschreibungChange = (e) => {
        onBeschreibungChange(e.target.value);
    }  
 
    return(
        <div className="ideen-popup-overlay" onClick={onClose}>
            <div className="ideen-popup" onClick={handlePopupClick}>
                <div className="ideen-titel">
                    <h2> Name der Idee </h2>
                    <input type="text" placeholder="To-do Liste.." maxLength={30} value={ideeName} onChange={handleTitelInputChange}></input>
                </div>
                <div className="ideen-beschreibung">
                    <h2> Beschreibung </h2>
                    <textarea onChange={handleBeschreibungChange}></textarea>
                </div>
                <div className="ideen-button">
                    <button onClick={onAdd}> Hinzufügen </button>
                </div>
            </div>
        </div>
    );
}

export default IdeenPopup