// Note: Path is a built in module, dont even need to run npm install
const path = require("path");
const express = require("express");

const clientPath = path.join(__dirname, "/../client");
const port = process.env.PORT || 3000;


// console.log(__dirname + "\\..\\client");

// console.log(clientPath);

var app = express();

// use serves up middleware, and express.static is built in middleware that allows use to serve up
// static files like html, css, and javascript
app.use(express.static(clientPath));

// app.get("/", (req, res) => {

// });


app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
});