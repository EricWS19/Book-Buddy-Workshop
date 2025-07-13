import { useContext, useEffect, useState } from "react";
import TokenContext from "./TokenContext";
import { useNavigate } from "react-router-dom";

export default function Account() {
  const { token, setToken } = useContext(TokenContext);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionError, setActionError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const navigate = useNavigate();

  const fetchUserInfo = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setUserInfo(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    fetchUserInfo();
  }, [token]);

  const handleLogout = () => {
    setToken(null);
    navigate("/login");
  };

  const handleReturn = async (bookId) => {
    if (!token || !userInfo) return;

    const reservation = userInfo.reservations?.find(
      (res) => res.bookId === bookId
    );

    if (!reservation) {
      alert("No reservation found for this book.");
      return;
    }

    try {
      setRefreshing(true);
      const res = await fetch(
        `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations/${reservation.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to return book");
      }

      alert("Book returned!");
      await fetchUserInfo(); // refresh checked out books
    } catch (err) {
      setActionError(err.message);
    } finally {
      setRefreshing(false);
    }
  };

  if (loading) return <p>Loading account details...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>My Account</h2>

      <p>
        Name: {userInfo.firstname} {userInfo.lastname}
      </p>
      <p>Email: {userInfo.email}</p>

      {actionError && <p style={{ color: "red" }}>{actionError}</p>}

      {userInfo.checkedOutBooks?.length > 0 ? (
        <ul>
          {userInfo.checkedOutBooks.map((book) => (
            <li key={book.id}>
              {book.title} by {book.author}{" "}
              <button onClick={() => handleReturn(book.id)} disabled={refreshing}>
                {refreshing ? "Returning..." : "Return"}
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      <div className="button-group">
        <button onClick={handleLogout}>Logout</button>
        <button onClick={() => navigate("/")} className="account-button">
          Homepage
        </button>
      </div>
    </div>
  );
}
