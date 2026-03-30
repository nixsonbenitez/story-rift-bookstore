import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext";

export default function NavBar() {
    const {token, logout} = useAuth();
    const navigate = useNavigate();

    function handleLogout(){
        logout();
        navigate("/books")
    }


return (
    <nav>
        <div>
        <Link to="/books">Story-Rift</Link>
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