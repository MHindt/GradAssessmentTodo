
//this makes the window reload after any changes 
window.addEventListener('DOMContentLoaded', (e) => {
    getAllTasks();
})
const body = document.querySelector('#root');

//giving body a className
body.classList.add('container')
//creating a div

const container = document.createElement('div');
//attaching div to the body of document
body.appendChild(container);
//container.innerText = "Todo List";

container.classList.add('todo_list');
const header = document.createElement('div');
container.appendChild(header);
header.setAttribute('className', 'header');

const header1 = document.createElement('h1');
container.appendChild(header1);
header1.innerText = 'ToDo List';

const list = document.createElement('div');
container.appendChild(list);
list.classList.add('list');
const ul = document.createElement('ul');
list.appendChild(ul);

const form = document.createElement('form');
container.appendChild(form);
form.setAttribute('className', 'add-task');

const input = document.createElement('input');
input.setAttribute('type', 'text');
form.appendChild(input);

const addButton = document.createElement('button');
form.appendChild(addButton);
addButton.innerText = 'Add';
addButton.setAttribute('type', 'submit');

// const deleteButton = document.createElement('button');
// container.appendChild(deleteButton);
// deleteButton.innerText = 'Done';

//arry to hold all tasks and display on screen 
let taskArr = [];
//function to get all tasks from the DB

function getAllTasks () {
    fetch('/getAllTasks')
    .then(resp => resp.json())
    .then((data) => {
        console.log('inside of getAllTasks index.js data----->', data);
        taskArr.push(...data);
        console.log('taskArr after pushing data---->', taskArr);
        displayTasks(taskArr);
    })
}
function displayTasks (todoArr) {
    ul.innerText = ''
      todoArr.forEach((task) => {
        //creating li 
        let newTask = document.createElement('li');
        //creating a span to hold the the task
        let todoHolder = document.createElement('span');
        //appending li to ul
        ul.appendChild(newTask);
        //appending the span to the li
        newTask.appendChild(todoHolder);
        //displaying the task in the span
        todoHolder.innerText = task.task;
        //create an anchor to the span
        let deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        //append the deletebutton to the li 
        newTask.appendChild(deleteButton);
        deleteButton.classList.add('delete');
        deleteButton.setAttribute('id', task._id)
        //adding an event listner to the delete button
        deleteButton.addEventListener('click', (e) =>   deleteTask(e))
        //adding an button for modifing the task
        const modifyButton = document.createElement('button');
        modifyButton.setAttribute('id', 'popup');
        newTask.appendChild(modifyButton);
        modifyButton.innerText = 'Modify';
        //adding an event listner to the modify button
        modifyButton.addEventListener('click', (e) => {

        })


      })

}
function deleteTask(e) {
    //console.dir( e.target.parentElement.firstChild)
    //getting task 
    //console.log('e.target----->', e.target);
    //console.dir(e.target);
    let task_id = e.target.id;
    //console.log('inside of deleteTask task ----->', task_id);
    fetch(`/task/${task_id}`, {
        method: 'DELETE'
    })
    .then((res) => {
        console.log(res)})
    .then(data => console.log('inside of deleteTask data --->', data))
    .catch(err => console.log('error inside of deleteTask', err))
    //getting task index 
    // let taskIndex = taskArr.indexOf(task_id);
    // //checking that the task is in the array
    // if(taskIndex !== -1) {
    //     taskArr.splice(taskIndex);
    // }
     window.location.reload();
}

function addTask(task) {
    
  fetch('/addTask', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify( {task} )
  })
    .then((res) =>  res.json())
    .then((data) => {
      console.log('inside of fetch post this is data--->', data.task);
      window.location.reload();
      
    })
    .catch((err) => console.log('error in addTask'));
}

//creating an eventListner on the addButton
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const task = input.value;
  console.log('task----->', task);
  addTask(task);
  form.reset();
});
//