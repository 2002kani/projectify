import "./ErstellenButton.css"

const ErstellenButton = ({onClick, name}) => {
    return(
        <button className="erstellen-btn" onClick={onClick}> {name} Hinzufügen <i className='bx bx-plus-circle'></i> </button>
    );
}

export default ErstellenButton