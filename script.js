const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Display tasks
function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task.text;

    if (task.completed) li.classList.add("completed");

    li.addEventListener("click", () => toggleTask(index));

    const delBtn = document.createElement("button");
    delBtn.textContent = "X";
    delBtn.classList.add("delete");
    delBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      deleteTask(index);
    });

    li.appendChild(delBtn);
    taskList.appendChild(li);
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Add task
function addTask() {
  const text = taskInput.value.trim();
  if (text === "") return;
  tasks.push({ text, completed: false });
  taskInput.value = "";
  renderTasks();
}

// Toggle task (complete/incomplete)
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

// Delete task
function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

// Initial render
renderTasks();
