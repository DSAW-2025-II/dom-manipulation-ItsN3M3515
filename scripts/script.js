console.log("JavaScript working!");

// Array para las tareas
let tasks = [
    { id: 1, text: "Ejemplo de tarea", completed: true }
];

// Elementos del DOM
let taskInput;
let addTaskBtn;
let taskTableBody;

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM loaded, initializing app...");

    // Inicializar elementos del DOM
    taskInput = document.getElementById('taskInput');
    addTaskBtn = document.getElementById('addTaskBtn');
    taskTableBody = document.getElementById('taskTableBody');
    
    // Verificar si los elementos existen
    if (!taskInput || !addTaskBtn || !taskTableBody) {
        console.error("No se pudieron encontrar los elementos del DOM requeridos");
        return;
    }
    
    renderTasks();
    setupEventListeners();
});

// Event listeners para los botones
function setupEventListeners() {
    console.log("Configurando los event listeners...");
    
    addTaskBtn.addEventListener('click', addTask);
    
    // Allow adding tasks by pressing Enter
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });
    
    // Use event delegation for dynamically created buttons
    taskTableBody.addEventListener('click', function(e) {
        if (e.target.classList.contains('delete-btn')) {
            deleteTask(e.target);
        } else if (e.target.classList.contains('complete-btn')) {
            toggleTask(e.target);
        }
    });
}

// Añadir tarea
function addTask() {
    console.log("Adding task...");
    
    if (!taskInput) {
        console.error("No se pudo encontrar el elemento de entrada de tarea");
        return;
    }
    
    const taskText = taskInput.value.trim();
    
    if (taskText === '') {
        alert('Por favor, escribe una tarea antes de agregarla.');
        return;
    }
    
    // Crear nueva tarea
    const newTask = {
        id: Date.now(), // Generación simple de ID
        text: taskText,
        completed: false
    };
    
    console.log("Nueva tarea creada:", newTask);

    // Agregar al array de tareas
    tasks.push(newTask);

    // Limpiar entrada
    taskInput.value = '';
    
    // Mostrar tareas
    renderTasks();
}

// Borrar tarea
function deleteTask(button) {
    console.log("Eliminando tarea...");
    
    const row = button.closest('tr');
    const taskId = parseInt(row.dataset.taskId);
    
    console.log("ID de tarea a eliminar:", taskId);
    
    // Eliminar del array de tareas
    tasks = tasks.filter(task => task.id !== taskId);
    
    console.log("Tareas restantes:", tasks);
    
    // Re-render tasks
    renderTasks();
}

// Cambiar estado de tarea
function toggleTask(button) {
    console.log("Cambiando estado de tarea...");

    const row = button.closest('tr');
    const taskId = parseInt(row.dataset.taskId);

    console.log("ID de tarea a cambiar:", taskId);

    // Encontrar tarea y cambiar estado
    const task = tasks.find(task => task.id === taskId);
    if (task) {
        task.completed = !task.completed;
        console.log("Tarea cambiada:", task);
    }

    // Mostrar tareas
    renderTasks();
}

// Mostrar todas las tareas
function renderTasks() {
    console.log("Mostrando tareas:", tasks);

    if (!taskTableBody) {
        console.error("Elemento del cuerpo de la tabla de tareas no encontrado");
        return;
    }

    // Limpiar el cuerpo de la tabla actual
    taskTableBody.innerHTML = '';

    // Agregar cada tarea a la tabla
    tasks.forEach(task => {
        const row = createTaskRow(task);
        taskTableBody.appendChild(row);
    });
    
    // Si no hay tareas
    if (tasks.length === 0) {
        const emptyRow = document.createElement('tr');
        emptyRow.innerHTML = `
            <td colspan="3" style="text-align: center; font-style: italic; opacity: 0.7;">
                No hay tareas. ¡Agrega una nueva tarea!
            </td>
        `;
        taskTableBody.appendChild(emptyRow);
    }
}

// Crear una nueva fila de tarea
function createTaskRow(task) {
    const row = document.createElement('tr');
    row.dataset.taskId = task.id;
    
    const statusText = task.completed ? 'Completada' : 'Pendiente';
    const statusClass = task.completed ? 'completed' : 'pending';
    const taskClass = task.completed ? 'task-completed' : '';
    const toggleButtonText = task.completed ? '↺' : '✓';
    const toggleButtonTitle = task.completed ? 'Marcar como pendiente' : 'Marcar como completada';
    
    row.innerHTML = `
        <td class="${taskClass}">${task.text}</td>
        <td><span class="status ${statusClass}">${statusText}</span></td>
        <td>
            <button class="action-btn complete-btn" title="${toggleButtonTitle}">
                ${toggleButtonText}
            </button>
            <button class="action-btn delete-btn" title="Eliminar tarea">
                ✕
            </button>
        </td>
    `;
    
    return row;
}
