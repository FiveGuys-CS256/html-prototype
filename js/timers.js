var MAX_TIMER_COUNT = 9;

function openPanel() {
    var elements = document.querySelectorAll("#timerConfig :not(div)");
    for (i=0; i<elements.length; ++i) {
        elements[i].classList.remove("hidden");
    }
    document.getElementById("addtimerbutton").classList.remove("hidden");
    document.getElementById("timerConfig").dataset.state = "open";
    document.getElementById("timerConfig").classList.add("timerConfigAnimateIn");
    document.getElementById("timerConfig").classList.remove("timerConfigAnimateOut");

}

function closePanel() {
    var timers = document.querySelectorAll(".timer");
    Array.prototype.forEach.call(timers, function(item){
        item.dataset.state="un-selected";
    });
    document.getElementById("timerConfig").classList.add("timerConfigAnimateOut");
    document.getElementById("timerConfig").classList.remove("timerConfigAnimateIn");
}

function hideConfigElements() {

    if (document.getElementById("timerConfig").classList.contains("timerConfigAnimateIn")) {
    } else {
        document.getElementById("timerConfig").dataset.state = "closed";
    }
}

function toggleTimer(){
    if (this.dataset.state == "selected" || this.dataset.state == "un-selected") {
        var timers = document.getElementsByClassName("timer");
        var toggle = this.dataset.state == "selected";
        Array.prototype.forEach.call(timers, function(item){
            item.dataset.state="un-selected";
        });
        this.dataset.state = toggle ? "un-selected" : "selected";
        if(this.dataset.state == "selected"){
            this.querySelector(".timerTitle").contentEditable="true";
        }
    }
}

