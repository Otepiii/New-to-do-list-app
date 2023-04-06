//DOM elements
const todoForm = document.querySelector("#todo-form");
const todoList = document.querySelector(".todos");
const totalTask = document.querySelector(".total-tasks");
const remainingTask = document.querySelector(".remaining-tasks");
const completedTasks = document.querySelector(".completed-tasks");
const mainInput = document.querySelector("#todo-form input");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

if (localStorage.getItem("tasks")) {
    tasks.map((task) => {
        createTask(task)
    })
}

todoForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const inputValue = mainInput.value
    
    if (inputValue == "") {
        return
    }

    const task = {
        id: new Date().getTime(),
        name: inputValue,
        isCompleted: false
    }

    tasks.push(task)
    localStorage.setItem("tasks", JSON.stringify(tasks))

    createTask(task)

    todoForm.reset()
    mainInput.focus()
})


todoList.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-task")) {
        const taskId = e.target.closest("li").id

        removeTask(taskId)
    }

})

todoList.addEventListener("input", (e) => {
    const taskId = e.target.closest("li").id

    updateTask(taskId, e.target)
})


function createTask(task) {
    const taskEl = document.createElement('li')

    taskEl.setAttribute('id', task.id)

    if (task.isCompleted) {
        taskEl.classList.add("complete")
    }

    const taskElMarkup = `
                             <div>
                                    <input type="checkbox"
                                       name="tasks"
                                       id="${task.id}" ${task.isCompleted ? "checked" : ""}>
                                <span ${!task.isCompleted ? "contenteditable" : ""}>${task.name}</span>
                            </div>
                            <button class="remove-task"
                                    title="Remove the task "${task.name}" task">
                                    &#10006
                            </button>
    `

    taskEl.innerHTML = taskElMarkup;

    todoList.appendChild(taskEl)

    countTasks()

}

function countTasks() {
    const completedTasksArray = tasks.filter((task) => {
        task.isCompleted === true
    })


    totalTask.textContent = tasks.length 
    completedTasks.textContent = completedTasksArray.length
    remainingTask.textContent = tasks.length - completedTasksArray.length
}

function removeTask(taskId) {
    tasks = tasks.filter((task) => 
        task.id !== parseInt(taskId))

    localStorage.setItem('tasks', JSON.stringify(tasks))

    document.getElementById(taskId).remove()

    countTasks()
    
}

function updateTask(taskId, el) {
    const task = tasks.find((task))
}