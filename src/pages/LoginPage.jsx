import {useState} from "react"
import {useNavigate, useSearchParams} from "react-router"
import {login} from "../api"
import {useAuth} from "../context/AuthContext"

export default function LoginPage(){
   const[email, setEmail] = useState("");
   const[password, setPassword] = useState("");
   const navigate = useNavigate();
   const { login: loginToContext} = useAuth();
   const[searchParams] = useSearchParams();
   const from = searchParams.get("from") || "/account"; //this takes users to back to bookdetail id, incase they wanted to login and check out the book they originally was viewing//if they weren't viewing it takes the, to account

    async function handleSubmit(e){
        e.preventDefault();
        const data = await login({email, password});
        loginToContext(data.token);
        navigate(from); //navigate fires and sends user to the account page.
    }
    // Handle submit sends the credentials to get the token back
    //token is saved in AuthContext from data.token


    return (
        <div className="form-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // this keeps updates the new value to our state 
                />
                <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // same note from above 
                />
            <button type="submit">login</button>
            </form>
        </div>
    )
}

//Hook notes for LoginPage();
// for our 6 hooks, the two imporant things to note is that the email and password will be a string at the start when they are submitted.
// we will have to Context-Text : application/json so our api recieves it as an object
// our login: loginToContext is more for renaming as I can't confuse the imports.  