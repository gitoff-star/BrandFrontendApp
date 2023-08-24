import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    const url = 'https://localhost:7250/api/Logins/Register';
    const data = {
      username: email,
      hashPassword: password,
    };
console.log(data);
    axios
      .post(url, data)
      .then((result) => {
        toast.success('User successfully registered');
      })

      .catch((error) => toast.error(error.message));
  };

  return (
    <Form>
      <ToastContainer />
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
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Button className="btn btn-success" onClick={handleRegister}>
          Register
        </Button>
      </Form.Group>
    </Form>
  );
}

export default Register;
