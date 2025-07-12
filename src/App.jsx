import { useState, useEffect } from "react";
import TokenContext from "./components/TokenContext";
import { Routes, Route, Link } from "react-router-dom";
import Navigations from "./components/Navigations";
import SingleBook from "./components/SingleBook";
import Login from "./components/Login";
import Register from "./components/Register";
import Account from "./components/Account";
import Home from "./components/Home";
import bookLogo from "./assets/books.png";

const BOOKS_API = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books";

function App() {
  const [token, setToken] = useState(null);
  const [books, setBooks] = useState([]);

  async function refreshBooks() {
    try {
      const res = await fetch(BOOKS_API);
      const data = await res.json();
      setBooks(data.books || []);
    } catch (err) {
      console.error("Failed to fetch books:", err);
    }
  }

  useEffect(() => {
    refreshBooks();
  }, []);

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      <header>
        <Link to="/" id="app-title-link">
          <h1 className="app-title">
            <img id="logo-image" src={bookLogo} alt="Library Logo" />
            Library App
          </h1>
        </Link>
        <Navigations />
      </header>
      <main>
        <Routes>
          <Route
            path="/"
            element={<Home books={books} refreshBooks={refreshBooks} />}
          />
          <Route
            path="/books"
            element={<Home books={books} refreshBooks={refreshBooks} />}
          />
          <Route
            path="/books/:id"
            element={<SingleBook refreshBooks={refreshBooks} />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </main>
    </TokenContext.Provider>
  );
}

export default App;
