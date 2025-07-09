import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import TokenContext from "./TokenContext";

export default function Account() {
  const { token, setToken } = useContext(TokenContext); // Get token and setToken from context
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function fetchUserInfo() {
    if (!token) {
      setError("You must be logged in to view your account.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const res = await fetch(
        "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!res.ok) throw new Error("Failed to fetch user info");
      const data = await res.json();
      setUserInfo(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUserInfo();
  }, [token]);

  const handleLogout = () => {
    setToken(null);
    navigate("/login");
  };

  if (loading) return <p>Loading account info...</p>;

  if (error)
    return (
      <div>
        <p style={{ color: "red" }}>{error}</p>
        <button onClick={fetchUserInfo}>Retry</button>
      </div>
    );

  if (!userInfo) return null;

  return (
    <div>
      <h2>My Account</h2>
      <p>
        Name: {userInfo.firstName} {userInfo.lastName}
      </p>
      <p>Email: {userInfo.email}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
