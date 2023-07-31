// Retrieve tasks from local storage or create an empty array if none exists
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Function to add a new task to the list
function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();

    if (taskText === "") return;

    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false,
    };

    tasks.push(newTask);
    taskInput.value = "";

    renderTasks();
    saveTasksToLocalStorage();
}

// Function to delete a task
function deleteTask(id) {
    tasks = tasks.filter((task) => task.id !== id);
    renderTasks();
    saveTasksToLocalStorage();
}

// Function to toggle the completed state of a task
function toggleTaskCompletion(id) {
    tasks = tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
    );
    renderTasks();
    saveTasksToLocalStorage();
}

// Function to render the list of tasks
function renderTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach((task) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <input type="checkbox" onclick="toggleTaskCompletion(${task.id})" ${task.completed ? "checked" : ""}>
            <span class="task ${task.completed ? "completed" : ""}">${task.text}</span>
            <button onclick="deleteTask(${task.id})">Delete</button>
        `;
        taskList.appendChild(li);
    });

    const remainingTasks = document.getElementById("remainingTasks");
    const remainingCount = tasks.filter((task) => !task.completed).length;
    remainingTasks.textContent = `${remainingCount} task${remainingCount === 1 ? "" : "s"} remaining`;
}

// Function to save tasks to local storage
function saveTasksToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Render the initial list of tasks
renderTasks();
