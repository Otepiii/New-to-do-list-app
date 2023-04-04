//DOM elements
const todoForm = document.querySelector("#todo-form");
const todoList = document.querySelector(".todos");
const totalTask = document.querySelector(".total-tasks");
const remainingTask = document.querySelector(".remaining-tasks");
const completedTasks = document.querySelector(".completed-tasks");
const mainInput = document.querySelector("#todo-form input");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

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
                                <svg xmlns="http://www.w3.org/2000/svg"
                                     class="icon icon-tabler icon-tabler-x"
                                     width="24"
                                     height="24"
                                     viewBox="0 0 24 24"
                                     stroke-width="2"
                                     stroke="currentColor"
                                     fill="none"
                                     stroke-linecap="round"
                                     stroke-linejoin="round">
                                    <path stroke="none"
                                          d="M0 0h24v24H0z"
                                          fill="none"></path>
                                    <path d="M18 6l-12 12"></path>
                                    <path d="M6 6l12 12"></path>
                                </svg>
                            </button>
    </div>
    `

    taskEl.innerHTML = taskElMarkup;

    todoList.appendChild(taskEl)
}