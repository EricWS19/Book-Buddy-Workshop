import { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import TokenContext from "./TokenContext";

const BOOKS_API = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books";
const USER_API = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me";

export default function Home() {
  const { token, setToken } = useContext(TokenContext);
  const location = useLocation();
  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setError(null);
      try {
        const booksRes = await fetch(BOOKS_API);
        const booksData = await booksRes.json();
        setBooks(Array.isArray(booksData) ? booksData : []);

        if (token) {
          const userRes = await fetch(USER_API, {
            headers: { Authorization: `Bearer ${token}` },
          });

          const userData = await userRes.json();
          setReservations(userData.reservations || []);
        } else {
          setReservations([]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();

    if (location.state?.refresh) {
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [token, location.key, location.state?.refresh]);

  const handleLogout = () => {
    setToken(null);
    navigate("/login");
  };

  const handleReturnAll = async () => {
    if (!token || reservations.length === 0) return;

    const confirmReturn = window.confirm("Are you sure you want to return all checked out books?");
    if (!confirmReturn) return;

    for (const book of reservations) {
      try {
        await fetch(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations/${book.id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (err) {
        console.error(`Failed to return book ID ${book.id}:`, err);
      }
    }

    // Refresh reservations
    try {
      const userRes = await fetch(USER_API, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const userData = await userRes.json();
      setReservations(userData.reservations || []);
    } catch (err) {
      console.error("Failed to refresh reservations:", err);
    }
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p>Loading books...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div>
      <h2>Welcome to the Library App</h2>

      {/* Search bar */}
      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Search books..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {token ? (
        <>
          <div className="button-group">
            <button onClick={() => navigate("/account")}>Go to My Account</button>
            <button onClick={handleLogout}>Logout</button>
          </div>

          <div className="home-layout">
            {/* Checked Out Books */}
            <div className="checked-out-list">
              <h3>Checked Out Books</h3>
              <p>
                You have {reservations.length} book
                {reservations.length !== 1 ? "s" : ""} checked out.
              </p>

              {reservations.length > 0 && (
                <>
                  <ul>
                    {reservations.map((book) => (
                      <li key={book.id}>
                        {book.title} by {book.author}
                      </li>
                    ))}
                  </ul>
                  <button onClick={handleReturnAll}>Return All Books</button>
                </>
              )}
            </div>

            {/* Available Books */}
            <div className="book-list">
              <h3>Available Books</h3>
              {filteredBooks.length === 0 ? (
                <p>No books match your search.</p>
              ) : (
                <ul>
                  {filteredBooks.map((book) => (
                    <li key={book.id}>
                      <Link to={`/books/${book.id}`}>
                        {book.title} by {book.author}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          <p>
            Please <Link to="/login">login</Link> or{" "}
            <Link to="/register">register</Link> to check out books.
          </p>

          <div className="book-list">
            <h3>Available Books</h3>
            {filteredBooks.length === 0 ? (
              <p>No books match your search.</p>
            ) : (
              <ul>
                {filteredBooks.map((book) => (
                  <li key={book.id}>
                    <Link to={`/books/${book.id}`}>
                      {book.title} by {book.author}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  );
}
