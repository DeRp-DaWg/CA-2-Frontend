import React, { useEffect, useState } from 'react'
import { Alert, Button, Container, Stack } from 'react-bootstrap'
import { useOutletContext } from 'react-router-dom'
import fetcher from '../fetcher'

export default function game() {
  const [rows, setRows] = useState(<></>)
  const [jokeName, setJokeName] = useState("")
  const [jokes, setJokes] = useState([])
  const [alert, setAlert] = useState({type: "", message: ""})
  const props = useOutletContext()
  
  useEffect(() => {
    getNewJokes()
  },[])
  
  useEffect(() => {
    renderJokes()
  },[jokes, props.token])
  
  function answer(answer) {
    let isCorrect;
    if (jokeName === answer) {
      isCorrect = true
      // props.setScore(props.score+1)
    } else {
      isCorrect = false
      // props.setScore(0)
    }
    fetcher.sendAnswer(props.token, isCorrect)
    .then(data => {
      console.log(data)
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
      <Stack direction="horizontal" gap={4}>
        <h1>Find the {jokeName} joke</h1>
        <h1>Score: {props.score}</h1>
        <h1>Highscore: {props.highscore}</h1>
      </Stack>
      <Stack direction="vertical" gap={3}>
        {rows}
      </Stack>
    </Container>
  )
}
