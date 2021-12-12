import axios from "axios";

// var token = localStorage.getItem("token");

export default axios.create({
  baseURL: "http://localhost:3000/api/",
  headers: {
    "Content-type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGVjayI6dHJ1ZSwiaWF0IjoxNjM5MjAxMjA5LCJleHAiOjE2MzkyMDQ4MDl9.XCHjBASywRQ4vEY44np2aFYpGhDJv39rzKoSuEmZCLI",
  },
});
