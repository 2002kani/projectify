import { useState } from "react";
import "./Login.css"
import { login, signup } from "../../firebase";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {

    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const [signState, setSignState] = useState("Anmelden");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    })

    const validateForm = () => {
        if (!formData.email || !formData.password) {
            toast.error("Bitte fülle alle Pflichtfelder aus!");
            return false;
        }
        if (signState === "Registrieren" && !formData.name) {
            toast.error("Bitte gib deinen Namen ein!");
            return false;
        }
        if (formData.password.length < 6) {
            toast.error("Das Passwort muss mindestens 6 Zeichen lang sein!");
            return false;
        }
        if (!formData.email.includes('@')) {
            toast.error("Bitte gib eine gültige E-Mail-Adresse ein!");
            return false;
        }
        return true;
    };

    const user_auth = async(e)=>{
        e.preventDefault();
        if(!validateForm()) return;
        setLoading(true);
        try{
            if(signState=== "Anmelden"){
                await login(formData.email, formData.password);
                navigate("/");
            } else{
                await signup(formData.name, formData.email, formData.password);
                navigate("/");
            }
        } catch(error){
            console.error("Auth error:", error);
        }
        setLoading(false);
    }

    if(isLoading){
        return(
            <div className="loading-container">
                <h1> Seite Lädt... </h1>
                <p> Bitte warte einen Moment.</p>
            </div>
        );
    }

    return(
        <>
        <div className="logo-section">
            <h2><span className="material-symbols-outlined"> rocket_launch </span> Projectify</h2>
        </div>
        <div className="signup">
            <h2> Ganz einfach {signState} </h2>
            <p> {signState} um effizient deine eigenen Projekte zu planen und bearbeiten. </p>
            <div className="input-field">
                { signState === "Registrieren" ?
                (<> <label> Name </label>
                <input value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} type="text" maxLength={30} required/> </>) : ""}
                <label> E-mail </label>
                <input value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} type="email" required/>
                <label> Passwort </label>
                <input value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} type="password" required/>
                <button onClick={user_auth} type="submit"> {signState} </button>
            </div>
            {signState === "Registrieren" ? 
            <p className="change-option" onClick={() => setSignState("Anmelden")}>Schon Registriert? <span>Anmelden</span></p> 
            : <p className="change-option" onClick={() => setSignState("Registrieren")}>Noch nicht Registriert? <span> Registrieren </span></p>}
        </div>
        </>
    );
} 

export default Login