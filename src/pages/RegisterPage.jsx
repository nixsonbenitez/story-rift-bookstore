import {useState} from "react"
import {useNavigate, useSearchParams} from "react-router-dom"
import {register} from "../api"
import {useAuth} from "../context/AuthContext"



export default function RegisterPage(){
    const[firstName, setFirstName] = useState("") // always remember this is from reatc
    const[lastName, setLastName] = useState("")
    const[searchParams] =useSearchParams();
    const from = searchParams.get("from") || "/account";
    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    const navigate = useNavigate(); // this is always going to be react-router-dom
    const {login: loginToContext} = useAuth();
    //There is a lot of hooks, but that is because there is a lot of properties


    async function handleSubmit(e){
        e.preventDefault();
        const data = await register({firstName, lastName, email, password});
        loginToContext(data.token);
        navigate(from); 
    }

    //handlesubmit neeeds to be here to act on the form submision and to send the register data to our API

    return(
        <div className="form-container">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
            <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
            <input type="text"  placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
            <input type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <button type="submit">Register</button>
            </form>
        </div>
    )
    
}

//Very much similar to login just has more input fields. 