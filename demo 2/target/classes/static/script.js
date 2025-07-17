const API_URL = "http://localhost:8085/api/todos";

const form = document.getElementById("todo-form");
const taskInput = document.getElementById("new-task");
const taskList = document.getElementById("task-list");

form.addEventListener("submit", async function (e) {
  e.preventDefault();
  const taskText = taskInput.value.trim();

  if (taskText !== "") {
    const newTask = {
      title: taskText,
      completed: false
    };

    // Сохраняем в базу через API
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newTask)
    });

    const savedTask = await response.json();
    addTaskToList(savedTask);

    taskInput.value = "";
  }
});

function addTaskToList(task) {
  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = task.title;
  span.classList.add("task-text");

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "✖";
  deleteBtn.classList.add("delete-btn");

  deleteBtn.onclick = async () => {
    await fetch(`${API_URL}/${task.id}`, { method: "DELETE" });
    li.remove();
  };

  li.appendChild(span);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

// Загрузка задач с сервера при запуске
window.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch(API_URL);
  const tasks = await response.json();
  tasks.forEach(addTaskToList);
});
