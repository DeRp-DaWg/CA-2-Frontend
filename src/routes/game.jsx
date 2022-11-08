import React, { useEffect, useState } from 'react'
import { Button, Container, Stack } from 'react-bootstrap'
import { useOutletContext } from 'react-router-dom'
import fetcher from '../fetcher'

export default function game() {
  const [rows, setRows] = useState(<></>)
  const [jokeName, setJokeName] = useState("")
  const [token] = useOutletContext()
  
  useEffect(() => {
    renderNewJokes()
  },[])
  
  function answer(answer) {
    let isCorrect;
    if (jokeName === answer) {
      isCorrect = true
    } else {
      isCorrect = false
    }
    console.log(token)
    //fetcher.sendAnswer(props.token, isCorrect)
  }
  
  function renderNewJokes() {
    fetcher.getJokes()
    .then((jokes) => {
      console.log(jokes)
      setJokeName(jokes[Math.floor(Math.random() * jokes.length)].name)
      setRows(
        jokes.map((joke) => {
          return (
            <Button variant="secondary" onClick={() => {answer(joke.name)}}>{joke.joke}</Button>
          )
        })
      )
    })
  }
  
  return (
    <Container>
      <h1>Find the {jokeName} joke</h1>
      <Stack direction="vertical" gap={3}>
        {rows}
      </Stack>
    </Container>
  )
}
