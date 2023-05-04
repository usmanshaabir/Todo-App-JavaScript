// Current Date
init()
function init(){
    let getdata=JSON.parse(window.localStorage.getItem("users")) || []
    let tableStarting = `<table class="table">`
    let tableEnd = `</table>`
    let tableHead = ` <thead><tr><th scope="col">#</th> <th scope="col">Title</th><th scope="col">Location</th><th scope="col">Description</th><th scope="col">Actions</th></tr></thead>`;
    let tBody='';
    for (i = 0; i < getdata.length; i++) {
        let DataStore = getdata[i]
        tBody += `<tbody><tr><th scope="row">${i + 1}</th><td>${DataStore.title}</td><td>${DataStore.location}</td>  <td>${DataStore.description}</td> <td><button type="button" class="btn btn-primary" onclick='etidData(event)' data-value="${DataStore.id}">Edit</button> <button type="button" class="btn btn-danger" data-value="${DataStore.id}" onclick='deleteData(event)'>Delete</button></td><td></td>`

    }
    let allTableShow = tableStarting + tableHead + tBody + tableEnd;
    document.getElementById('outPut').innerHTML = allTableShow

}
let today = new Date();
document.getElementById('Today').innerHTML = today


function showToast(text) {
    Toastify({
      text: text,
      duration: 3000,
      destination: "https://github.com/apvarun/toastify-js",
      newWindow: true,
      close: true,
      gravity: "bottom", // `top` or `bottom`
      position: "left", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "linear-gradient(to right, #A71D31 ,#3F0D12)",
      },
      onClick: function(){} // Callback after click
    }).showToast(text);
  }
  


function getRandomId() {
    return Math.random().toString(36).slice(2)
}

emptyFlied = () => {
    document.getElementById('title').value = '';
    document.getElementById('location').value = '';
    document.getElementById('description').value = '';
}


// data store
function handleSubmit() {
    event.preventDefault()


    let title = document.getElementById('title').value;
    let location = document.getElementById('location').value;
    let description = document.getElementById('description').value;

    title = title.trim()
    location = location.trim()
    description = description.trim()

    if (title.length < 3) {
        showToast("Plz Enter Your Full Name");
        return
    }
    if (location.length < 3) {
        showToast("Plz Enter Your Location");
        return
    }
    if (description.length < 3) {
        showToast("Plz Enter Your Description");
        return
    }

    let objects = { title, location, description };

    objects.id = getRandomId();
    objects.date = new Date().getTime();
    objects.status = 'Active';

    const todos = JSON.parse(localStorage.getItem('users')) || []

    todos.push(objects);

    localStorage.setItem('users', JSON.stringify(todos))

    showToast("Your Data submited Success")

    emptyFlied()
    showData()

}

showData = () => {

    const todos = JSON.parse(localStorage.getItem('users')) || []
    console.log(todos)
    if (!todos.length) {
        document.getElementById('outPut').innerHTML = `<h1 style=text-align:center;>HURRAY! Add a task button to add your task<h1>`;
        return
    }

    let tableStarting = `<table class="table">`
    let tableEnd = `</table>`
    let tableHead = ` <thead><tr><th scope="col">#</th> <th scope="col">Title</th><th scope="col">Location</th><th scope="col">Description</th><th scope="col">Actions</th></tr></thead>`;
    let tBody = ""

    for (i = 0; i < todos.length; i++) {
        let DataStore = todos[i]
        tBody += `<tbody><tr><th scope="row">${i + 1}</th><td>${DataStore.title}</td><td>${DataStore.location}</td>  <td>${DataStore.description}</td> <td><button type="button" class="btn btn-primary" onclick='etidData(event)' data-value="${DataStore.id}">Edit</button> <button type="button" class="btn btn-danger" data-value="${DataStore.id}" onclick='deleteData(event)'>Delete</button></td><td></td>`

    }

    let allTableShow = tableStarting + tableHead + tBody + tableEnd;
    document.getElementById('outPut').innerHTML = allTableShow

}

deleteData = (event) => {
    let todoId = event.target.getAttribute('data-value');

    let getTodosItem = JSON.parse(localStorage.getItem('users'))

    let afterDeletetodos = getTodosItem.filter((user) => {
        return user.id !== todoId
    })
    localStorage.setItem('users', JSON.stringify(afterDeletetodos))
    showData()
}


etidData = (event) => {

    let currentId = event.target.getAttribute('data-value');

    let getTodoesItem = JSON.parse(localStorage.getItem('users'))

    let afterEditTodos = getTodoesItem.find((user, index) => {
        return user.id === currentId
    })

    const { title, location, description } = afterEditTodos;

    document.getElementById('title').value = title;
    document.getElementById('location').value = location;
    document.getElementById('description').value = description;


    localStorage.setItem('todoForEited', JSON.stringify(afterEditTodos))
    document.getElementById('addTask').style.display = 'none';
    document.getElementById('updateTask').style.display = 'block';


}

var startTime = new Date();
var timerElement = document.getElementById("Today");

function updateTimer() {
  var currentTime = new Date(); 
  timerElement.innerHTML = currentTime; 
}
setInterval(updateTimer, 1000);