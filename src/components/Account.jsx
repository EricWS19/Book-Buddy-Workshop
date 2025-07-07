import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import bookLogo from './assets/books.png'
import Account from './components/Account'

function App() {
  const [token, setToken] = useState(null)

  return (
    <Router>
      <div className="app-wrapper">
        <header>
          <h1>
            <img id='logo-image' src={bookLogo} alt="Book Logo" />
            Library App
          </h1>
          <nav>
            <Link to="/">Home</Link> | <Link to="/account">My Account</Link>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={
              <>
                <p>
                  Complete the React components needed to allow users to browse a library catalog,
                  check out books, review their account, and return books that they've finished reading.
                </p>

                <p>
                  You may need to use the `token` in this top-level component in other components
                  that need to know if a user has logged in or not.
                </p>

                <p>
                  Don't forget to set up React Router to navigate between the different views
                  of your single page application!
                </p>
              </>
            } />
            <Route path="/account" element={<Account token={token} />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App