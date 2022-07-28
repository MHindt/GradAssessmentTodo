const express = require ('express');
const app = express();
const PORT = 3000;
const server = require('mongoose');
const path = require('path');

const todoController = require('./controllers/todoController.js');
//handling parsing request body
app.use(express.json());

//serving static files
app.use('/', express.static(path.join(__dirname, '../client')));
//connecting to the DB

//this makes the static files show up as well as line 12
app.get('/', (req,res) => {
    res.status(200).sendFile(path.join(__dirname, '../client/index.html'));
});
//this is getting all tasks from the database
app.get('/getAllTasks', todoController.getAllTasks, (req, res) => {
    res.status(200).send( res.locals.tasks )
});
//post request to add task to the DB
app.post('/addTask', todoController.addTodo, (req, res) => {
    console.log('inside of addTask---->');
    res.status(200).send( res.locals.todo );
});
//delete task from the todo list
app.delete('/task/:_id', todoController.deleteTask, (req, res) => {
    console.log('inside of delete task ---');
    res.sendStatus(200);
});

// Unknown route handler
app.use('*',(req, res) => res.sendStatus(404));
//express.static middleware to serve up static files

//connect to the DB
server.connect(mongoURI, { dbName: 'GradAssessmentToDo', useNewUrlParser: true,
useUnifiedTopology: true }).then (() => console.log('connected to DB'));
//connect to the server 
app.listen(PORT, console.log('listening on port 3000'));