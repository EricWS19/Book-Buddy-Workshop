import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";     // import useNavigate 
import TokenContext from "./TokenContext";

export default function Login() {
  const { setToken } = useContext(TokenContext);
  const navigate = useNavigate();        //get navigate function 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (data.token) {
        setToken(data.token);
        localStorage.setItem("token", data.token);
        alert("Login successful!");
        navigate("/"); // redirect to home page
      } else {
        alert("Login failed: " + (data.message || "Unknown error"));
      }
    } catch (error) {
      alert("Something went wrong during login." + error.message);
    }
  }

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">
            Email:
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label htmlFor="password">
            Password:
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  );
}