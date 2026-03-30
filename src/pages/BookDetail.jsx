import {useState, useEffect} from "react";
import {useParams, Link} from "react-router-dom"
import {getBookById, reserveBook} from "../api"
import {useAuth} from "../context/AuthContext";




export default function BookDetail(){
    const { id } = useParams();
    const { token } = useAuth();
    const [book, setBook] = useState(null);

    useEffect(() => {
        getBookById(id).then((data) => setBook(data))
    }, [id]);
    
    async function handleReserve(){
        await reserveBook(book.id, token);
        const updatedBook = await getBookById(id);
        setBook(updatedBook);
    }
    //handlereserves() is what fires when reserve button is in use and takes the book from our database of available books. 

    if(!book) return <div>Your book is loading...</div>

    return (
        <div>
            <img src={book.coverimage} alt={book.title}/>
            <h1>{book.title}</h1>
            <p>{book.author}</p>
            <p>{book.description}</p>

            {!token ? (
                <p>Please <Link to="/register">register</Link> or <Link to="/login">login</Link> to reserve this book!</p>
            ) : book.available ? (
                <button onClick={handleReserve}>Reserve</button>
            ) : (
                <button disabled>Already Reserved</button>
            )}
        </div>
    )
}

//BookDetail Notes: 
// so we are calling the books detail and idea from the url which is why we are using 
// useParams, to fetch it. UseEffect here is saying to load immidiently the id of the book once it appears in the 
// params and set that data forward, as soon as an id shows up.

//BookDetail return notes:
//in our return we pull up the data from our api and show the said id when Book detail fores in our earlier part of our function.
// If a token isn't shown there is an attribution and an encouraging message to have users register or login. Other wise the colon and question mark shows
// a reserve buttn and already reserve buttn if a token is indeed present.  its a ternary inside of aq ternary. 

// The nexter ternary is like saying if no token show register or user. If a book is available show a reserve, or disable it. 3 ternary! 

//also that if statement !book is to keep the users attention, to let them know their book is on the way. 