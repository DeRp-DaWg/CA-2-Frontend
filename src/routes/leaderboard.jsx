import React, {useEffect, useState} from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import Table from 'react-bootstrap/Table'
import fetcher from '../fetcher'

export default function Leaderboard() {
  const [rows, setRows] = useState(<></>)
  const [page, setPage] = useState(0)
  const [max, setMax] = useState(100)

  useEffect(() => {
    createRows()
  }, [page, max])
  

  function createRows() {
    fetcher.getLeaderboard(page*max, max)
    .then(data => {
      setRows(
        data.map((user, index) => {
          return (
            <tr key={user.username}>
              <td>{index+1+page*max}</td>
              <td>{user.username}</td>
              <td>{user.highscore}</td>
            </tr>
          )
        })
      )
    })
  }
  
  return (
    <div>
      <Form>
        <Container>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Highscores per page: {max}</Form.Label>
                <Form.Range min={1} max={50} onInput={e => setMax(e.target.value)}/>
              </Form.Group>
            </Col>
            <Col>
              <Button variant="primary" onClick={e => setPage(page-1)}>Previous page</Button>
            </Col>
            <Col>
              <Button variant="primary" onClick={e => setPage(page+1)}>Next page</Button>
            </Col>
          </Row>
        </Container>
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </Table>
    </div>
  )
}
