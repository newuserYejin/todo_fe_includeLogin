import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import api from "../utils/api";

import { Link, Navigate, useNavigate } from "react-router-dom";

const LoginPage = ({ user, setUser }) => {
  const [enterEmail, setEnterEmail] = useState('')
  const [enterPassword, setEnterPassword] = useState('')
  const [LoginError, setLoginError] = useState('')

  const navigate = useNavigate();

  useEffect(() => {
    console.log("useEffect - user state changed:", user);
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const AttemptLogin = async (event) => {
    event.preventDefault()

    try {
      const response = await api.post('/user/login', { email: enterEmail, password: enterPassword })
      if (response.status === 200) {
        console.log("login success!!")
        sessionStorage.setItem("token", response.data.token)
        console.log("before setUser:", response.data.user);
        setUser(response.data.compareUser);
        console.log("after setUser called");
        // api.defaults.headers['authorization'] = "Bearer " + response.data.token

        setLoginError('')
        navigate('/')
      } else {
        throw new Error(response.message)
      }
    } catch (error) {
      setLoginError(error.message)
    }
  }

  if (user) {
    return <Navigate to='/' />
  }

  return (
    <div className="display-center">
      {LoginError && <div className="error">{LoginError}</div>}
      <Form className="login-box" onSubmit={AttemptLogin}>
        <h1>로그인</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={(event) => setEnterEmail(event.currentTarget.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={(event) => setEnterPassword(event.currentTarget.value)} />
        </Form.Group>
        <div className="button-box">
          <Button type="submit" className="button-primary">
            Login
          </Button>
          <span>
            계정이 없다면? <Link to="/register">회원가입 하기</Link>
          </span>
        </div>
      </Form>
    </div>
  );
};

export default LoginPage;
