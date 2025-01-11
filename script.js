function LoadTodos() {
  //This function will load the todos from the browser
  const todos = JSON.parse(localStorage.getItem("todos")) || { todoList: [] };
  console.log(todos);
  return todos;
}

function refreshTodos(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function addTodoToLocalStorage(todo) {
  const todos = LoadTodos();
  todos.todoList.push({ ...todo, id: todos.todoList.length });
  localStorage.setItem("todos", JSON.stringify(todos));
}

function appendTodoInHTML(todo) {
  const todoList = document.getElementById("todolist");
  const todoItem = document.createElement("li");
  todoItem.setAttribute("data-id", todo.id);
  const textDiv = document.createElement("div");
  if (todo.isCompleted) {
    textDiv.classList.add("completed");
  }

  textDiv.textContent = todo.text;
  todoItem.classList.add("todoItem");

  const wrapperDiv = document.createElement("div");
  wrapperDiv.classList.add("todoButtons");

  //creating edit button
  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.classList.add("editBtn");
  editBtn.addEventListener("click", editTodo);

  //creating delete button
  const DeleteBtn = document.createElement("button");
  DeleteBtn.textContent = "Delete";
  DeleteBtn.classList.add("deleteBtn");
  DeleteBtn.addEventListener("click", deletetodo);

  //Creating completed button
  const completedBtn = document.createElement("button");
  completedBtn.textContent = todo.isCompleted ? "Reset" : "Completed";
  completedBtn.classList.add("completedBtn");
  completedBtn.addEventListener("click", toggleTodo);
  //Appending todo and buttons to todoItem
  wrapperDiv.appendChild(editBtn);
  wrapperDiv.appendChild(DeleteBtn);
  wrapperDiv.appendChild(completedBtn);
  todoItem.appendChild(textDiv);
  todoItem.appendChild(wrapperDiv);
  todoList.appendChild(todoItem);
}

function resetTodoInHTML(todos) {
  const todoList = document.getElementById("todolist");
  todoList.innerHTML = "";
  todos.todoList.forEach((todo) => {
    appendTodoInHTML(todo);
  });
}
function toggleTodo(event) {
  const todoItem = event.target.parentElement.parentElement;
  const todoid = todoItem.getAttribute("data-id");
  const todos = LoadTodos();

  todos.todoList.forEach((todo) => {
    if (todo.id == todoid) {
      todo.isCompleted = !todo.isCompleted;
    }
  });
  refreshTodos(todos);
  resetTodoInHTML(todos);
}

function deletetodo(event) {
  const todoItem = event.target.parentElement.parentElement;
  const todoid = Number(todoItem.getAttribute("data-id"));
  let todos = LoadTodos();

  todos.todoList = todos.todoList.filter((todo) => todo.id != todoid);
  refreshTodos(todos);
  resetTodoInHTML(todos);
}

function editTodo(event) {
  const todoItem = event.target.parentElement.parentElement;
  const todoid = Number(todoItem.getAttribute("data-id"));
  let todos = LoadTodos();
  const response = prompt("What is the new todo value you want to set?");
  const todo = todos.todoList.find((todo) => todo.id === todoid);

  if (todo && response !== null) {
    todo.text = response;
  }
  refreshTodos(todos);
  resetTodoInHTML(todos);
}
function addNewTodo() {
  const todoText = todoInput.value;
  if (todoText == "") {
    alert("Please write something for the todo");
  } else {
    todos = LoadTodos();
    const id = todos.todoList.length;
    addTodoToLocalStorage({
      text: todoText,
      isCompleted: false,
      id: id,
    });
    appendTodoInHTML({
      text: todoText,
      isCompleted: false,
      id,
    });
    todoInput.value = "";
  }
}

function executeFilterAction(event) {
  const element = event.target;
  const value = element.getAttribute("data-filter");
  const todoList = document.getElementById("todolist");
  const todos = LoadTodos();
  todoList.innerHTML = "";
  if (value == "all") {
    todos.todoList.forEach((todo) => {
      appendTodoInHTML(todo);
    });
  } else if (value == "pending") {
    todos.todoList.forEach((todo) => {
      if (!todo.isCompleted) {
        appendTodoInHTML(todo);
      }
    });
  } else if (value == "completed") {
    todos.todoList.forEach((todo) => {
      if (todo.isCompleted) {
        appendTodoInHTML(todo);
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const todoInput = document.getElementById("todoInput");

  const submitBtn = document.getElementById("addTodo");

  // const todoList = document.getElementById("todolist");

  // let todos = LoadTodos();

  const filterBtns = document.getElementsByClassName("filterBtn");
  console.log(filterBtns);

  ///filter buttons functionality
  for (const btn of filterBtns) {
    btn.addEventListener("click", executeFilterAction);
  }

  submitBtn.addEventListener("click", addNewTodo);

  todoInput.addEventListener("change", (event) => {
    //This callback method is fired everytime there is a change in the input tag
    const todoText = event.target.value;
    event.target.value = todoText.trim();
  });

  todos.todoList.forEach((todo) => {
    appendTodoInHTML(todo);
  });

  document.addEventListener("keypress", (event) => {
    if (event.code == "Enter") {
      addNewTodo();
    }
  });
});

console.log("JS Loaded");
