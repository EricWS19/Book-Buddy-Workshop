import { Link } from "react-router-dom";

export default function Navigations({ token, setToken }) {
  console.log("Token inside Navigations:", token);

  const handleLogout = () => {
    setToken(null); // Clear the token on logout
  };

  return (
    <nav>
      <ul>
        {/* Show these ONLY when the user is NOT logged in */}
        {!token && (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}

        {/* Show these ONLY when the user IS logged in */}
        {token && (
          <>
            <li><Link to="/account">Account</Link></li>
            <li>
              <button 
                onClick={handleLogout} 
                className="logout-button"
                style={{ 
                  background: "none", 
                  border: "none", 
                  padding: 0, 
                  color: "#ECF0F1",
                  cursor: "pointer",
                  fontSize: "16px",
                  fontWeight: "bold",
                  fontStyle: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif"
                }}
              >
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
