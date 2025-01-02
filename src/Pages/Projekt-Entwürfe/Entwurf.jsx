import { useRef, useState } from "react";
import Sidebar from "../../Components/Sidebar/sidebar";
import Titelkarte from "../../Components/Titelkarte/Titelkarte";
import "./Entwurf.css"
import EntwurfPopup from "../../Components/EntwurfPopup/EntwurfPopup";
import ErstellenButton from "../../Components/ErstellenButton/ErstellenButton";

const Entwurf = () => {

    const [isEntwurfErstellt, setIsEntwurfErstellt] = useState(false);
    const [isEntwurfVisible, setIsEntwurfVisible] = useState(false);

    const [entwurfItems, setEntwurfItems] = useState([]);

    const nameRef = useRef("");
    const bechreibungRef = useRef("");
    const [ausgewählerStack, setAusgewählerStack] = useState([]);

    const feat1 = useRef("");
    const feat2 = useRef("");
    const feat3 = useRef("");
    const feat4 = useRef("");
    const feat5 = useRef("");
    const feat6 = useRef("");

    const [files, setFiles] = useState([]);
    const [mockupFiles, setMockupFiles] = useState([]);

    const notizenRef = useRef("");
    const startRef = useRef("");

    const addItem = () => {
        if(nameRef.current !== "" && bechreibungRef.current !== ""){
            setEntwurfItems([...entwurfItems,  
                {titel: nameRef.current, 
                beschreibung: bechreibungRef.current, 
                stack: ausgewählerStack,
                feature1: feat1.current, 
                feature2: feat2.current, 
                feature3: feat3.current, 
                feature4: feat4.current, 
                feature5: feat5.current, 
                feature6: feat6.current,
                projectfiles: files, 
                projectMockup: mockupFiles,
                notizen: notizenRef.current, 
                startdatum: startRef.current}]);

                // Alle Felder nach in entwurfItems speichern wieder zurücksetzen
                nameRef.current = "";
                bechreibungRef.current = "";
                setAusgewählerStack([]);
                feat1.current = "";
                feat2.current = "";
                feat3.current = "";
                feat4.current = "";
                feat5.current = "";
                feat6.current = "";
                setFiles([]);
                setMockupFiles([]);
                notizenRef.current = "";
                startRef.current = "";

                setIsEntwurfErstellt(true);
                setIsEntwurfVisible(false);
        } else {
            alert("Bitte zumindest einen Namen und eine Beschreibung angeben.");
            return;
        }
    }

    const handleEntwurfVisibility = () => {
        setIsEntwurfVisible(!isEntwurfVisible);
    }

    const handleCreateClick = () => {
        setIsEntwurfErstellt(true);
    }

    {/* Diese Funktion auf onSpeichern nutzen, da die sowohl handleCreateClick, als auch addItem ausführt */}
    const handleOnSpeichern = () => {
        addItem();
        if(nameRef.current !== "" && bechreibungRef !== ""){
            handleCreateClick();
        }
    }

    const handleAusgewählterStack = (stack) => {
        if (!ausgewählerStack.includes(stack)){
            setAusgewählerStack([...ausgewählerStack, stack]);
        }
    }

    const handleLöschenStack = (entfernenderStack) => {
        setAusgewählerStack(ausgewählerStack.filter(stack => stack !== entfernenderStack));
    }

    return(
        <div className="enwturf">
            {!isEntwurfErstellt ? 
            <div className="entwürfe-kein-entwurf">
                    <div className="eingabe-feld">
                        <div className="information">
                            <h1> Noch kein Entwurf erstellt? </h1>
                            <p> Lass deine Projekte Wirklichkeit werden, indem du jetzt deinen Entwurf planst und umsetzt!</p>
                        </div>
                        <button className="entwurf-erstellen" onClick={handleEntwurfVisibility}> + </button>
                    </div>
                </div> : 
                <>
                    <Titelkarte titel={"Projekt Entwürfe"} />
                    <div className="entwurf-inhalt">
                        <ErstellenButton onClick={handleEntwurfVisibility}/>
                        {/* HIER BLA BLA.MAP(BLA BLA) */}
                    </div>
                </>}
                {isEntwurfVisible ?
                    <div className="projekt-inhalt">
                        <EntwurfPopup 
                        onClose={handleEntwurfVisibility}
                        projektnameRef={nameRef}
                        beschreibungRef={bechreibungRef}
                        ausgewählerStack={ausgewählerStack}
                        setAusgewählerStack={setAusgewählerStack} 
                        
                        feature1Ref={feat1}
                        feature2Ref={feat2}
                        feature3Ref={feat3}
                        feature4Ref={feat4}
                        feature5Ref={feat5}
                        feature6Ref={feat6}
                        
                        files={files}
                        setFiles={setFiles}
                        mockupFiles={mockupFiles}
                        setMockupFiles={setMockupFiles}
                        
                        projektnotizenRef={notizenRef}
                        startdatumRef={startRef}
                        
                        onSpeichern={handleOnSpeichern}
                        changedStack={handleAusgewählterStack}
                        gelöschterStack={handleLöschenStack}/>
                    </div>: ""}
        </div>
    );
}

export default Entwurf