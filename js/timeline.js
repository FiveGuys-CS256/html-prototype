

function populateTimeTable() {
    var labName = document.getElementsByClassName("lab-selected")[0].innerHTML;
    var timeline = document.getElementById("timeline");
    for (var i=0; i<allRecipes[labName].length; ++i) {
        var recipe = allRecipes[labName][i];
        var step_number = 1;
        // add the picture to the top
        var image_src = recipe['image'];
        var title = recipe['name'];
        document.getElementById("image-" + (i+1)).innerHTML = "" +
            "<a href='#single-recipe'><img src='" + image_src + "'></a>" +
            "<a href='#' onclick='populateIngredientList(\"" + title + "\")'>" +
            "<h2>" + title + "</h2>" +
            "</a>";
        // clear all the previous times in the table
        for (var j=0; j<allTimes.length; ++j) {
            var table_td = document.getElementById("timeline-" + allTimes[j].replace(':', '')).children[i+1];
            table_td.innerHTML = "";
        }
        Object.keys(recipe['timedInstructions']).forEach(function(key) {
            var instructions = recipe['timedInstructions'][key];
            var table_td = document.getElementById("timeline-" + key.replace(':','')).children[i+1];
            var content = "";
            for (var j=0; j<instructions.length; ++j) {
                content += "<p>" + step_number + ". " + instructions[j] + "</p>";
                ++step_number;
            }
            if (recipe['timer'][key]) {
                var timers = recipe['timer'][key];
                for (var j=0; j<timers.length; ++j) {
                    var name = recipe['timer'][key][j]['name'];
                    var minutes = recipe['timer'][key][j]['minutes'];
                    content += "<img style='height: 20px; width:20px;' src='img/stopwatch_brown.png' data-action='add_timer' data-title='" + name + "' data-minutes='" + minutes + "'>";
                }
            }
            table_td.innerHTML = content;
        });
    }
    initializePresetTimers();
}

window.addEventListener("DOMContentLoaded", function() {
    document.getElementById("loadMealButton").addEventListener('click', populateTimeTable);
    //document.getElementById("timeline-container").addEventListener("scroll", function() {
    //    var header = document.getElementById("timeline-header");
    //    if (document.getElementById("timeline-container").scrollTop > 0) {
    //        //for (var i=0; i<header.children.length; ++i) {
    //        //    header.children[i].style.position = "fixed";
    //        //}
    //
    //        var shift = document.getElementById("timeline-500").children[1].style.width;
    //        header.style.position = "fixed";
    //        header.style.zIndex = "100";
    //        header.style.width = (shift*4)+"px";
    //        header.style.paddingLeft = '100px';
    //
    //        //var shift = "50px";
    //        ////debugger;
    //        //style.position = "fixed";
    //        //style.width = shift;
    //        //style.left = shift;
    //    } else {
    //        //style.position = "inherit";
    //        //style.width = 'auto';
    //        ////style.left = 'auto';
    //    }
    //})
});

