import { useState } from 'react'
import Container from 'react-bootstrap/Container'
import CustomNavbar from '../CustomNavbar';
import { Outlet } from 'react-router-dom';

export default function root() {
  const [count, setCount] = useState(0)
  const [username, setUsername] = useState("")
  const [token, setToken] = useState("")
  const [score, setScore] = useState(0)
  const [highscore, setHighscore] = useState(0)
  
  function handleLogin(user) {
    if (!user.code) {
      setToken(user.token)
      setUsername(user.username)
      setScore(user.score)
      setHighscore(user.highscore)
    }
    console.log(user)
  }
  
  function handleSignup(user) {
    console.log(user)
  }
  
  function handleLogout() {
    setToken("")
    setUsername("")
  }
  return (
    <div className="App">
      <Container>
        <CustomNavbar onLogin={handleLogin} onSignup={handleSignup} onLogout={handleLogout} username={username}/>
        <Outlet context={{token, score, setScore, highscore, setHighscore}}/>
      </Container>
    </div>
  )
}
