import { Link } from 'react-router-dom';

export default function Navigations({ token, setToken }) {
  const handleLogout = () => {
    setToken(null); // Clear the token
  };

  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>

        {!token ? (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/account">Account</Link></li>
            <li><button onClick={handleLogout}>Logout</button></li>
          </>
        )}
      </ul>
    </nav>
  );
}
