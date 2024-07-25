const timeTxts = document.querySelectorAll("[id$='TimeTxt']");
const DATE_LOCS_KEY = "CD_Key";
console.log(timeTxts);
const goalDateElm = document.getElementById("goalDate");
const goalTimeElm = document.getElementById("goalTime");

disablePastDates(goalDateElm);

function goToTimer() {
    //checking if date is valid
    if(compareDates() === 1){
        // if(isNaN(goalTimeElm.value))
        //     disablePastDates(goalTimeElm);
        
        setupTimer();
    
    
        toggleClassList("setUpTimer", 'active', 0);
        toggleClassList("container", 'active', 1);
    }
    else{//not valid
        alert("please choose a valid time");
    }
}
function goToSelection() {
    resetTimer();
    
    
    toggleClassList("setUpTimer", 'active', 1);
    toggleClassList("container", 'active', 0);
}

function disablePastDates(object) {
    var today = new Date();
    var setMin;
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    if (object.id === "goalDate") {

        setMin = yyyy + '-' + mm + '-' + dd;
        goalDateElm.value = setMin;
        goalDateElm.setAttribute("Min",setMin);
    }
    else if (object.id === "goalTime") {
        var HH = String(today.getHours()).padStart(2, '0');
        var MM = String(today.getMinutes()).padStart(2, '0');
        if (goalDateElm.value === (yyyy + '-' + mm + '-' + dd)) {
            setMin = HH + ":" + MM;
            goalTimeElm.value = setMin;

            console.log((new Date().getTime() - new Date(goalDateElm.value).getTime()) / 1000 / 60 / 60);
        }
    }
}

function setupTimer() {
    var today = new Date();
    var ToDate = goalDateElm.value.split("-");
    var ToTime = goalTimeElm.value;
    var calcGoal = (new Date(ToDate + " " + ToTime));
    console.log(calcGoal);
    let yearDiff = (calcGoal.getFullYear() -  today.getFullYear());
    if(yearDiff === 0){
        
    }
    
    
    
    // timeTxts[0] = 
}

function compareDates(){
    //returns 1 if the date is valid
    var today = new Date();
    today.setMinutes(today.getMinutes() -1,59);
    var ToDate = goalDateElm.value;
    var ToTime = goalTimeElm.value;
    var calcGoal = (new Date(ToDate + " " + ToTime));

if (today <  calcGoal) {
  return 1;
} else if (today >  calcGoal) {
    return 0;
} else {
    console.log("today and date2 are the same");//then check hour
  if(ToTime[0] > today.getHours()){
    return 1;
  }
  else if(ToTime[0] === today.getHours() && ToTime[1] > today.getMinutes()){
    return 1;
  }
  return 0;
}
}


function resetTimer() {

}

function toggleClassList(id, str, mode) {
    //id - gets id of elemnt, str - the string to add/remove, mode - remove or add
    var obj = document.querySelector("." + id);
    if (mode === 0) {//remove
        obj.classList.remove(str);
    }
    else if (mode === 1) {//add
        obj.classList.add(str);
    }
    else {
        console.error("incorrect mode")
    }
}


function updateLocalStorage(){
    
}


function CheckLocalStorage(){

}