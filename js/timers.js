function open_panel()
{
var a=document.getElementById("timerConfigButton");
a.setAttribute("onclick","close_panel()");
    document.getElementById("timerConfig").setAttribute("open","true");
    document.getElementById("timers").setAttribute("open","true");
    var tcb = document.getElementById("timerConfigButton");
    document.getElementById("timers").removeChild(tcb);
    document.getElementById("header").appendChild(tcb);
}

	
function close_panel(){
a=document.getElementById("timerConfigButton");
a.setAttribute("onclick","open_panel()");
    document.getElementById("timerConfig").setAttribute("open","false");
    document.getElementById("timers").setAttribute("open","false");
    var tcb = document.getElementById("timerConfigButton");
    document.getElementById("header").removeChild(tcb);
    document.getElementById("timers").appendChild(tcb);

}
function openTimer(mytimer){
    var elements = document.getElementsByClassName("timer");
    for (var i = 0; i < elements.length; i++) {
        elements[i].setAttribute("open","false");
    }
    mytimer.setAttribute("open","true");
}
var existingTimerCount = 0;
function addTimer(){
    if(existingTimerCount < 5 )
    {
        existingTimerCount += 1;
        var timers = document.getElementById("timers");

        var newtimer = document.createElement("div");
        newtimer.className="timer";
        newtimer.setAttribute("open","false");
        newtimer.setAttribute("onclick","openTimer(this)");

        /*var image = document.createElement("img");
        image.src = "img/timer-settings.png";
        image.height = 50;
        image.width = 50;

        newtimer.appendChild(image);*/

        timers.appendChild(newtimer);
    }
}
function removeAllTimers(){
    document.getElementById("timers").innerHTML="";
    existingTimerCount=0;
}
