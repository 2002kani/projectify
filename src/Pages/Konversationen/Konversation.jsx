import Titelkarte from "../../Components/Titelkarte/Titelkarte";
import Sidebar from "../../Components/Sidebar/sidebar";

const Konversation = () => {
    return(
        <div className="konversation">
            <Sidebar />
            <Titelkarte titel={"Konversationen"}/>
        </div>
    );
}

export default Konversation