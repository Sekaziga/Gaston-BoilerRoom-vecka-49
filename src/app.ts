interface Task {
    id: number;
    description: string;
    completed: boolean;
}

// Task list array
let tasks: Task[] = [];

// Get DOM elements
const taskInput = document.getElementById('taskInput') as HTMLInputElement;
const addTaskButton = document.getElementById('addTaskButton') as HTMLButtonElement;
const taskList = document.getElementById('taskList') as HTMLUListElement;

// Function to add a task
function addTask(description: string): void {
    const newTask: Task = {
        id: Date.now(),
        description,
        completed: false,
    };
    tasks.push(newTask);
    renderTasks();
}

// Function to render tasks
function renderTasks(): void {
    taskList.innerHTML = ''; // Clear the list
    tasks.forEach((task) => {
        const li = document.createElement('li');
        li.textContent = task.description;
        li.style.textDecoration = task.completed ? 'line-through' : 'none';

        // Toggle completion
        li.addEventListener('click', () => {
            toggleTaskCompletion(task.id);
        });

        // Delete task
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            deleteTask(task.id);
        });

        li.appendChild(deleteButton);
        taskList.appendChild(li);
    });
}

// Function to toggle task completion
function toggleTaskCompletion(id: number): void {
    tasks = tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
    );
    renderTasks();
}

// Function to delete a task
function deleteTask(id: number): void {
    tasks = tasks.filter((task) => task.id !== id);
    renderTasks();
}

// Event listener for adding a task
addTaskButton.addEventListener('click', () => {
    const description = taskInput.value.trim();
    if (description) {
        addTask(description);
        taskInput.value = ''; // Clear input
    }
});
