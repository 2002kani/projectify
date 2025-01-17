import "./Login.css"
import { useState } from "react";
import { useForm } from "react-hook-form"

const Login = () => {

    const { register, handleSubmit } = useForm();
    const [data, setData] = useState("");

    return(
        <form onSubmit={handleSubmit((data) => setData(JSON.stringify(data)))} className="login">
            <div className="login-top">
                <h2> Ganz einfach Registrieren </h2>
                <p> um Projectify zu benutzen und deine Projekte effizient zu planen </p>
            </div>
            <div className="login-form">
                <input {...register("firstName")} placeholder=""></input>
            </div>
        </form>
    );
}

export default Login