var currentTimerCount=0;
function addTimer(title, minute, second) {
    var exists = false;
    var timerTitles = document.getElementsByClassName("timerTitle");
    if(timerTitles.length >0) {
        var i = 0;
        while(i<timerTitles.length && exists==false){
            var text = timerTitles[i].innerHTML;
            exists = text==title;
            i++;
        };
    }
    if(exists==false) {
        currentTimerCount++;
        var timers = document.getElementById("timers");
        if (timers.children.length < MAX_TIMER_COUNT) {
            var newtimer = document.createElement("div");
            newtimer.classList.add("timer");
            newtimer.addEventListener("click", toggleTimer);

            var timerContents = document.createElement("span");
            timerContents.classList.add("timerContents");

            var timerTitle = document.createElement("span");
            if (title != null) {
                timerTitle.innerHTML = title;
                timerTitle.setAttribute("onClick","validate(this)");
            }
            else {
                timerTitle.innerHTML = "Title";
            }
            timerTitle.setAttribute("contenteditable", "false");
            timerTitle.addEventListener("keypress", function (e) {
                if (e.keyCode === 13) {
                    e.preventDefault();
                    this.blur();
                }
            });
            timerTitle.classList.add("timerTitle");
            timerTitle.addEventListener("click", function () {
                this.parentNode.dataset.state = "un-selected";
            });
            timerTitle.addEventListener("blur", function () {
                this.parentNode.dataset.state = "un-selected";
            });

            var timerCountdown = document.createElement("div");
            timerCountdown.classList.add("timerCountdown");
            if (minute != null && second != null) {
                timerCountdown.innerHTML = minute + ":" + second;
            }
            else {
                timerCountdown.innerHTML = "00:00";
            }
            var timerTime = document.createElement("span");
            timerTime.classList.add("timerTime");
            timerTime.addEventListener("change", function () {
                setTimer(newtimer, "true");
            }, false);
            /*timerTime.addEventListener("keydown", function(e){
             if(e.keyCode === 13){
             setTimer(newtimer);
             }
             }, false);*/

            var timerTimeMin = document.createElement("input");
            timerTimeMin.classList.add("timerTimeMin");
            timerTimeMin.type = "number";
            if (minute != null) {
                timerTimeMin.value = minute;
            }
            else {
                timerTimeMin.value = "00";
            }
            timerTimeMin.max = 500;

            var timerColon = document.createElement("span");
            timerColon.classList.add("timerColon");
            timerColon.innerHTML = ":";

            var timerTimeSec = document.createElement("input");
            timerTimeSec.classList.add("timerTimeSec");
            timerTimeSec.type = "number";
            if (second != null) {
                timerTimeSec.value = second;
            }
            else {
                timerTimeSec.value = "00";
            }
            timerTimeSec.max = 59;

            timerTime.appendChild(timerTimeMin);
            timerTime.appendChild(timerColon);
            timerTime.appendChild(timerTimeSec);

            var addMinuteButton = document.createElement("button");
            addMinuteButton.classList.add("addMinuteButton");
            addMinuteButton.innerHTML = "<b>+</b> min";
            addMinuteButton.addEventListener("click", function () {
                var timerTimeMinadd = this.parentNode.querySelectorAll(".timerTimeMin").item(0);
                timerTimeMinadd.value = parseInt(timerTimeMinadd.value) + 1;
                fireEvent(timerTimeMinadd, "change");
                this.parentNode.dataset.state = "un-selected";
            }, false);
            var cancelTimerButton = document.createElement("button");
            cancelTimerButton.classList.add("cancelTimerButton");
            cancelTimerButton.innerHTML = "Cancel";
            cancelTimerButton.addEventListener("click", function () {
                this.parentNode.dataset.state = "un-selected";
                Confirm.render('Cancel Timer?', 'cancelTimer', this.parentNode);
            }, false);

            timerCountdown.id = "timer" + currentTimerCount;
            newtimer.appendChild(timerTitle);
            newtimer.appendChild(timerTime);
            newtimer.appendChild(timerCountdown);
            newtimer.appendChild(addMinuteButton);
            newtimer.appendChild(cancelTimerButton);

            newtimer.dataset.state = "un-selected";
            timers.appendChild(newtimer);
            if (minute != "00" && second != "00") {
            }
            else {
                fireEvent(timerTime, "change");
            }
        }
    }
}
function cancelTimer(timer){
    clearInterval(timerMap[timer.id]);
    document.getElementById("timers").removeChild(timer);
}
function fireEvent(element,event){
    if (document.createEventObject){
        // dispatch for IE
        var evt = document.createEventObject();
        return element.fireEvent('on'+event,evt)
    }
    else{
        // dispatch for firefox + others
        var evt = document.createEvent("HTMLEvents");
        evt.initEvent(event, true, true ); // event type,bubbling,cancelable
        return !element.dispatchEvent(evt);
    }
}
function setTimer(newtimer){
    var time = newtimer.querySelectorAll(".timerTime").item(0);
    var countDown = newtimer.querySelectorAll(".timerCountdown").item(0);
    var minute = parseInt(time.querySelectorAll(".timerTimeMin").item(0).value);
    var second = parseInt(time.querySelectorAll(".timerTimeSec").item(0).value);
    var display = document.getElementById(countDown.id);
    var duration = 60*minute+second;
    startTimer(duration, display);
}
function removeAllTimers(){
    var el = document.getElementById('timers');
    while( el.hasChildNodes() ){
        el.removeChild(el.lastChild);
    }
}

