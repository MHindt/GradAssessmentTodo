const Todo = require('../models/todo.js');

const todoController = {};

todoController.getAllTasks = async (req, res, next) => {
  try {
    const tasks  = await Todo.find();
    console.log('tasks inside of todoController get all tasks----->', tasks)
    res.locals.tasks = tasks
  } catch(err) {
    console.log('did not get the tasks ', err);
  }
  return next();
}

todoController.addTodo = async (req, res, next) => {
  console.log('req.body---->', req.body);
  try {
    const todo = await Todo.create(req.body);
    console.log('todo inside of await', todo);
    //res.json(todo);
    res.locals.todo = todo;
    console.log('res.locals.tod----->', res.locals.todo);
  } catch (err) {
    console.log('did not add task', err);
  }
  return next();
};

todoController.deleteTask = async (req, res, next) => {
  const { _id } = req.params;
  console.log('id inside of deleteTask---->', _id);
  console.log('req.body----->', req.params);
  

  try {
    const deleteTodo = await Todo.deleteOne( req.params );
  }
  catch(err) {
    console.log('error in todoController deleteTask', err)
  }
  return next();
}
module.exports = todoController;
