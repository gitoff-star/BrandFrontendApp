import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Crud from './CRUD/Crud';
import Login from './CRUD/Login';
import Register from './CRUD/Register';

function App() {
  return (
    <>
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/Login">Login</Link>
        </li>
        <li>
          <Link to="/Register">Register</Link>
        </li>
      </ul>
    </nav>

    <Routes>
     
      <Route path="/" element={<Crud />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Register" element={<Register />} />
    </Routes>
  </>
  );
}

export default App;
