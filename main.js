const listElement = document.querySelector(".app ul");
const inputElement = document.querySelector("#todoInput");
const btnElement = document.querySelector("#todoAdd");

const todos = JSON.parse(localStorage.getItem("list_todos")) || [];

function renderTodos() {
  listElement.innerHTML = "";

  for (todo of todos) {
    const todoElement = document.createElement("li");
    todoElement.setAttribute("class", "list-group-item");
    const todoText = document.createTextNode(todo);

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", "#");

    // const checkElement = document.createElement("input");
    // checkElement.setAttribute("type", "checkbox");

    const pos = todos.indexOf(todo);
    linkElement.setAttribute("onclick", "deleteTodo(" + pos + ")");

    const trashTask = document.createElement("i");
    trashTask.setAttribute("class", "far fa-trash-alt");

    todoElement.appendChild(todoText);
    todoElement.appendChild(linkElement);
    // todoElement.appendChild(checkElement);
    linkElement.appendChild(trashTask);

    listElement.appendChild(todoElement);
  }
}

renderTodos();

function addTodo() {
  if (inputElement.value === "") {
    return alert("How about writing a challenge? :)");
  } else {
    const todoText = inputElement.value;
    todos.push(todoText);

    inputElement.value = "";
    renderTodos();
    saveToStorage();
  }
}

btnElement.onclick = addTodo;

function deleteTodo(pos) {
  const confirmation = confirm("Delete to do?");

  if (confirmation == true) {
    todos.splice(pos, 1);
  } else {
    renderTodos();
  }

  renderTodos();
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem("list_todos", JSON.stringify(todos));
}
