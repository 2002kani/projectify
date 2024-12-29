import Titelkarte from "../../Components/Titelkarte/Titelkarte";
import Sidebar from "../../Components/Sidebar/sidebar";
import "./Ideen.css"
import FilterButtons from "../../Components/FilterButtons/FilterButtons";

const Ideen = () => {
    return(
        <div className="ideen">
            <Sidebar />
            <Titelkarte titel={"Projekt Ideen"}/>
            <div className="ideen-inhalt">
                <FilterButtons/>
                <div className="hinzufügen">
                    <h1> + </h1>
                </div>
            </div>
        </div>
    );
}

export default Ideen