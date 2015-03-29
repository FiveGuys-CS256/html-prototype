var MAX_TIMER_COUNT = 9;

function openPanel() {
    var elements = document.querySelectorAll("#timerConfig :not(div)");
    for (i=0; i<elements.length; ++i) {
        elements[i].classList.remove("hidden");
    }
    document.getElementById("addtimerbutton").classList.remove("hidden");

    var timerelements = document.getElementsByClassName("timer");
    Array.prototype.forEach.call(timerelements, function(ele){
                ele.dataset.state="settings";
        }
    );
    document.getElementById("timerConfig").dataset.state = "open";
    document.getElementById("timerConfig").classList.add("timerConfigAnimateIn");
    document.getElementById("timerConfig").classList.remove("timerConfigAnimateOut");
    document.getElementById("timers").dataset.state = "settings";
    var timers = document.getElementById("timers").children;
    for (i=0; i<timers.length; ++i) {
        timers[i].dataset.state = "settings";
    }
    var countdowntimers = document.getElementsByClassName("timerCountdown");
    var timermins = document.getElementsByClassName("timerTimeMin");
    var timersecs = document.getElementsByClassName("timerTimeSec");
    for (i=0; i<countdowntimers.length; ++i) {
        var str = countdowntimers[i].textContent;
        var timearray = str.split(":");
        timermins[i].value=parseInt(timearray[0]);
        if(timermins[i].value.toString().length == 1){
            timermins[i].value="0"+timermins[i].value;
        }
        timersecs[i].value=parseInt(timearray[1]);
        if(timersecs[i].value.toString().length == 1){
            timersecs[i].value="0"+timersecs[i].value;
        }
    }
}

function closePanel() {
    document.getElementById("timers").dataset.state = "";
    document.getElementById("timerConfig").dataset.state = "closed";
    document.getElementById("timerConfig").classList.add("timerConfigAnimateOut");
    document.getElementById("timerConfig").classList.remove("timerConfigAnimateIn");
}

function hideConfigElements() {
    // hide the internal elements after closing the panel since it looks better that way
    if (document.getElementById("timerConfig").dataset.state == "closed") {
        var timers = document.getElementById("timers").children;
        for (i=0; i<timers.length; ++i) {
            if (timers[i].dataset.state == "settings" || timers[i].dataset.state == "settings-selected") {
                timers[i].dataset.state = "closed";
            }
        }
        var elements = document.querySelectorAll("#timerConfigBody > :not(div)");
        for (i = 0; i < elements.length; ++i) {
            elements[i].classList.add("hidden");
        }
    }
}

function toggleTimer(){
    if (this.dataset.state == "open" || this.dataset.state == "closed") {
        var timers = document.getElementsByClassName("timer");
        var toggle = this.dataset.state == "open";
        for (var i = 0; i < timers.length; i++) {
            timers[i].dataset.state = "closed";
        }
        this.dataset.state = toggle ? "closed" : "open";
    }
    else if(this.dataset.state == "settings"){
        timers = document.getElementsByClassName("timer");
        toggle = this.dataset.state == "settings-selected";
        for (i = 0; i < timers.length; i++) {
            timers[i].dataset.state = "settings";
        }
        this.dataset.state = toggle ? "settings" : "settings-selected";
    }
}

