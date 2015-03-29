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
    document.getElementById("timers").dataset.state = "settings";
    var timers = document.getElementById("timers").children;
    for (i=0; i<timers.length; ++i) {
        timers[i].dataset.state = "settings";
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

function addTimer() {
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
        timers.appendChild(newtimer);
    }
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