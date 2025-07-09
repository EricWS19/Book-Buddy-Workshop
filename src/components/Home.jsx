import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched data:", data);

        // Since data is an array, set it directly
        if (Array.isArray(data)) {
          setBooks(data);
        } else {
          throw new Error("Expected an array of books");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
  }, []);

  if (loading) return <p>Loading books...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div>
      <h2>Welcome to the Library App</h2>
      <p>Use the navigation to browse books, login, or register.</p>
      <h3>Available Books</h3>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <Link to={`/books/${book.id}`}>
              {book.title} by {book.author}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
