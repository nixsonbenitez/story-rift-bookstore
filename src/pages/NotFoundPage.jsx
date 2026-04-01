import {Link} from "react-router-dom"
export default function NotFoundPage(){
     return(
        <div className="not-found-container">
            <h1>404</h1>
            <img src="404.png" alt="animal eating an apple" className="img404"></img>
            <p>How did you get here?</p>
            <Link to="/books">Enter secret portal</Link>
        </div>
     )
}