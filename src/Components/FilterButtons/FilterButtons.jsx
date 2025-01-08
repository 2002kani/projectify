import { useState } from "react";
import "./FilterButtons.css"
 
const FilterButtons = () => {

    const [activeFilter, setActiveFilter] = useState("datum")

    const handleFilterClick = (filter) => {
        setActiveFilter(filter);
    } 


    return(
        <div className="filter-container">
            <div className={`filter-option ${activeFilter === "datum" ? "active" : ""}`}
            onClick={()=>handleFilterClick("datum")}> Datum </div>

            <div className={`filter-option ${activeFilter === "titel" ? "active" : ""}`}
            onClick={()=>handleFilterClick("titel")}> Titel </div>

            <div className={`filter-option ${activeFilter === "zufall" ? "active" : ""}`}
            onClick={()=>handleFilterClick("zufall")}> Zufall </div>
        </div>
    );
}

export default FilterButtons