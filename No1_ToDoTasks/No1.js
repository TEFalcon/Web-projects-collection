const tasks = document.querySelector(".tasks");

document.querySelector("#addTaskBtn").addEventListener('click', AddTask());

console.log(document.querySelector(".newTask input").value);

function AddTask(){
    if(document.querySelector(".newTask input").value.length == 0){
        alert("Please Enter a Task");
        return;
    }
    
}