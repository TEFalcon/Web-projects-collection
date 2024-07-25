const timeTxts = document.querySelectorAll("[id$='TimeTxt']");
console.log(timeTxts);
const goalDateElm = document.getElementById("goalDate");
const goalTimeElm = document.getElementById("goalTime");
disablePastDates(goalDateElm);
disablePastDates(goalTimeElm);

function goToTimer(){
    toggleClassList("setUpTimer",'active',0);
    toggleClassList("container",'active',1);



}
function goToSelection(){
    toggleClassList("setUpTimer",'active',1);
    toggleClassList("container",'active',0);



    
}

function disablePastDates(object) {
    var today = new Date();
    var setMin;
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    if(object.id === "goalDate"){
      
        setMin = yyyy + '-' + mm + '-' + dd;
        goalDateElm.value = setMin;
    }
    else if(object.id === "goalTime"){
        var HH = String(today.getHours()).padStart(2, '0');
        var MM = String(today.getMinutes()).padStart(2, '0');
        if(goalDateElm.value === (yyyy + '-' + mm + '-' + dd)){
            setMin = HH+":"+MM;
            goalTimeElm.value = setMin;

            console.log((new Date().getTime() - new Date(goalDateElm.value).getTime())/1000/60/60);
        }
    }
  }



  function toggleClassList(id, str,mode){
    //id - gets id of elemnt, str - the string to add/remove, mode - remove or add
    var obj = document.querySelector("."+id);
    if(mode===0){//remove
        obj.classList.remove(str);
    }
    else if(mode===1){//add
        obj.classList.add(str);
    }
    else{
        console.error("incorrect mode")
    }
}