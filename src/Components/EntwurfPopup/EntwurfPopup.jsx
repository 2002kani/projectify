import { useRef, useState } from "react";
import "./EntwurfPopup.css"

const EntwurfPopup = ({onClose, projektnameRef, beschreibungRef, ausgewählerStack,
                       feature1Ref, feature2Ref, feature3Ref, feature4Ref, feature5Ref, feature6Ref,
                        files, setFiles, mockupFiles, setMockupFiles,
                         projektnotizenRef, startdatumRef,
                          onSpeichern, changedStack, gelöschterStack}) => {
    
    {/* Beschreibung Section */}
    const [selectedSection, setSelectedSection] = useState("beschreibung");

    const handleProjektnameChange = (e) => {
        projektnameRef.current = e.target.value;
    }

    const handleBeschreibungChange = (e) => {
        beschreibungRef.current = e.target.value;
    }

    {/*const handleAusgewählterStack = (stack) => {
        if (!ausgewählerStack.includes(stack)){
            setAusgewählerStack([...ausgewählerStack, stack]);
        }
    }

    const handleLöschenStack = (entfernenderStack) => {
        setAusgewählerStack(ausgewählerStack.filter(stack => stack !== entfernenderStack));
    }*/}


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
        const selectedFiles = Array.from(e.target.files);
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
                <label htmlFor="projektname" >Projektname</label>
                <input id="projektname" type="text" placeholder="Gib den Projektnamen ein" defaultValue={projektnameRef.current} onChange={handleProjektnameChange}/>
            </div>
            <div className="input-gruppe">
                <label htmlFor="beschreibung">Beschreibung</label>
                <textarea id="beschreibung" placeholder="Beschreibe dein Projekt" defaultValue={beschreibungRef.current} onChange={handleBeschreibungChange}></textarea>
            </div>
            <div className="input-gruppe">
                <label>Tech-Stack</label>
                <div className="select-techstack">
                    <select onChange={(e) => changedStack(e.target.value)}>
                    <option defaultValuevalue={""}> Auswählen</option>
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
                                <i className='bx bx-x' onClick={() => gelöschterStack(stack)}></i>
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
                <label htmlFor="feature1">Feature 1: </label>
                <input id="feature1" type="text" placeholder="" defaultValue={feature1Ref.current} onChange={(e)=> feature1Ref.current = e.target.value}/>
            </div>
            <div className="input-gruppe">
                <label htmlFor="feature2">Feature 2: </label>
                <input id="feature2" type="text" placeholder="" defaultValue={feature2Ref.current} onChange={(e)=> feature2Ref.current = e.target.value} />
            </div>
            <div className="input-gruppe">
                <label htmlFor="feature3">Feature 3: </label>
                <input id="feature3" type="text" placeholder="" defaultValue={feature3Ref.current} onChange={(e)=> feature3Ref.current = e.target.value}/>
            </div>
            <div className="input-gruppe">
                <label htmlFor="feature4">Feature 4: </label>
                <input id="feature4" type="text" placeholder="" defaultValue={feature4Ref.current} onChange={(e)=> feature4Ref.current = e.target.value}/>
            </div>
            <div className="input-gruppe">
                <label htmlFor="feature5">Feature 5: </label>
                <input id="feature5" type="text" placeholder="" defaultValue={feature5Ref.current} onChange={(e)=> feature5Ref.current = e.target.value}/>
            </div>
            <div className="input-gruppe">
                <label htmlFor="feature6">Feature 6: </label>
                <input id="feature6" type="text" placeholder="" defaultValue={feature6Ref.current} onChange={(e)=> feature6Ref.current = e.target.value}/>
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
            <div className="angezeigter-file-container">
                {files.map((file, index)=>(
                    <div key={index} className="angezeigter-file">
                        <img src={URL.createObjectURL(file)} alt="preview" style={{ width: "120px", height: "200px", objectFit: "cover", transition: "transform 0.3s ease", borderRadius: "10px" }}></img>
                        <i className='bx bx-x' onClick={()=> handleRemoveFile(index)}></i>
                    </div>
                ))}
            </div>
            <div className="input-gruppe">
                <label> Mockups </label>
                <input type="file" multiple accept="image/*" onChange={handleMockupFileChange} />
            </div>
            <div className="angezeigter-file-container">
                {mockupFiles.map((mockupfile, index)=>(
                    <div key={index} className="angezeigter-file">
                        <img src={URL.createObjectURL(mockupfile)} alt="preview" style={{ width: "120px", height: "200px", objectFit: "cover", transition: "transform 0.3s ease", borderRadius: "10px" }}></img>
                        <i className='bx bx-x' onClick={()=> handleRemoveMockup(index)}></i>
                    </div>
                ))}
            </div>
        </div>);
    }

    const InformationenSection = ()=>{
        return(
        <div className="informationen-section">
            <h2>Weitere Informationen</h2>
            <div className="input-gruppe">
                <label> Startdatum </label>
                <input type="date" defaultValue={startdatumRef.current} onChange={(e)=> startdatumRef.current = e.target.value}/>
            </div>
            <div className="input-gruppe">
                <label> Notizen zum Projekt: </label>
                <textarea type="text" placeholder="" defaultValue={projektnotizenRef.current} onChange={(e)=> projektnotizenRef.current = e.target.value}/>
            </div>
        </div>);
    }

    const handlePopupClick = (e) => {
        e.stopPropagation();
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
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
        <div className="entwurf-popup-overlay" onClick={handleOverlayClick}>
            <div className="entwurf-popup" onClick={handlePopupClick}>
                <div className="inhalte-sidebar">
                    <h3> Entwurf Planen </h3>
                    <ul>
                        <li onClick={(e) => { e.stopPropagation(); handleSelectedSection("beschreibung")}}><i className='bx bx-edit' ></i> Beschreibung </li>  {/* Projektname, Beschreibung, Tech-stack, */}
                        <li onClick={(e) => { e.stopPropagation(); handleSelectedSection("feature")}}><i className='bx bx-list-plus'></i> Features </li>  {/* Features, */}
                        <li onClick={(e) => { e.stopPropagation(); handleSelectedSection("hochladen")}}><i className='bx bx-upload' ></i> Hochladen </li>  {/* Inspirations screenshots hochladen, Mockups.. */}
                        <li onClick={(e) => { e.stopPropagation(); handleSelectedSection("informationen")}}><i className='bx bx-info-circle' ></i> Informationen </li>  {/* Start- Enddatum, Weitere Notizen, Gedanken..*/}
                    </ul>
                    <button onClick={onSpeichern}> Speichern </button>
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