var currentTimerCount=0;
function addTimer() {
    currentTimerCount++;
    var timers = document.getElementById("timers");
    if (timers.children.length < MAX_TIMER_COUNT) {
        var newtimer = document.createElement("div");
        newtimer.classList.add("timer");
        if (document.getElementById("timerConfig").dataset.state == "open") {
            newtimer.dataset.state = "settings";
        } else {
            newtimer.dataset.state = "open";
        }
        newtimer.addEventListener("click", toggleTimer);

        var timerContents = document.createElement("span");
        timerContents.classList.add("timerContents");

        var timerTitle = document.createElement("span");
        timerTitle.innerHTML="Title";
        timerTitle.setAttribute("contenteditable","true");
        timerTitle.classList.add("timerTitle");


        var timerCountdown = document.createElement("div");
        timerCountdown.classList.add("timerCountdown");
        timerCountdown.innerHTML="00:00";
        var timerTime = document.createElement("span");
        timerTime.classList.add("timerTime");
        timerTime.addEventListener("change", function(){
                setTimer(newtimer);
        }, false);
        /*timerTime.addEventListener("keydown", function(e){
            if(e.keyCode === 13){
                setTimer(newtimer);
            }
        }, false);*/

        var timerTimeMin = document.createElement("input");
        timerTimeMin.classList.add("timerTimeMin");
        timerTimeMin.type="number";
        timerTimeMin.value="00";
        timerTimeMin.max=59;

        var timerColon = document.createElement("span");
        timerColon.classList.add("timerColon");
        timerColon.innerHTML=":";

        var timerTimeSec = document.createElement("input");
        timerTimeSec.classList.add("timerTimeSec");
        timerTimeSec.type="number";
        timerTimeSec.value="00";
        timerTimeSec.max=59;

        timerTime.appendChild(timerTimeMin);
        timerTime.appendChild(timerColon);
        timerTime.appendChild(timerTimeSec);

        var addMinuteButton = document.createElement("button");
        addMinuteButton.classList.add("addMinuteButton");
        addMinuteButton.innerHTML="<b>+</b> min";
        addMinuteButton.addEventListener("click", function(){
            var timerChildren = this.parentNode.childNodes;
            for(var i = 0; i <timerChildren.length; i++){
                if(timerChildren[i].classList.contains("timerTime")){
                    for(var j = 0; j <timerChildren[i].childNodes.length; j++){
                        var timerTimeChild = timerChildren[i].childNodes[j];
                        if(timerTimeChild.classList.contains("timerTimeMin")){
                            timerTimeChild.value = parseInt(timerTimeChild.value)+1;
                            fireEvent(timerTimeChild,"change");
                        };
                    }
                }
            }
        }, false);

        var cancelTimerButton = document.createElement("button");
        cancelTimerButton.classList.add("cancelTimerButton");
        cancelTimerButton.innerHTML="Cancel";
        cancelTimerButton.addEventListener("click", function(){
            document.getElementById("timers").removeChild(this.parentNode);
        }, false);

        timerCountdown.id="timer"+currentTimerCount;
        newtimer.appendChild(timerTitle);
        newtimer.appendChild(timerTime);
        newtimer.appendChild(timerCountdown);
        newtimer.appendChild(addMinuteButton);
        newtimer.appendChild(cancelTimerButton);

        //newtimer.appendChild(timerContents);
        timers.appendChild(newtimer);
    }
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
    var time;
    var minute;
    var second;
    var countDown;
    for (var i = 0; i < newtimer.childNodes.length; i++) {
        if (newtimer.childNodes[i].className == "timerTime") {
            time = newtimer.childNodes[i];
        }
        else if(newtimer.childNodes[i].className == "timerCountdown") {
            countDown = newtimer.childNodes[i];
        }
    }
    for (var i = 0; i < time.childNodes.length; i++) {
        if(time.childNodes[i].className == "timerTimeMin") {
            minute = parseInt(time.childNodes[i].value);
        }
        else if(time.childNodes[i].className == "timerTimeSec") {
            second = parseInt(time.childNodes[i].value);
        }
    }
    //countDown.innerHTML=minute.value+":"+second.value;
    //startTimer(60*minute+second,countDown);
    var fiveMinutes = 60 * 5;
        display = document.getElementById(countDown.id);
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

window.addEventListener("DOMContentLoaded", function() {
    document.getElementById("timerConfigButton").addEventListener('click', togglePanel);
    document.getElementById("closeConfigButton").addEventListener('click', togglePanel);
    document.getElementById("timerConfig").addEventListener("transitionend", hideConfigElements, true);
    var add_buttons = document.querySelectorAll("[data-action='add_timer']");
    for (i=0; i<add_buttons.length; ++i) {
        add_buttons[i].addEventListener("click", addTimer);
    }
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

        display.textContent = minutes + ":" + seconds;
        if(minutes == "00" && seconds =="00"){
            clearInterval(timerMap[display.id]);
            display.parentNode.dataset.state="completed";
        }
        if (diff <= 0) {
            // add one second so that the count down starts at the full duration
            // example 05:00 not 04:59
            start = Date.now() + 1000;
        }
    };
    // we don't want to wait a full second before the timer starts
    if(timerMap[display.id]!=null) {
        clearInterval(timerMap[display.id]);
    }
    //timerMap[display.id]=timer;
    //timerMap[display.id]();
    timerMap[display.id]=setInterval(function(){timer()}, 1000);
}
var timerMap ={};

