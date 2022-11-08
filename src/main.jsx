import React from 'react'
import ReactDOM from 'react-dom/client'
import Index from "./routes/index"
import ErrorPage from "./routes/error-page"
import Game from './routes/game'
import Leaderboard from './routes/leaderboard'
import { Route, BrowserRouter, Routes } from "react-router-dom"
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index/>}>
          <Route index element={<Game/>}/>
          <Route path="leaderboard" element={<Leaderboard/>}/>
          <Route path="*" element={<ErrorPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
