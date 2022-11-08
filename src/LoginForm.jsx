import React, { useId, useState } from 'react'
import { Alert, Button, Container, Dropdown, Form } from 'react-bootstrap';
import fetcher from './fetcher'

export default function LoginForm(props) {
  const usernameId = useId();
  const passwordId = useId();
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [alert, setAlert] = useState({type: "primary", message: ""})
  function login() {
    fetcher.login(username, password)
    .then(data => {
      if (data.code) {
        setAlert({type: "danger", message: data.message})
      }
      props.onLogin(data)
    })
  }
  
  function handleSubmit(event) {
    event.preventDefault()
    login()
  }
  
  return (
    <Dropdown className={props.className}>
      <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
        Log in
      </Dropdown.Toggle>
      
      <Dropdown.Menu className="dropdown-menu-end" style={{"minWidth": "300px"}}>
        <Container fluid="xxl">
          {alert.message === "" ? <></> : <Alert variant={alert.type}>{alert.message}</Alert>}
          <h3>Log in</h3>
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
              Log in
            </Button>
          </Form>
        </Container>
      </Dropdown.Menu>
    </Dropdown>
  )
}
