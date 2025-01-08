import Sidebar from "../../Components/Sidebar/sidebar";
import Titelkarte from "../../Components/Titelkarte/Titelkarte";
import "./Dashboard.css";

const Dashboard = () => {
    return(
        <div className="dashboard">
            <Titelkarte titel={"Dashboard"}/>
            <div className="dashboard-inhalt">
                <h1></h1>
            </div>
        </div>
    );
} 
 
export default Dashboard