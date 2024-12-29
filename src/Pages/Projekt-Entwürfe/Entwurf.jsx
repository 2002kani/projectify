import Sidebar from "../../Components/Sidebar/sidebar";
import Titelkarte from "../../Components/Titelkarte/Titelkarte";
import "./Entwurf.css"

const Entwurf = () => {
    return(
        <div className="entwurf">
            <Sidebar />
            <Titelkarte titel={"Projekt Entwürfe"}/>
        </div>
    );
}

export default Entwurf