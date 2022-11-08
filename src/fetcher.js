const baseURL = "https://larspeterjoergensen.com/CA-2/api/"

function getLeaderboard() {
  return fetchURL(baseURL+"info/highscores/")
}

function login(username, password) {
  const data = {
    "username": username,
    "password": password
  }
  return fetchURL(baseURL+"user/login", dataFactory("POST", data))
}

function createUser(username, password) {
  const data = {
    "username": username,
    "password": password
  }
  return fetchURL(baseURL+"user/create", dataFactory("POST", data))
}

function getJokes() {
  return fetchURL(baseURL+"jokes")
}

function sendAnswer(token, isCorrect) {
  const data = {
    "x-access-token": token,
    "isCorrect": isCorrect
  }
  return fetchURL(baseURL+"info", dataFactory("PUT", data))
}

function fetchURL(URL, data) {
  if (!data) data = dataFactory("GET")
  return fetch(URL, data)
    .then((response) => response.json())
    .then((data) => {return data})
}

function dataFactory(method, body) {
  const dataobj = {
    "method": method,
    "headers": {
      "Content-Type": "application/json"
    },
    "body": JSON.stringify(body)
  }
  return dataobj
}

const methods = {
  getLeaderboard,
  login,
  createUser,
  getJokes,
  sendAnswer
}

export default methods