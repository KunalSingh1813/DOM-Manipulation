function LoadTodos() {
  //This function will load the todos from the browser
  const todos = JSON.parse(localStorage.getItem("todos")) || { todoList: [] };
  console.log(todos);
  return todos;
}

function addTodoToLocalStorage(todoText) {
  const todos = LoadTodos();
  todos.todoList.push(todoText);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function appendTodoInHTML(todotext) {
  const todoList = document.getElementById("todolist");
  const todoItem = document.createElement("li");

  todoItem.textContent = todotext;
  todoItem.classList.add("todoItem");

  //creating edit button
  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.classList.add("editBtn");

  //creating delete button
  const DeleteBtn = document.createElement("button");
  DeleteBtn.textContent = "Delete";
  DeleteBtn.classList.add("DeleteBtn");

  //Creating completed button
  const completedBtn = document.createElement("button");
  completedBtn.textContent = "Completed";
  completedBtn.classList.add("completedBtn");

  //Appending todo and buttons to todoItem
  todoItem.appendChild(editBtn);
  todoItem.appendChild(DeleteBtn);
  todoItem.appendChild(completedBtn);

  todoList.appendChild(todoItem);
}

document.addEventListener("DOMContentLoaded", () => {
  const todoInput = document.getElementById("todoInput");

  const submitBtn = document.getElementById("addTodo");

  const todoList = document.getElementById("todolist");

  submitBtn.addEventListener("click", (event) => {
    const todoText = todoInput.value;
    if (todoText == "") {
      alert("Please write something for the todo");
    } else {
      addTodoToLocalStorage(todoText);
      appendTodoInHTML(todoText);
      todoInput.value = "";
    }
  });

  todoInput.addEventListener("change", (event) => {
    //This callback method is fired everytime there is a change in the input tag
    const todoText = event.target.value;
    event.target.value = todoText.trim();
  });

  const todos = LoadTodos();
  todos.todoList.forEach((todo) => {
    const newTodoItem = document.createElement("li");
    newTodoItem.textContent = todo;
    todoList.appendChild(newTodoItem);
  });
});

console.log("JS Loaded");
