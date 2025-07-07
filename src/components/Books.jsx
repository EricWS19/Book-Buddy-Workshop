import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const API_URL = 'https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books';
export default function Books({ searchTerm }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_URL);
        const data = await response.json();
        setBooks(data.books || []);
      } catch (error) {
        setError("Failed to fetch books.");
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);
  const filtered = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div>
      <h2>Books</h2>
      {loading && <p>Loading books...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && filtered.length === 0 && <p>No books found.</p>}
      {filtered.map(book => (
        <div key={book.id}>
          <Link to={`/books/${book.id}`}>
            <b>{book.title}</b>
          </Link>
          <p>Author: {book.author}</p>
        </div>
      ))}
    </div>
  );
}