import React from 'react'
import { Button } from 'react-bootstrap'

export default function LogoutButton(props) {
  return (
    <Button variant="outline-primary" onClick={props.onLogout}>Log out</Button>
  )
}
