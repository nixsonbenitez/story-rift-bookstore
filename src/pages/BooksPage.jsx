import { useState, useEffect} from "react";
import { getBooks } from "../api";
import { Link } from "react-router-dom";


export default function BooksPage(){
   const [books, setBooks] = useState([]);

    useEffect(() => {
        getBooks().then((data) => {
            setBooks(data)
        });
    }, []);

    return(
        <>
        <div>
            <h1>All Books</h1>
            <div>
                {books.map((book) => (
                    <Link to={`/books/${book.id}`} key={book.id}>
                        <img src={book.coverimage} alt={book.title} />
                        <h2>{book.title}</h2>
                        <p>{book.author}</p>
                    </Link>
                ))}
                

            </div>
        </div>
        </>
    )
}

//Purpose: 
// Here we are using useEffect with an empty [] as we don't have any books yet,
// We are also calliong our api function and when the data comes back we store it in state.
// Link's purpose is for each book card till need to be clickable. 
// In our return statement as well, we are using map to add on the link effect for the frontend,
// so each book id will have an img, title and author, all attributed to Link. Which is important
// especially if you want the user to have the correct book.
