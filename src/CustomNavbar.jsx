import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import LoginForm from './LoginForm'
import LogoutButton from './LogoutButton';
import SignupForm from './SignupForm'
import { Link } from "react-router-dom"

export default function CustomNavbar(props) {
  let content;
  
  if (props.username === "") {
    content = 
    <>
      <LoginForm className="me-2" onLogin={props.onLogin}/>
      <SignupForm onSignup={props.onSignup}/>
    </>
  } else {
    content = 
    <>
      <Navbar.Text className="me-2">Logged in as: {props.username}</Navbar.Text>
      <LogoutButton onLogout={props.onLogout}/>
    </>
  }
  
  return (
    <Navbar variant="light" bg="light">
      <Container>
        <Link to="/" className="navbar-brand">Joke guesser</Link>
        <Nav>
          <Link className="nav-link" to="/leaderboard">Leaderboards</Link>
        </Nav>
        <Navbar.Collapse className="justify-content-end">
          {content}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
