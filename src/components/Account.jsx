import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import bookLogo from "./assets/books.png";
import Account from "./components/Account";

function App() {
  const [token, setToken] = useState(null);

  return (
    <Router>
      <div className="app-wrapper">
        <header>
          <h1>
            <img id="logo-image" src={bookLogo} alt="Book Logo" />
            Library App
          </h1>
          <nav>
            <Link to="/">Home</Link> | <Link to="/account">My Account</Link>
          </nav>
        </header>

        <main>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <h2>Welcome to BookBuddy 📚</h2>
                  <p>
                    This app lets you browse a public library catalog, check out
                    books, and manage your account.
                  </p>
                  <p>Use the navigation above to get started. :D</p>
                </>
              }
            />
            <Route path="/account" element={<Account token={token} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
