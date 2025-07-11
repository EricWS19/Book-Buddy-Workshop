import { useState } from 'react';
import TokenContext from "./components/TokenContext";
import { Routes, Route } from 'react-router-dom';
import Navigations from './components/Navigations';
import SingleBook from './components/SingleBook';
import Login from './components/Login';
import Register from './components/Register';
import Account from './components/Account';
import Home from './components/Home';
import bookLogo from './assets/books.png';

function App() {
  const [token, setToken] = useState(null);

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      <header>
        <h1>
          <img id="logo-image" src={bookLogo} alt="Library Logo" />
          Library App
        </h1>
        <Navigations />
      </header>

      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/books' element={<Home />} />
          <Route path='/books/:id' element={<SingleBook />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/account' element={<Account />} />
        </Routes>
      </main>
    </TokenContext.Provider>
  );
}

export default App;
