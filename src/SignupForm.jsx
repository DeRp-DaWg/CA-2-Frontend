import React, { useId, useState } from 'react'
import { Alert, Button, Container, Dropdown, Form } from 'react-bootstrap';
import fetcher from './fetcher'

export default function SignupForm(props) {
  const usernameId = useId();
  const passwordId = useId();
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [alert, setAlert] = useState({type: "", message: ""})
  function signup() {
    fetcher.createUser(username, password)
    .then(data => {
      if (data.code) {
        switch(data.code) {
          default:
            setAlert({type: "danger", message: data.code+": "+data.message})
            break
        }
      } else if (data.username) {
        setAlert({type: "primary", message: "Account created."})
      } else {
        setAlert({type: "danger", message: "This error should not be possible"})
      }
      props.onSignup(data)
    })
  }
  
  function handleSubmit(event) {
    event.preventDefault()
    signup()
  }
  
  return (
    <Dropdown className={props.className}>
      <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
        Sign up
      </Dropdown.Toggle>
      
      <Dropdown.Menu className="dropdown-menu-end" style={{"minWidth": "300px"}}>
        <Container>
          {alert.message === "" ? <></> : <Alert variant={alert.type}>{alert.message}</Alert>}
          <h3>Sign up</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId={usernameId}>
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Username" value={username} onInput={e => setUsername(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId={passwordId}>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" value={password} onInput={e => setPassword(e.target.value)}/>
            </Form.Group>
            <Button variant="primary" type="submit">
              Sign up
            </Button>
          </Form>
        </Container>
      </Dropdown.Menu>
    </Dropdown>
  )
}
