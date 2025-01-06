
import "./Suche.css"

const Suche = () => {
    return(
        <div className="suche">
            <h1> Suche nach deinen Projekten </h1>
            <div className="suchleiste">
                <input type="text" placeholder="Projektname.." id="suchleiste-input" maxLength={40}/>
                <i className='bx bx-search-alt' id="suchleiste-btn" ></i>
            </div>
        </div>
    );
}
 
export default Suche