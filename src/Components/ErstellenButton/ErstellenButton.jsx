import "./ErstellenButton.css"

const ErstellenButton = ({onClick}) => {
    return(
        <button className="erstellen-btn" onClick={onClick}> Idee Hinzufügen <i className='bx bx-plus-circle'></i> </button>
    );
}

export default ErstellenButton