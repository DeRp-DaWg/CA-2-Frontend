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
  const body = {
    "isCorrect": isCorrect
  }
  
  const header = {
    "x-access-token": token
  }
  return fetchURL(baseURL+"info", dataFactory("PUT", body, header))
}

function fetchURL(URL, data) {
  if (!data) data = dataFactory("GET")
  return fetch(URL, data)
    .then((response) => response.json())
    .then((data) => {return data})
}

function dataFactory(method, body, headers) {
  if (headers == null) {
    headers = {}
  }
  const dataobj = {
    "method": method,
    "headers": headers,
    "body": JSON.stringify(body)
  }
  dataobj["headers"]["Content-Type"] = "application/json"
  //dataobj["headers"] = JSON.stringify(dataobj["headers"])
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