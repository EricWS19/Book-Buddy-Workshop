import { Link } from 'react-router-dom';
export default function Navigations() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      <Link to="/account">Account</Link>
    </nav>
  )
}
