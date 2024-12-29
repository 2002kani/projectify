import "./ErstellenButton.css"

const ErstellenButton = ({onClick}) => {
    return(
        <button className="erstellen-btn" onClick={onClick}> Idee Hinzufügen <i class='bx bx-plus-circle'></i> </button>
    );
}

export default ErstellenButton