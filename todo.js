const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    task: {
        type: String,
        required: [true, 'You must enter a task']
        
    }
});

const Todo = mongoose.model('Todo', todoSchema);
module.exports = Todo;