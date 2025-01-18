import { useState } from "react";
import "./Login.css"
import { login, signup } from "../../firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate();
    const [signState, setSignState] = useState("Anmelden");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    })

    const user_auth = async(e)=>{
        e.preventDefault();
        //setLoading(true);
        if(signState=== "Anmelden"){
            await login(formData.email, formData.password);
            navigate("/");
        } else{
            await signup(formData.name, formData.email, formData.password);
            navigate("/");
        }
        //setLoading(false);
    }

    return(
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
    );
} 

export default Login