//1. set up a node app with command: npm init
//2. install express with command: npm install express
//3. create a file named server.js

const { dir } = require("console");
const express = require("express");
const app = express();
const port = 3000;

// handlebars is a view engine for express. most up to date
const hbs = require("express-handlebars");

app.engine("handlebars", hbs.engine());
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
const directory = require("./data/directory.json");

app.get("/api/items", (req, res) => {
    res.send("this is a get response from /api/items");
});

app.post("/api/items", (req, res) => {
    res.send("this is a post response from /api/items");
});

app.put("/api/items/:id", (req, res) => {
    res.send("this is a put response from /api/items");
});

app.delete("/api/items/:id", (req, res) => {
    res.send("this is a delete response from /api/items");
});

app.get("/directory", (req,res) => {
    res.render("directory", { people: directory });
});

app.get("/person/add", (req,res) => {
    console.log(req.params);
    console.log(req.query);
    directory.push({
        id: parseInt(req.query.id),
        first_name: req.query.first_name,
        last_name: req.query.last_name,
        email: req.query.email,
        address: req.query.address,
        city: req.query.city,
        state: req.query.state,
        zip: req.query.zip,
    });
    res.send("add-person");
});

app.get("/directory/:id", (req,res) => {
    const id = req.params.id;
    console.log(id);
    let person = directory.find((p) => p.id == id);
    res.render("person", { person: person, title: person.first_name + "" + person.last_name});
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

