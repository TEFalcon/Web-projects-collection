const tasks = document.querySelector(".tasks");
let tasksLength = 0;
const LOCAL_STORAGE_KEY = "TasksList";

CheckLocalStorageForTasks();
document.querySelector("#addTaskBtn").addEventListener('click', AddTaskBtn);

//triggers if the user added a task
function AddTaskBtn() {
    const newTaskInput = document.querySelector(".newTask input");
    if (newTaskInput.value.length == 0) {
        alert("Please Enter a Task");
        return;
    }

    CreateNewTask(newTaskInput.value);
    AddToTasksStorage(newTaskInput.value);
    UpdateListenersToTask();

    newTaskInput.value = "";
}

//updates all of the tasks for onclick listeners
function UpdateListenersToTask() {//gets the string query 
    var deletes = document.querySelectorAll(".delete");
    for (let index = 0; index < deletes.length; index++) {
        deletes[index].onclick = function () {
            RemoveFromStorageByIndex(index);
            this.parentNode.remove();
            tasksLength--;
        }

    }

    var tasks = document.querySelectorAll(".task");
    for (let index = 0; index < tasks.length; index++) {
        tasks[index].onclick = function () {
            this.classList.toggle('completed');
        }

    }
}

//creating the html for a new task
function CreateNewTask(taskName) {
    document.querySelector(".tasks").innerHTML += `
    <div class="task" id="task${tasksLength}">
        <span class="taskName">
            ${taskName}
             </span>
        <button class="delete">
           <svg xmlns="http://www.w3.org/2000/svg" height="24" width="21" viewBox="0 0 448 512"><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0L284.2 0c12.1 0 23.2 6.8 28.6 17.7L320 32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 7.2-14.3zM32 128l384 0 0 320c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-320zm96 64c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16z"/></svg>
        </button>
    </div>
`;
    tasksLength++;
}


///local storage functions

//checking if storage excists - if so creating adjcent tasks for it
function CheckLocalStorageForTasks() {
    let retArray;
    if (localStorage.getItem(LOCAL_STORAGE_KEY) == null) {
        todos = [];
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
        retArray = todos;

    }
    else {
        retArray = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    }
    for (let index = 0; index < retArray.length; index++) {
        CreateNewTask(retArray[index]);
        console.log(retArray[index]);
    }
    UpdateListenersToTask();
}

//pushing at the end of saved array
function AddToTasksStorage(taskName) {
    if(localStorage.getItem(LOCAL_STORAGE_KEY) == null)
        CheckLocalStorageForTasks();
    let retArray = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    retArray.push(taskName);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(retArray));
}

//finding by index, then using splice on array 
function RemoveFromStorageByIndex(index) {
    if (index < -1) // only splice array when item is found
        return;
    let retArray = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    console.log(index);
    retArray.splice(index, 1); // 2nd parameter means remove one item only
    console.log(retArray);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(retArray));
}