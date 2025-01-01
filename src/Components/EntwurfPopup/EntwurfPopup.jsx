import { useState } from "react";
import "./EntwurfPopup.css"

const EntwurfPopup = ({onClose}) => {
    
    const [selectedSection, setSelectedSection] = useState("beschreibung");
    const [ausgewählerStack, setAusgewählerStack] = useState([]);
    const [files, setFiles] = useState([]);
    const [mockupFiles, setMockupFiles] = useState([]);
    const [projektname, setProjektname] = useState("");
    const [beschreibung, setBeschreibung] = useState("");

    const handleAusgewählterStack = (stack) => {
        if (!ausgewählerStack.includes(stack)){
            setAusgewählerStack([...ausgewählerStack, stack]);
        }
    }

    const handleLöschenStack = (entfernenderStack) => {
        setAusgewählerStack(ausgewählerStack.filter(stack => stack !== entfernenderStack));
    }

    const handleSelectedSection = (section) => {
        setSelectedSection(section);
    }

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        if (files.length + selectedFiles.length > 3){
            alert("Es können maximal 3 Dateien hochgeladen werden.");
            return;
        }
        setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    }

    const handleRemoveFile = (index) => {
        setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

    const handleMockupFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files); // Korrekt: Zugriff auf die Dateien
        if (mockupFiles.length + selectedFiles.length > 3) {
            alert("Es können maximal 3 Dateien hochgeladen werden.");
            return;
        }
        setMockupFiles((prevMockupFiles) => [...prevMockupFiles, ...selectedFiles]);
    };

    const handleRemoveMockup = (index) =>{
        setMockupFiles((prevMockupFiles) => prevMockupFiles.filter((_, i) => i !== index));
    };



    const BeschreibungSection = ()=>{
        return(
        <div className="beschreibung-section">
            <h2>Projektbeschreibung</h2>
            <div className="input-gruppe">
                <label>Projektname</label>
                <input type="text" placeholder="Gib den Projektnamen ein" value={projektname} onChange={(e) => setProjektname(e.target.value)}/>
            </div>
            <div className="input-gruppe">
                <label>Beschreibung</label>
                <textarea placeholder="Beschreibe dein Projekt" value={beschreibung} onChange={(e) => setBeschreibung(e.target.value)}></textarea>
            </div>
            <div className="input-gruppe">
                <label>Tech-Stack</label>
                <div className="select-techstack">
                    <select onChange={(e) => handleAusgewählterStack(e.target.value)}>
                    <option value={""} disabled> Auswählen</option>
                        <option value={"Javascript"}> Javascript</option>
                        <option value={"Typescript"}> Typescript</option>
                        <option value={"CSS"}> CSS</option>
                        <option value={"React.js"}> React.js</option>
                        <option value={"Vue.js"}> Vue.js</option>
                        <option value={"Node.js"}> Node.js</option>
                        <option value={"Java"}> Java</option>
                        <option value={"Phyton"}> Phyton</option>
                        <option value={"Express.js"}> Express.js</option>
                        <option value={"mySQL"}> mySQL</option>
                        <option value={"MongoDB"}> MongoDB</option>
                    </select>
                    <div className="ausgewählter-stack">
                        {ausgewählerStack.map((stack, index)=>(
                            <div className="selected-stack" key={index}>
                                <p>{stack}</p>
                                <i className='bx bx-x' onClick={() => handleLöschenStack(stack)}></i>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>);
    }

    const FeaturesSection = ()=>{
        return(
        <div className="feature-section">
            <h2>Projekt Features</h2>
            <div className="input-gruppe">
                <label>Feature 1: </label>
                <input type="text" placeholder="" />
            </div>
            <div className="input-gruppe">
                <label>Feature 2: </label>
                <input type="text" placeholder="" />
            </div>
            <div className="input-gruppe">
                <label>Feature 3: </label>
                <input type="text" placeholder="" />
            </div>
            <div className="input-gruppe">
                <label>Feature 4: </label>
                <input type="text" placeholder="" />
            </div>
            <div className="input-gruppe">
                <label>Feature 5: </label>
                <input type="text" placeholder="" />
            </div>
            <div className="input-gruppe">
                <label>Feature 6: </label>
                <input type="text" placeholder="" />
            </div>
        </div>);
    }

    const HochladenSection = ()=>{
        return(
        <div className="hochladen-section">
            <h2>Hochladen</h2>
            <div className="input-gruppe">
                <label> Inspiration </label>
                <input type="file" multiple accept="image/*" onChange={handleFileChange} />
            </div>
            {files.map((file, index)=>(
                <div key={index} className="angezeigter-file">
                    <img src={URL.createObjectURL(file)} alt="preview" style={{ width: "100px", height: "100px", objectFit: "cover" }}></img>
                    <i className='bx bx-x' onClick={()=> handleRemoveFile(index)}></i>
                </div>
            ))}
            <div className="input-gruppe">
                <label> Mockups </label>
                <input type="file" multiple accept="image/*" onChange={handleMockupFileChange} />
            </div>
            {mockupFiles.map((mockupfile, index)=>(
                <div key={index} className="angezeigter-file">
                    <img src={URL.createObjectURL(mockupfile)} alt="preview" style={{ width: "100px", height: "100px", objectFit: "cover" }}></img>
                    <i className='bx bx-x' onClick={()=> handleRemoveMockup(index)}></i>
                </div>
            ))}
        </div>);
    }

    const InformationenSection = ()=>{
        return(
        <div className="informationen-section">
            <h2>Weitere Informationen</h2>
            <div className="input-gruppe">
                <label> Startdatum </label>
                <input type="date" />
            </div>
            <div className="input-gruppe">
                <label> Notizen zum Projekt: </label>
                <textarea type="text" placeholder="" />
            </div>
        </div>);
    }

    const handlePopupClick = (e) => {
        e.stopPropagation();
    };

    const gerenderteSection = () => {
        switch(selectedSection){
            case "beschreibung": return <BeschreibungSection/>;
            case "feature": return <FeaturesSection/>;
            case "hochladen": return <HochladenSection/>;
            case "informationen": return <InformationenSection/>;
            default: return <BeschreibungSection/>;
        }
    };

    return(
        <div className="entwurf-popup-overlay" onClick={onClose}>
            <div className="entwurf-popup" onClick={handlePopupClick}>
                <div className="inhalte-sidebar">
                    <h3> Entwurf Planen </h3>
                    <ul>
                        <li onClick={() => handleSelectedSection("beschreibung")}><i className='bx bx-edit' ></i> Beschreibung </li>  {/* Projektname, Beschreibung, Tech-stack, */}
                        <li onClick={() => handleSelectedSection("feature")}><i className='bx bx-list-plus'></i> Features </li>  {/* Features, */}
                        <li onClick={() => handleSelectedSection("hochladen")}><i className='bx bx-upload' ></i> Hochladen </li>  {/* Inspirations screenshots hochladen, Mockups.. */}
                        <li onClick={() => handleSelectedSection("informationen")}><i className='bx bx-info-circle' ></i> Informationen </li>  {/* Start- Enddatum, Weitere Notizen, Gedanken..*/}
                    </ul>
                    <button> Speichern </button>
                </div>
                <div className="content-container">
                    {gerenderteSection()}
                </div>
                <div className="inhalt-top">
                    <i className='bx bx-x' onClick={onClose}></i>
                </div>
            </div>
        </div>
    );
}

export default EntwurfPopup