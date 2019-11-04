var express = require('express');
var todoController = require('./controllers/todocontroller');
//var todoList = require('./assets/todo-list');

var app = express();

//set up template engine
app.set('view engine', 'ejs');

//static files
app.use(express.static('./assets'));

//fire controllers
todoController(app);

//todoList();

//listen to port
app.listen(5000);
console.log('You are listening to port 5000');
