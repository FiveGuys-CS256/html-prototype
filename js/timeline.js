/*example to use
 alert("total time: " + allRecipes["Lab 1"][0]['timer']['5:00'] + "   " + allRecipes["Lab 1"][0]['timedInstructions']['5:00']);*/

function populateTimeline(labNo) {

    var timeline = document.getElementById("timeline");
    var output = "";
    var test0 = 1;
    var test1 = 1;
    var test2 = 1;
    var test3 = 1;
    for (var keys in allRecipes[labNo][0]["timedInstructions"]) {                   //do this for each time slot
        output += ( "<tr><td>" + keys + "</td>");


        for (var recipeNo = 0; recipeNo < 4; recipeNo++) {                        /*per recipe loop*/
            output += "<td>";

            var instruction = allRecipes[labNo][recipeNo]["timedInstructions"][keys];
            for (var x = 0; x < 9; x++){                                            //per instruction, add <p> tags
                if (instruction[x] != undefined){
                    if (recipeNo == 0){
                        output += ("<p>" + test0 + ". " +  instruction[x] + "</p>");
                        test0++;
                    }
                    if (recipeNo == 1){
                        output += ("<p>" + test1 + ". " +  instruction[x] + "</p>");
                        test1++;
                    }
                    if (recipeNo == 2){
                        output += ("<p>" + test2 + ". " +  instruction[x] + "</p>");
                        test2++;
                    }
                    if (recipeNo == 3){
                        output += ("<p>" + test3 + ". " +  instruction[x] + "</p>");
                        test3++;
                    }

                }
            }

            var title = allRecipes[labNo][recipeNo]["timerName"][keys];
            var minute = allRecipes[labNo][recipeNo]["timer"][keys];
            if (title != ""){
                output+= ("<img style='height: 20px; width:20px;'src='img/stopwatch_brown.png' data-action='add_timer' data-title='" + title + "' data-minutes='" + minute + "' data-seconds='00'>" );
                output+= "</td>";
            }
        }
        output += "</tr>";
    }
    timeline.innerHTML = output;
}