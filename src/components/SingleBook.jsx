import { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import TokenContext from "./TokenContext";

const API_URL = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books";
const RESERVATIONS_API =
  "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations";

export default function SingleBook() {
  const { token } = useContext(TokenContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // For handling checkout/return actions
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState(null);

  // We need to track if user has this book checked out and reservationId for returning
  const [userReservationId, setUserReservationId] = useState(null);

  useEffect(() => {
    async function fetchBookAndReservation() {
      try {
        setLoading(true);
        setError(null);

        // Fetch book info
        const res = await fetch(`${API_URL}/${id}`);
        if (!res.ok) throw new Error("Failed to fetch book");
        const data = await res.json();
        setBook(data);

        if (token) {
          console.log("Using token:", token);
          // Fetch user data to get checked out books and their reservation ids
          const userRes = await fetch(
            "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          if (!userRes.ok) throw new Error("Failed to fetch user info");
          const userData = await userRes.json();

          console.log("User reservations:", userData.reservations);

          const reservation = userData.reservations?.find(
            (reservation) => reservation.bookId === Number(id)
          );

          if (reservation) {
            setUserReservationId(reservation.id);
          } else {
            setUserReservationId(null);
          }
        } else {
          setUserReservationId(null);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchBookAndReservation();
  }, [id, token]);

  async function handleCheckout() {
    if (!token) {
      alert("Please log in to check out a book.");
      return;
    }
    setActionLoading(true);
    setActionError(null);

    try {
      console.log("Using token for checkout:", token);
      const res = await fetch(RESERVATIONS_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ bookId: id }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to check out book");
      }

      const reservation = await res.json();
      alert("Book checked out successfully!");

      setUserReservationId(reservation.id);

      // Trigger home page to refresh checked out books
      navigate("/", { state: { refresh: true } });
    } catch (err) {
      setActionError(err.message);
    } finally {
      setActionLoading(false);
    }
  }

  async function handleReturn() {
    if (!token) {
      alert("Please log in to return a book.");
      return;
    }

    if (!userReservationId) {
      alert("No reservation found for this book.");
      return;
    }

    setActionLoading(true);
    setActionError(null);

    try {
      console.log("Using token for checkout:", token);
      const res = await fetch(`${RESERVATIONS_API}/${userReservationId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to return book");
      }

      alert("Book returned successfully!");
      setUserReservationId(null);

      // Trigger home page to refresh checked out books
      navigate("/", { state: { refresh: true } });
    } catch (err) {
      setActionError(err.message);
    } finally {
      setActionLoading(false);
    }
  }

  if (loading) return <p>Loading book details...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
  if (!book) return <p>No book found.</p>;

  return (
    <div>
      <h2>{book.title}</h2>
      <img
        src={book.coverimage}
        alt={book.title + " cover"}
        style={{ maxWidth: "200px" }}
      />
      <p>
        <strong>Author:</strong> {book.author}
      </p>
      <p>
        <strong>Description:</strong>{" "}
        {book.description || "No description available."}
      </p>

      {actionError && <p style={{ color: "red" }}>{actionError}</p>}

      {token ? (
        userReservationId ? (
          <button onClick={handleReturn} disabled={actionLoading}>
            {actionLoading ? "Returning..." : "Return Book"}
          </button>
        ) : (
          <button onClick={handleCheckout} disabled={actionLoading}>
            {actionLoading ? "Checking out..." : "Check Out Book"}
          </button>
        )
      ) : (
        <p>
          <em>Please log in to check out or return books.</em>
        </p>
      )}

      <div style={{ marginTop: "1rem" }}>
        <Link to="/">Back to Books</Link>
      </div>
    </div>
  );
}
