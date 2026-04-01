import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import BooksPage from "./pages/BooksPage";
import BookDetail from "./pages/BookDetail"
import AccountPage from "./pages/AccountPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage"


export default function App() {
  return(
    <BrowserRouter> 
      <Routes> 
        <Route path="/" element={<Layout/>}>
        <Route index element={<BooksPage/>} />
        <Route path="/books" element={<BooksPage/>}/>
        <Route path="/books/:id" element={<BookDetail/>}/>        
        <Route path="/account" element={<AccountPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>       
        <Route path="*" element={<NotFoundPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

