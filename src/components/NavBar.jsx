import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext";
import {useState, useEffect} from "react";
import {getBooks} from "../api";

export default function NavBar() {
    const {token, logout} = useAuth();
    const navigate = useNavigate();
    const[search, setSearch]=useState("")
    const[books, setBooks]= useState([]);

    const filteredBooks = books.filter((book) => 
        book.title.toLowerCase().includes(search.toLowerCase())
    );

    useEffect(() => {
        getBooks().then((data)=> setBooks(data));   
     }, []);

    function handleLogout(){
        logout();
        navigate("/books")
    }


return (
    <nav>
        <div>
        <Link to="/books">Story-Rift</Link>
        <div className="nav-search-wrapper">
            <input type="text" placeholder="Search for a book..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="search-input"></input>
            <span className="search-icon">
                <img src="/search.png" alt="search"></img>
            </span>
            {search && (
                <div className="search-dropdown">
                    {filteredBooks.slice(0,5).map((book) => (
                        <Link to={`/books/${book.id}`} key={book.id} className="search-result" onClick={() => setSearch("")} >
                            <img src={book.coverimage} alt={book.title}/>
                            <p>{book.title}</p>
                        </Link>
                    ))}
                </div>
            ) }
        </div>

        { token ? (
            <>
            <Link to="/account">Account</Link>
            <button onClick={handleLogout}>Logout</button>
            </>
        ) : (
            <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            </>
        )}
        </div>
    </nav>
);
}