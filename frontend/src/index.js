import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
const dotenv = require("dotenv");
dotenv.config();

// Importing the Bootstrap CSS

axios.defaults.withCredentials = true;
axios.defaults.baseURL = (process.env.REACT_ENV === 'development') ? "http://localhost:8000" : "https://expertire.herokuapp.com/";

ReactDOM.render(<App />, document.getElementById("root"));
