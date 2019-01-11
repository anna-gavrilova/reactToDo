const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");

const API_PORT = 3001;
const app = express();
var cors = require('cors');
const router = express.Router();

const tasksRoute = require("./backend/routes/tasks")

// this is our MongoDB database
const dbRoute = "mongodb://admin:admin1@ds027825.mlab.com:27825/react-to-do";

// connects our back end code with the database
mongoose.connect(
  dbRoute,
  { useNewUrlParser: true }
);

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(cors());

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use("/api/tasks",tasksRoute)

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers',
      'Origin, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept', 'user');
  res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, PATCH, DELETE, OPTIONS');

  next();
});


// append /api for our http requests
//app.use("/api", router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));