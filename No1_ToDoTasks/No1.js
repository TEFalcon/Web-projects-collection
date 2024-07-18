const tasks = document.querySelector(".tasks");
let tasksLength =0;


document.querySelector("#addTaskBtn").addEventListener('click', AddTask);


function AddTask(){
    const newTaskInput = document.querySelector(".newTask input");
    if(newTaskInput.value.length == 0){
        alert("Please Enter a Task");
        return;
    }

    document.querySelector(".tasks").innerHTML += `
        <div class="task" id="task${tasksLength}">
            <span class="taskName" >
                ${newTaskInput.value}
                 </span>
            <button class="delete">
               <svg xmlns="http://www.w3.org/2000/svg" height="24" width="21" viewBox="0 0 448 512"><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0L284.2 0c12.1 0 23.2 6.8 28.6 17.7L320 32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 7.2-14.3zM32 128l384 0 0 320c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-320zm96 64c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16z"/></svg>
            </button>
        </div>
    `;
    UpdateListenersToTask("#task"+tasksLength);



    tasksLength++;
    newTaskInput.value = "";
}


function UpdateListenersToTask(queryValue){//gets the string query 
    document.querySelector(queryValue).onclick = function(){
        this.classList.toggle('completed');
    };

    document.querySelector(queryValue + " .delete").onclick = function(){
        this.parentNode.remove();
    };
}