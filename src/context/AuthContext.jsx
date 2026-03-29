import { createContext, useContext, useState, useEffect } from "react";
import {getMe} from "../api";


const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        if(savedToken) {
            setToken(savedToken);
            getMe(savedToken).then((data) => setUser(data));
        }
    }, [])


    function login(newToken) {
        localStorage.setItem("token", newToken);
        setToken(newToken);
        getMe(newToken).then((data) => setUser(data));
    } 

    function logout() {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
    }

    return(
        <AuthContext.Provider value ={{ token, user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )



}


//Purpose: 
//token and user will be the two pieces of state that changes.
//for useEffect, it will save the token in our localStorage so the user stays logged in even on 
// refresh. When we get profile details throw getMe, our code will check the local storage to confirm 
// our token. 

//Login saves that token fetches the data in getMe.
//Logout says, clear the token and our data and set it to nul..
//Return says, anything between AuthContext.Provider has access to the 2 pieces of state and functions here.
// That is important because since a user will need to be logged in and out, and need a token. other pages, that are additional resources,
// will use this to confirm if the user has the right and for access on these resources. 