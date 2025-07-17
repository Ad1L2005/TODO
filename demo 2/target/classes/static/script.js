document.getElementById("todo-form").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const taskInput = document.getElementById("new-task");
    const taskText = taskInput.value.trim();
  
    if (taskText !== "") {
      const li = document.createElement("li");
  
      // Текст задачи
      const span = document.createElement("span");
      span.textContent = taskText;
      span.classList.add("task-text");
  
      // Кнопка удаления
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "✖";
      deleteBtn.classList.add("delete-btn");
      deleteBtn.onclick = () => li.remove();
  
      // Добавляем элементы
      li.appendChild(span);
      li.appendChild(deleteBtn);
      document.getElementById("task-list").appendChild(li);
  
      taskInput.value = "";
    }
  });
  