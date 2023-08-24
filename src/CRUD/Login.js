import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import authContext from "../context/AuthProvider";

function Login() {
  const [islogged, setLogin] = useState(true);
  const { authToken,setAuth } = useContext(authContext);
  // const [auth, setAuth]= useState('');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const url = "https://localhost:7250/api/Logins/login";
    const data = {
      username: email,
      hashPassword: password,
    };

    axios
      .post(url, data, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((res) => {
        const token = res.data["token"];
        console.log("here", token);
        setAuth({ token });
        setLogin(true);
        
        navigate("/"); // Move the navigation here
      })
      .catch((err) => console.error(err));
    const headers = {
      // Authorization: 'Bearer '+auth
    };
   
  };

  return (
    <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="name@example.com"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>passord</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="enter passord"
        />
      </Form.Group>

      <Button className="btn btn-success" onClick={handleLogin}>
        Login
      </Button>
    </Form>
  );
}

export default Login;
