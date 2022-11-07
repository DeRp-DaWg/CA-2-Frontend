import React from 'react'
import Table from 'react-bootstrap/Table'

export default function Leaderboard() {
  

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
          <tr>
            <td>1</td>
            <td>Lars</td>
            <td>100</td>
          </tr>
        </tbody>
      </Table>
    </div>
  )
}
