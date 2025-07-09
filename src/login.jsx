import { useState } from "react";
import { useContext } from "react";
import TokenContext from "./TokenContext";

export default function Login({ token }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');}

    async function handleSubmit(e) {
        e.preventDefault()
        try{
            const response = await fetch('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/login',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password }),
                });
                const data = await response.json();
                console.log(data)
  const { setToken } = useContext(TokenContext);

        } catch(error) {
            console.error(error)
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
      console.log(data);
      setToken(data.token); //check
    } catch (error) {
      console.error(error);
    }
  }

    return (
        <>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email">Email:
                    <input 
                        type="email"
                        id="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </label>
                <label htmlFor="password">Password:
                    <input 
                        type="password"  
                        id="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </label>
            </div>
            <button type="submit">Login</button>
        </form>
        </>
    )
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
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>
          <label htmlFor="password">
            Password:
            <input
              type="password"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  )
}