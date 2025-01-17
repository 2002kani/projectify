import { useState } from "react";
import "./Login.css"
import { login, signup } from "../../firebase";

const Login = () => {

    const [signState, setSignState] = useState("Anmelden");
    const [formData, setFormData] = useState({

    })

    const user_auth = async(e)=>{
        e.preventDefault();
        setLoading(true);
        if(signState=== "Anmelden"){
            await login(email, password);
        } else{
            await signup(name, email, password);
        }
        setLoading(false);
    }

    return(
        <div className="signup">
            <h2> Ganz einfach Registrieren </h2>
            <p> Registriere dich um effizient deine eigenen Projekte zu planen und bearbeiten. </p>
            <div className="input-field">
                <label> Name </label>
                <input type="text" maxLength={30} required/>
                <label> E-mail </label>
                <input type="email" required/>
                <label> Passwort </label>
                <input type="password" required/>
                <button> Registrieren </button>
            </div>
            <p className="change-option">Schon Registriert? <span>Anmelden</span></p>
        </div>
    );
} 

export default Login