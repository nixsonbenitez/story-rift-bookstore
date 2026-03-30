import {useState, useEffect} from "react"
import {Link} from "react-router-dom"
import {getMe, returnBook} from "../api"
import {useAuth} from "../context/AuthContext"
 
export default function AccountPage(){
   const {token, user} = useAuth();
   const [reservations, setReservations] = useState([])// we are using brackets to deconstruct an array, since we are storing one or more books its a good use of a bracket.

   useEffect(() => {
    if(token) {
        getMe(token).then((data) => setReservations(data.reservations));
    }}, [token]);

async function handleReturn(reservationId){
    await returnBook(reservationId, token)
    const data = await getMe(token);
    setReservations(data.reservations)
}

if(!token){
    return(
        <div>
            <p>You are not logged in</p>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
        </div>
    );
}

return (
    <div>
        <h1>My Account</h1>
        <p> Name: {user?.firstName}</p>   {/*The question marks here are an optional chain, where once the data loads, it takes the data to here, also protects from crashing. */}
        <p> Email: {user?.email}</p>

        <h2>My Reservations</h2>
        {reservations.length === 0 ? (
            <p>You have no reservations! <Link to="/books">Go find a book</Link></p>
        ) : (
            reservations.map((reservation) => (
                <div key={reservation.id}>
                    <p>{reservation.title}</p>
                    <button onClick={() => handleReturn(reservation.id)}>Return</button>
                </div>
            ))
        )}

    </div>
)
}

//Purpose:
// The return here in our account page, is showing the user their email and name. including the reservations they have. 
// We also have on eternary where if they don't have a book checked out to go find a book or if they did, map through the data to see which ones they do have checked out,
//grab the id, title, and include a return button once they are done checking out the book. 
//our HandleReturn function from earluer is called in the return.

//The !token, will always suggest to the user to login and reegster. 

// UseEffect here will always, get the data and update reservations when page loads.