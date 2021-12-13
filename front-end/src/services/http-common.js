import axios from "axios";

// var token = localStorage.getItem("token");

export default axios.create({
  baseURL: "http://localhost:3000/api/",
  headers: {
    "Content-type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGVjayI6dHJ1ZSwiaWF0IjoxNjM5MzcyMzY0LCJleHAiOjE2MzkzNzU5NjR9.d5McsAkxWbSnIIbfWxxF-A26eGTdqphTLOkwrlEIKeU",
  },
});
