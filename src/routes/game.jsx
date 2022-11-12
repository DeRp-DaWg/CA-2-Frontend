import React, { useEffect, useState } from 'react'
import { Alert, Button, Col, Container, Row, Stack } from 'react-bootstrap'
import { useOutletContext } from 'react-router-dom'
import fetcher from '../fetcher'

export default function game() {
  const [rows, setRows] = useState(<></>)
  const [jokeName, setJokeName] = useState("")
  const [jokes, setJokes] = useState([])
  const [alert, setAlert] = useState({type: "", message: ""})
  const [noLoginScore, setNoLoginScore] = useState(0)
  const [noLoginHighscore, setNoLoginHighscore] = useState(0)
  const props = useOutletContext()
  
  useEffect(() => {
    getNewJokes()
  }, [])
  
  useEffect(() => {
    if (noLoginScore > noLoginHighscore) setNoLoginHighscore(noLoginScore)
  }, [noLoginScore])
  
  useEffect(() => {
    renderJokes()
  }, [jokes, props.token])
  
  function answer(answer) {
    let isCorrect;
    if (jokeName === answer) {
      isCorrect = true
      setNoLoginScore(noLoginScore+1)
      
    } else {
      isCorrect = false
      setNoLoginScore(0)
    }
    fetcher.sendAnswer(props.token, isCorrect)
    .then(data => {
      if (data.code) {
        switch(data.code) {
          case 403:
            if (props.token === "") {
              setAlert({type: "info", message: "You are not logged in, your score will not be saved."})
            } else {
              setAlert({type: "danger", message: "Your token has expired, please log in again."})
            }
            break
          default:
            setAlert({type: "danger", message: data.code+": "+data.message})
            break
        }
      } else if (data.score) {
        setAlert({type: "", message: ""})
        props.setScore(data.score)
        props.setHighscore(data.highscore)
      } else {
        setAlert({type: "danger", message: "This error should not be possible"})
      }
    })
    getNewJokes()
  }
  
  function getNewJokes() {
    fetcher.getJokes()
    .then((jokes) => {
      
      setJokeName(jokes[Math.floor(Math.random() * jokes.length)].name)
      setJokes(jokes)
    })
  }
  
  function renderJokes() {
    shuffleArray(jokes)
    setRows(
      jokes.map((joke) => {
        return (
          <Button key={joke.name} variant="secondary" onClick={() => {answer(joke.name)}}>{joke.joke}</Button>
        )
      })
    )
  }
  
  // Stolen from stackoverflow
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  return (
    <Container>
      {alert.message === "" ? <></> : <Alert variant={alert.type}>{alert.message}</Alert>}
      <Row className="justify-content-end">
        <Col>
          <h1>Find the {jokeName} joke</h1>
        </Col>
        <Col md="auto">
          <h2>Score: {props.token === "" ? noLoginScore : props.score}</h2>
          <h2>Highscore: {props.token === "" ? noLoginHighscore : props.highscore}</h2>
        </Col>
      </Row>
      <Stack direction="vertical" gap={3}>
        {rows}
      </Stack>
    </Container>
  )
}
