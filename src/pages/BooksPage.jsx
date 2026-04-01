import { useState, useEffect} from "react";
import { getBooks } from "../api";
import { Link} from "react-router-dom";


export default function BooksPage(){
   const [books, setBooks] = useState([]);
   const [scrollIndex, setScrollIndex] = useState(0);
   const [currentPage, setCurrentPage] =useState(1);
   const booksPerPage = 10;

    useEffect(() => {
        getBooks().then((data) => {
            setBooks(data)
        });
    }, []);

    // This handles the horizontal arrow feature in when it should appear and disappear 
    function scrollLeft(){
        setScrollIndex((prev) => Math.max(prev - 1, 0));
    }

    function scrollRight() {
        setScrollIndex((prev) => Math.min(prev + 1, availableBooks.length -4))
    }

    const availableBooks = books.filter((book) => book.availble !== false );// this will fetch available books for our horizontal scroll function
    // I have set the value to true and false, but it seems to be fetching everything in the data
    // I have also set it to null and it would return nothing, the goal here was to only show the books that are available, and 
    // I realize the problem here is in the data not the function. Not something you can fix, but if I am correct in my analysis do let me know.

    

    // This is for the page slices
    const totalPages = Math.ceil(books.length / booksPerPage);
    const startIndex = (currentPage - 1) * booksPerPage;
    const currentBooks = books.slice(startIndex, startIndex + booksPerPage);
    const firstHalf = currentBooks.slice(0,5); // this allows for the Books recommended function to be between the 5 and 6 books
    const secondHalf = currentBooks.slice(5,10);
    

    return(
        <div className="books-container">
        <div>
            <h1>All Books</h1>
            <div>
                {firstHalf.map((book) => (
                    <Link to={`/books/${book.id}`} key={book.id} className="book-card">
                        <img src={book.coverimage} alt={book.title}/>
                        <div className="book-info">
                            <h2>{book.title}</h2>
                            <p>{book.author}</p>
                        </div>
                    </Link>
                ))}
            </div>
            <div className="recommended-section">
                    <h2>Books recommended for you</h2>
                    <div className="recommended-container">
                        {availableBooks.length > 4 && (
                            <button className="scroll-btn" onClick={scrollLeft}>←</button> 
                        )}
                    <div className="recommended-books">
                        {availableBooks.slice(scrollIndex, scrollIndex + 4).map((book) => ( // scroll index tracks which books we're starting from scrollLeft and right move the index up and down. 
                        // //dot means cut out a portion which makes it very useful in this, it takes two arguments and does a start and end. It takes a portion of an array without changing the original.
                            <Link to ={`/books/${book.id}`} key={book.id} className="recommended-card"> 
                                <img src={book.coverimage} alt={book.title}/>
                                <p>{book.title}</p>
                            </Link>
                        ))}
                    </div>
                    {availableBooks.length > 4 && (
                        <button className="scroll-btn" onClick={scrollRight}>→</button> // this arrow only shows if when there are more than 4 books, a good useful ternary
                    )}
                    </div>
            </div>
                <div>
                    {secondHalf.map((book) => (
                        <Link to ={`/books/${book.id}`} key={book.id} className="book-card">
                            <img src={book.coverimage} alt={book.title}/>
                            <div className="book-info">
                                <h2>{book.title}</h2>
                                <p>{book.author}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            <div className="pagination">
                {Array.from({ length: totalPages}, (_, i) => i +1).map((page)=> (
                    <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={currentPage === page ? "page-btn active" : "page-btn"}>
                        {page}
                    </button>
                ))}
            </div>
            
        </div>
        </div>
    )
}

//Purpose: 
// Here we are using useEffect with an empty [] as we don't have any books yet,
// We are also calling our api function and when the data comes back we store it in state.
// Link's purpose is for each book card till need to be clickable. 
// In our return statement as well, we are using map to add on the link effect for the frontend,
// so each book id will have an img, title and author, all attributed to Link. Which is important
// especially if you want the user to have the correct book.
