const express = require("express");
const bodyParser = require('body-parser')

// load environment variables
require('dotenv').config()

// test
console.log(process.env.BASE_URI);

// Import the mongoose module
const mongoose = require("mongoose");

// Set up default mongoose connection
const mongoDB = "mongodb://127.0.0.1/motorBikes";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

// Get the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Create webserver
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const notesRouter = require("./routers/notesRouter");

// Create route /
app.use("/notes", notesRouter);


// Start webserver on port 8000
app.listen(8000, () => {
    console.log("Express Started");
})

