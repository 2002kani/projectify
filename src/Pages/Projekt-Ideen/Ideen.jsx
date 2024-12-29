import Titelkarte from "../../Components/Titelkarte/Titelkarte";
import Sidebar from "../../Components/Sidebar/sidebar";

const Ideen = () => {
    return(
        <div className="ideen">
            <Sidebar />
            <Titelkarte titel={"Projekt Ideen"}/>
        </div>
    );
}

export default Ideen