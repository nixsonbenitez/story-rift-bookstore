import { useState, useEffect} from "react";
import { getBooks } from "../api";
import { Link } from "react-router-dom";


export default function BooksPage(){
   const [books, setBooks] = useState([]);
   const [search, setSearch] = useState("");

    useEffect(() => {
        getBooks().then((data) => {
            setBooks(data)
        });
    }, []);


    const filteredBooks =  books.filter((book) => 
        book.title.toLowerCase().includes(search.toLowerCase())// To remove the case sensitive in the searchbar toLowerCase helps solve this cause.
    );
    return(
        <div className="books-container">
        <div>
            <h1>All Books</h1>
            <div className="search-wrapper">
                <input 
                type="text"
                placeholder="Search for a book..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}// this keeps track of the keystrokes so we can predict what the user may want. 
                className="search-input"
                />
                {search && (
                    <div className="search-dropdown">
                        {filteredBooks.slice(0, 5).map((book) => (
                            <Link to={`/book/${book.id}`} key={book.id} className="search-result" onClick={() => setSearch("")}>
                                <img src={book.coverimage} alt={book.title}/>
                                <p>{book.title}</p>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
            <div>
                {books.map((book) => (
                    <Link to={`/books/${book.id}`} key={book.id} className="book-card">
                        <img src={book.coverimage} alt={book.title} />
                        <div className="book-info">
                        <h2>{book.title}</h2>
                        <p>{book.author}</p>
                        </div>
                    </Link>
                ))}
                

            </div>
        </div>
        </div>
    )
}

//Purpose: 
// Here we are using useEffect with an empty [] as we don't have any books yet,
// We are also calliong our api function and when the data comes back we store it in state.
// Link's purpose is for each book card till need to be clickable. 
// In our return statement as well, we are using map to add on the link effect for the frontend,
// so each book id will have an img, title and author, all attributed to Link. Which is important
// especially if you want the user to have the correct book.
