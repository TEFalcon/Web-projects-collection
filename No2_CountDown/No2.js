const DATE_LOCS_KEY = "CD_Key";
const timeTxts = document.querySelectorAll("[id$='TimeTxt']");
const goalDateElm = document.getElementById("goalDate");
const goalTimeElm = document.getElementById("goalTime");

let timer;
let retArray;
disablePastDates(goalDateElm);
updateLocalStorage();


let timerWorking = !IsTimerArrayEmpty();
goToTimer(false); 


function goToTimer(checkTime = true) {//bool
    if(!timerWorking){
        if(!checkTime){
            return;    
        }
        
            //checking if date is valid
            if (compareDates() !== 1) {
                //not valid
                alert("please choose a valid time");
                return;
            }
            else{
                var ToDate = goalDateElm.value.split("-");
                var ToTime = goalTimeElm.value;
                WritingRetArray(ToDate + " " + ToTime);
            }
    }
    
    setupTimer();
    
    
    toggleClassList("setUpTimer", 'active', 0);
    toggleClassList("container", 'active', 1);
}
function goToSelection() {
    toggleClassList("setUpTimer", 'active', 1);
    toggleClassList("container", 'active', 0);
    resetTimer();
    
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
        goalDateElm.setAttribute("Min", setMin);
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
    displayTime(retArray[0], retArray[1], retArray[2], retArray[3]);
    
    timer = setInterval(function (){
        if(retArray[3] === 0){
            if(retArray[2] === 0){
                if(retArray[1] === 0){
                    if(retArray[0] === 0){
                        resetTimer();
                        alert("Countdown Finished!");
                        return;
                    }
                    else{
                        retArray[0] -= 1;
                        retArray[1] = 23;
                        retArray[2] = 59;
                        retArray[3] = 60;
                    }
                }
                else{
                    retArray[1] -= 1;
                    retArray[2] = 59;
                        retArray[3] = 60;
                    }
                }
                else{
                    retArray[2] -= 1;
                    retArray[3] = 60;
            }
        }
        retArray[3] -= 1;
        updateLocalStorage();
        console.log(retArray[3]);
    },1000);

    timerWorking = true;
}

function compareDates() {
    //returns 1 if the date is valid
    var today = new Date();
    today.setMinutes(today.getMinutes() - 1, 59);
    var ToDate = goalDateElm.value;
    var ToTime = goalTimeElm.value;
    var calcGoal = (new Date(ToDate + " " + ToTime));

    if (today < calcGoal) {
        return 1;
    } else if (today > calcGoal) {
        return 0;
    } else {
        console.log("today and date2 are the same");//then check hour
        if (ToTime[0] > today.getHours()) {
            return 1;
        }
        else if (ToTime[0] === today.getHours() && ToTime[1] > today.getMinutes()) {
            return 1;
        }
        return 0;
    }
}

function resetTimer() {
    updateLocalStorage(1);

    timerWorking = false;
    clearInterval(timer);
    timer = null;
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

function displayTime(dd = 0, hh = 0, mm = 0, ss = 1) {
    timeTxts[0].innerHTML = dd;
    timeTxts[1].innerHTML = hh;
    timeTxts[2].innerHTML = mm;
    timeTxts[3].innerHTML = ss;
}
function updateLocalStorage(mode=0) {
    //default, 0 - update during countdown
    //1 - reset
    
    
    if(retArray == null){
        if (localStorage.getItem(DATE_LOCS_KEY) == null || localStorage.getItem(DATE_LOCS_KEY).length===0) {
            retArray = [0,0,0,0];//days,hours,minutes,seconds
            localStorage.setItem(DATE_LOCS_KEY, JSON.stringify(retArray));
        }
        else {
            retArray = JSON.parse(localStorage.getItem(DATE_LOCS_KEY));
            console.log(retArray);
        }    
        return;
    }
    if(mode === 1){
        retArray = [0,0,0,0];
    }
    localStorage.setItem(DATE_LOCS_KEY, JSON.stringify(retArray));
    displayTime(retArray[0], retArray[1], retArray[2], retArray[3]);
}

function IsTimerArrayEmpty(){
    //checiking if local storage is empty
    for (let index = 0; index < retArray.length; index++) {
        if (retArray[index] !== 0) {
            return false;
        }
    }
    return true;
}


function WritingRetArray(calcGoalStr){
    let calcGoal = (new Date(calcGoalStr));
    console.log(calcGoal);
    var today = new Date();
    
    let Difference_In_Time = calcGoal.getTime() - today.getTime();
    
    let Difference_In_Days = Math.floor(Difference_In_Time / (1000 * 3600 * 24));
    Difference_In_Time = Difference_In_Time - (Difference_In_Days * 1000 * 3600 * 24);
    let Difference_In_Hours = Math.floor((Difference_In_Time) / (1000 * 60 * 60 ));
    Difference_In_Time = Difference_In_Time - (Difference_In_Hours * 1000 * 60 * 60);
    let Difference_In_Minutes = Math.floor((Difference_In_Time) / (1000 * 60 ));
    Difference_In_Time = Difference_In_Time - (Difference_In_Minutes * 1000 * 60);
    let Difference_In_Seconds = Math.floor((Difference_In_Time) / 1000);
    

    retArray = [Difference_In_Days,Difference_In_Hours,Difference_In_Minutes,Difference_In_Seconds];
}