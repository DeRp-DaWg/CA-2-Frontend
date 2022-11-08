import React, {useEffect, useState} from 'react'
import Table from 'react-bootstrap/Table'
import fetcher from '../fetcher'

export default function Leaderboard() {
  const [rows, setRows] = useState(<></>)

  useEffect(() => {
    createRows()
  }, [])
  

  function createRows() {
    fetcher.getLeaderboard()
    .then(data => {
      setRows(
        data.map((user) => {
          return (
            <tr key={user.username}>
              <td></td>
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
