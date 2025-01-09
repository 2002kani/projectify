import { useRef, useState, useEffect } from "react";
import Sidebar from "../../Components/Sidebar/sidebar";
import Titelkarte from "../../Components/Titelkarte/Titelkarte";
import "./Entwurf.css"
import EntwurfPopup from "../../Components/EntwurfPopup/EntwurfPopup";
import ErstellenButton from "../../Components/ErstellenButton/ErstellenButton";

const Entwurf = () => {

    const [isEntwurfErstellt, setIsEntwurfErstellt] = useState(false);
    const [isEntwurfVisible, setIsEntwurfVisible] = useState(false);

    const [isEditing, setIsEditing] = useState(false);
    const [currentEditItem, setCurrentEditItem] = useState(null);

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

    // Laden aller Entwürfe am Start
    useEffect(()=>{
        fetchEntwürfe();
    }, []);

    const fetchEntwürfe = async() => {
        try{
            const response = await fetch("http://localhost:5001/entwuerfe");
            const data = await response.json();
            setEntwurfItems(data);
            if(data.length > 0){
                setIsEntwurfErstellt(true);
            }
        } catch(error){
            console.error("Fehler beim Laden der Entwürfre", error);
        }
    };

    const saveEntwurfToDB = async (entwurfData) => {
        try {
            const response = await fetch('http://localhost:5001/entwuerfe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(entwurfData)
            });
            const savedEntwurf = await response.json();
            return savedEntwurf;
        } catch (error) {
            console.error('Fehler beim Speichern des Entwurfs:', error);
            return null;
        }
    };

    const deleteEntwurfFromDB = async (id) => {
        try {
            await fetch(`http://localhost:5001/entwuerfe/${id}`, {
                method: 'DELETE'
            });
        } catch (error) {
            console.error('Fehler beim Löschen des Entwurfs:', error);
        }
    };

    const addItem = async() => {
        if(nameRef.current !== "" && bechreibungRef.current !== ""){
            const newEntwurf = {
                titel: nameRef.current, 
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
                startdatum: startRef.current
            };

            const savedEntwurf = await saveEntwurfToDB(newEntwurf);
            if ( savedEntwurf ){
                setEntwurfItems([...entwurfItems, savedEntwurf]);

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
                alert("Fehler beim Speichern des Entwurfs");
            }
        } else {
            alert("Bitte zumindest einen Namen und eine Beschreibung angeben.");
            return;
        }
    }

    const handleEdit = (item, e) => {
        e.stopPropagation();
        setCurrentEditItem(item);
        setIsEntwurfVisible(true);
        setIsEditing(true);

        nameRef.current = item.titel;
        bechreibungRef.current = item.beschreibung
        setAusgewählerStack(item.stack || []);
        feat1.current = item.feature1;
        feat2.current = item.feature2;
        feat3.current = item.feature3;
        feat4.current = item.feature4;
        feat5.current = item.feature5;
        feat6.current = item.feature6;
        setFiles(item.projectfiles || []);
        setMockupFiles(item.projectMockup || []);
        notizenRef.current = item.notizen;
        startRef.current = item.startdatum;
    };

    const handleEntwurfVisibility = () => {
        setIsEntwurfVisible(!isEntwurfVisible);

        if (!isEditing) {
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
        } else{
            setIsEditing(false);
            setCurrentEditItem(null);
        }
    };

    const handleRemoveCard = async (entfernenderItem) => {
        try {
            await deleteEntwurfFromDB(entfernenderItem._id);
            setEntwurfItems((prevItems) => 
                prevItems.filter((item) => item !== entfernenderItem)
            );
        } catch (error) {
            console.error('Fehler beim Löschen der Karte:', error);
        }
    };

    const handleCreateClick = () => {
        setIsEntwurfErstellt(true);
    }

    {/* Diese Funktion auf onSpeichern nutzen, da die sowohl handleCreateClick, als auch addItem ausführt */}
    const handleOnSpeichern = async () => {
        if(currentEditItem && isEditing){
            const updatedEntwurf = {
                titel: nameRef.current,
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
                startdatum: startRef.current
            };
    
            try {
                // Lösche den alten Entwurf
                await deleteEntwurfFromDB(currentEditItem._id);
                // Speichere den aktualisierten Entwurf
                const savedEntwurf = await saveEntwurfToDB(updatedEntwurf);
                
                if (savedEntwurf) {
                    setEntwurfItems(prevItems => 
                        prevItems.map(item => 
                            item === currentEditItem ? savedEntwurf : item
                        )
                    );
                }
    
                setIsEditing(false);
                setCurrentEditItem(null);
            } catch (error) {
                console.error('Fehler beim Aktualisieren des Entwurfs:', error);
            }
        } else {
            await addItem();
        }
        setIsEntwurfVisible(false);
    };

    const handleAusgewählterStack = (stack) => {
        if (!ausgewählerStack.includes(stack)){
            setAusgewählerStack([...ausgewählerStack, stack]);
        }
    }

    const handleLöschenStack = (entfernenderStack) => {
        setAusgewählerStack(ausgewählerStack.filter(stack => stack !== entfernenderStack));
    }

    const kartenKlick = (e) => {
        const key = e.currentTarget.getAttribute("data-key");
        console.log(key);
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
                        <ErstellenButton onClick={handleEntwurfVisibility} name={"Entwurf"}/>
                        {entwurfItems.map((item, index) => (
                            <div className="entwurf-karte" key={index} data-key={index} onClick={kartenKlick}>
                                <div className="karte-top">
                                    <h1>{item.titel}</h1>
                                    <div className="karte-top-links">
                                        <i className="bx bx-x" onClick={() => handleRemoveCard(item)}></i>
                                        <i className='bx bx-edit' onClick={(e) => handleEdit(item, e)}></i>
                                    </div>
                                </div>
                                <div className="karte-main">
                                    <div className="karte-beschreibung">
                                        <p>{item.beschreibung}</p>
                                    </div>
                                    <div className="karte-features">
                                        <div className="features-links">
                                            {item.feature1 ?
                                            <p>{item.feature1}</p> : ""}
                                            {item.feature2 ?
                                            <p>{item.feature2}</p> : ""}
                                            {item.feature3 ?
                                            <p>{item.feature3}</p> : ""}
                                        </div>
                                        <div className="features-rechts">
                                            {item.feature4 ?
                                            <p>{item.feature4}</p> : ""}
                                            {item.feature5 ?
                                            <p>{item.feature5}</p> : ""}
                                            {item.feature6 ?
                                            <p>{item.feature6}</p> : ""}  
                                        </div>
                                    </div>
                                    <div className="karte-information">
                                        <p>{item.notizen}</p>
                                    </div>
                                    <div className="karte-bottom">
                                        <p className="start-karte">{item.startdatum}</p>
                                        <div className="stack-farbe-scroll">
                                        {Array.isArray(item.stack) ? (
                                            item.stack.map((stack, index) => (
                                                <p className="stack-farbe" key={index}>{stack}</p>
                                            ))
                                        ) : ""}  
                                        </div>     
                                    </div>
                                </div>
                            </div>
                        ))}
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