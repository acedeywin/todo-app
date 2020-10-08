var express = require("express");
var todoController = require("./controllers/todocontroller");
//var todoList = require('./assets/todo-list');

var app = express();

//set up template engine
app.set("view engine", "ejs");

//static files
app.use(express.static("./assets"));

//fire controllers
todoController(app);

//todoList();

//listen to port
let port = process.env.PORT;
if (port == null || port == "") {
  port = 4001;
}
app.listen(port);
console.log("Listening on port 4001...");
