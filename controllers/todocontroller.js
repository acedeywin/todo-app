var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//connect to database
mongoose.connect('mongodb://test:test123@ds247191.mlab.com:47191/todo-app', { useNewUrlParser: true });

//create a schema  - this is like a blueprint
var todoSchema = new mongoose.Schema({
  item: String
});

//create a todo model
var Todo = mongoose.model('Todo', todoSchema);

//var data = [{item: 'get milk'}, {item: 'learn node'}, {item: 'learn react'}];
var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app){

  app.get('/todo', function(req, res){
    //get data from mongodb and pass to the view
    Todo.find({}, function(err, data){
      if(err) throw err;
      res.render('todo', {todos: data});
    });
  });

  app.post('/todo', urlencodedParser, function(req, res){
    //get data from the view and add it to mongodb
    var newTodo = Todo(req.body).save(function(err, data){
      if(err) throw err;
      res.json(data);
    });
  });

  app.delete('/todo/:item', function(req, res){
    //delete the requested item from mongodb
    Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
      if(err)throw err;
      res.json(data);
    });
  });

}
