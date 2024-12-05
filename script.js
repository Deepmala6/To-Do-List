// Select Elements
const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');
const filterTasks = document.getElementById('filterTasks');
const clearCompletedButton = document.getElementById('clearCompletedButton');
const searchTasks = document.getElementById('searchTasks');

// Task Array for Storage
let tasks = [];

// Add Task
addTaskButton.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }
    const task = { text: taskText, completed: false, priority: 'Low' };
    tasks.push(task);
    taskInput.value = '';
    renderTasks();
});

// Render Tasks
function renderTasks(filter = 'all') {
    taskList.innerHTML = '';
    const filteredTasks = tasks.filter(task => {
        if (filter === 'active') return !task.completed;
        if (filter === 'completed') return task.completed;
        return true;
    });
    filteredTasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.className = `task-item ${task.completed ? 'completed' : ''}`;
        taskItem.innerHTML = `
            <span>${task.text}</span>
            <div>
                <button class="edit" onclick="editTask(${index})">Edit</button>
                <button class="delete" onclick="deleteTask(${index})">Delete</button>
                <button onclick="toggleComplete(${index})">${task.completed ? 'Undo' : 'Complete'}</button>
            </div>
        `;
        taskList.appendChild(taskItem);
    });
}

// Toggle Complete
function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks(filterTasks.value);
}

// Delete Task
function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks(filterTasks.value);
}

// Edit Task
function editTask(index) {
    const newTask = prompt('Edit your task:', tasks[index].text);
    if (newTask !== null) {
        tasks[index].text = newTask.trim();
        renderTasks(filterTasks.value);
    }
}

// Filter Tasks
filterTasks.addEventListener('change', () => {
    renderTasks(filterTasks.value);
});

// Clear Completed Tasks
clearCompletedButton.addEventListener('click', () => {
    tasks = tasks.filter(task => !task.completed);
    renderTasks();
});

// Search Tasks
searchTasks.addEventListener('input', () => {
    const query = searchTasks.value.toLowerCase();
    const filteredTasks = tasks.filter(task => task.text.toLowerCase().includes(query));
    renderTasks('all');
    taskList.innerHTML = '';
    filteredTasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.className = `task-item ${task.completed ? 'completed' : ''}`;
        taskItem.innerHTML = `
            <span>${task.text}</span>
        `;
        taskList.appendChild(taskItem);
    });
});