function togglePanel() {
    if (document.getElementById("timerConfig").dataset.state == "closed") {
        openPanel();
    } else {
        closePanel();
    }
}
function initializePresetTimers(){
    var add_buttons = document.querySelectorAll("[data-action='add_timer']");
    for (var i=0; i<add_buttons.length; ++i) {
        //onclick= is used instead of add event to prevent multiples of same listener being added
        add_buttons[i].onclick=function(){
            if (this.dataset.title) {
                addTimer(this.dataset.title,this.dataset.minutes||"00",this.dataset.seconds||"00");
            } else {
                addTimer("title","00","00");
            }
        };
    }
}
window.addEventListener("DOMContentLoaded", function() {
    document.getElementById("timerConfigButton").addEventListener('click', togglePanel);
    document.getElementById("closeConfigButton").addEventListener('click', togglePanel);
    document.getElementById("timerConfig").addEventListener("transitionend", hideConfigElements, true);
    // this is called in the populateTimeTable instead now
    //document.getElementById("loadMealButton").addEventListener('click', initializePresetTimers);
    var clear_timers = document.querySelectorAll("[data-action='clear_timers']");
    for (i=0; i<clear_timers.length; ++i) {
        clear_timers[i].addEventListener("click", removeAllTimers);
    }

});
function startTimer(duration, display) {

    var start = Date.now(),
        diff,
        minutes,
        seconds;
    function timer() {
        // get the number of seconds that have elapsed since
        // startTimer() was called
        diff = duration - (((Date.now() - start) / 1000) | 0);

        // does the same job as parseInt truncates the float
        minutes = (diff / 60) | 0;
        seconds = (diff % 60) | 0;

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        if(minutes <= 60) {
            display.textContent = minutes + ":" + seconds;
        }
        else{
            display.textContent = parseInt(minutes/60)+":"+parseInt(minutes%60) + ":" + seconds;
        }
        var timerMin = display.parentNode.querySelectorAll(".timerTime .timerTimeMin").item(0);
        var timerSec = display.parentNode.querySelectorAll(".timerTime .timerTimeSec").item(0);
        if(timerMin != document.activeElement){
        timerMin.value=minutes;}
        if(timerSec != document.activeElement){
        timerSec.value=seconds;}
        if(duration > 0 && minutes == "00" && seconds =="00"){
            clearInterval(timerMap[display.id]);
                display.parentNode.classList.add("completed");
        }
        if (diff <= 0) {
            // add one second so that the count down starts at the full duration
            // example 05:00 not 04:59
            start = Date.now() + 1000;
        }
    }
    // we don't want to wait a full second before the timer starts
    if(timerMap[display.id]!=null) {
        clearInterval(timerMap[display.id]);
    }
    timerMap[display.id]=setInterval(timer, 1000);
}
var timerMap ={};

function CustomAlert(){
    this.render = function(dialog){
        var winW = window.innerWidth;
        var winH = window.innerHeight;
        var dialogoverlay = document.getElementById('dialogoverlay');
        var dialogbox = document.getElementById('dialogbox');
        dialogoverlay.style.display = "block";
        dialogoverlay.style.height = winH+"px";
        dialogbox.style.left = (winW/2) - (550 * .5)+"px";
        dialogbox.style.top = "100px";
        dialogbox.style.display = "block";
        document.getElementById('dialogboxhead').innerHTML = "Acknowledge This Message";
        document.getElementById('dialogboxbody').innerHTML = dialog;
        document.getElementById('dialogboxfoot').innerHTML = '<button onclick="Alert.ok()">OK</button>';
    }
    this.ok = function(){
        document.getElementById('dialogbox').style.display = "none";
        document.getElementById('dialogoverlay').style.display = "none";
    }
}
var Alert = new CustomAlert();
function deletePost(id){
    var db_id = id.replace("post_", "");
    // Run Ajax request here to delete post from database
    document.body.removeChild(document.getElementById(id));
}
function CustomConfirm(){
    this.render = function(dialog,op,id){
        var winW = window.innerWidth;
        var winH = window.innerHeight;
        var dialogoverlay = document.getElementById('dialogoverlay');
        var dialogbox = document.getElementById('dialogbox');
        dialogoverlay.style.display = "block";
        dialogoverlay.style.height = winH+"px";
        dialogbox.style.left = (winW/2) - (550 * .5)+"px";
        dialogbox.style.top = "100px";
        dialogbox.style.display = "block";

        document.getElementById('dialogboxhead').innerHTML =dialog;
        document.getElementById('dialogboxfoot').innerHTML = '<button onclick="Confirm.yes(\''+op+'\',\''+id+'\')">Yes</button> <button onclick="Confirm.no()">No</button>';
    }
    this.no = function(){
        document.getElementById('dialogbox').style.display = "none";
        document.getElementById('dialogoverlay').style.display = "none";
    }
    this.yes = function(op,id){
        if(op == "cancelTimer"){
            cancelTimer(document.querySelector(".timer[data-state='selected']"));
        }
        document.getElementById('dialogbox').style.display = "none";
        document.getElementById('dialogoverlay').style.display = "none";
    }
}
var Confirm = new CustomConfirm();

function validate(element){
    if (element.parentNode.dataset.state = "selected") {
        document.execCommand('selectAll', false, null);
    }
}