//1. set up a node app with command: npm init
//2. install express with command: npm install express
//3. create a file named server.js

const { dir } = require("console");
const express = require("express");
const app = express();
const port = 3000;

// handlebars is a view engine for express. most up to date
const hbs = require("express-handlebars");

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// the path module is used to work with file and directory paths
const path = require("path");

// serve static files from the "static" directory
app.use(express.static(path.join(__dirname, "static")));

// generate route here
app.get("/", (req, res) => {
    // sendFile is used to send a file as a response
    let filePath = path.join(__dirname, "static", "homepage.html");
    res.sendFile(filePath);
});

// rendering templates

app.get("/home", (req, res) =>{
    res.render("home", {title: "My Website's Homepage"})
});

app.get("/about", (req, res) => {
    let filePath = path.join(__dirname, "static", "about.html");
    res.sendFile(filePath);
});

// app.get("/images/image1.jpg", (req, res) => {
//   let filePath = path.join (__dirname, "static", "images", "image1njpg");
// res.sendFile(filePath);
// });

app.listen(port, () => {
    console.log(`Example app listening att http://localhost:${port}`);
});