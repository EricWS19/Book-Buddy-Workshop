import { Link } from "react-router-dom";

export default function Navigations({ token, setToken }) {
  const handleLogout = () => {
    setToken(null); // Clear the token on logout
  };

  return (
    <nav>
      <ul>
        {!token ? (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        ) : (
          <>
            {/* Account link shown only if logged in */}
            <li><Link to="/account">Account</Link></li>

            {/* Logout button */}
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
