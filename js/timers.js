function open_panel()
{
slideIt();
var a=document.getElementById("timerconfig");
a.setAttribute("id","timerconfig1");
a.setAttribute("onclick","close_panel()");
}

function slideIt()
{
	var slidingDiv = document.getElementById("slider");
	var stopPosition = 0;
	
	if (parseInt(slidingDiv.style.right) < stopPosition )
	{
		slidingDiv.style.right = parseInt(slidingDiv.style.right) + 2 + "px";
		setTimeout(slideIt, 1);	
	}
}
	
function close_panel(){
slideIn();
a=document.getElementById("timerconfig1");
a.setAttribute("id","timerconfig");
a.setAttribute("onclick","open_panel()");
}

function slideIn()
{
	var slidingDiv = document.getElementById("slider");
	var stopPosition = -342;
	
	if (parseInt(slidingDiv.style.right) > stopPosition )
	{
		slidingDiv.style.right = parseInt(slidingDiv.style.right) - 2 + "px";
		setTimeout(slideIn, 1);	
	}
}
var timercount = 0;
function addTimer(){
    if(timercount < 5 )
    {
        timercount += 1;
        var timers = document.getElementById("timers");

        var newtimer = document.createElement("div");
        newtimer.className = "timer";

        /*var image = document.createElement("img");
        image.src = "img/timer-settings.png";
        image.height = 50;
        image.width = 50;

        newtimer.appendChild(image);*/

        timers.appendChild(newtimer);
    }
}
function removeAllTimers(){

}
