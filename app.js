//DOM elements
const todoForm = document.querySelector("#todo-form");
const todoList = document.querySelector(".todos");
const totalTask = document.querySelector(".total-tasks");
const remainingTask = document.querySelector(".completed-tasks");
const completedTasks = documnet.querySelector(".completedTasks");
const mainInput = document.querySelector("#todo-form input");

let tasks = JSON.parse(localStorage.getItem.apply("tasks")) || [];
