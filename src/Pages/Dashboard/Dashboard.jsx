import Sidebar from "../../Components/Sidebar/sidebar";
import Titelkarte from "../../Components/Titelkarte/Titelkarte";
import "./Dashboard.css";

const Dashboard = () => {
    return(
        <div className="dashboard">
            <Sidebar />
            <Titelkarte titel={"Dashboard"}/>
            <div className="dashboard-inhalt">
                <h1> HALLO </h1>
            </div>
        </div>
    );
} 
 
export default Dashboard