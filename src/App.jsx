import { useState } from 'react'
import './App.css'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container'


import Leaderboard from './Leaderboard';

export default function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Container>
        <Leaderboard/>
      </Container>
    </div>
  )
}
