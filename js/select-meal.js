var pictures = {};

window.addEventListener("DOMContentLoaded", function() {
    var modal = document.getElementById("meal-modal");
    var labs_list = document.getElementById("meal-modal-labs");
    Object.keys(allRecipes).forEach(function (key) {
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(key));
        li.addEventListener("click", function() {
            var all_labs = document.getElementById("meal-modal-labs").children;
            for (i=0; i<all_labs.length; ++i) {
                all_labs[i].classList.remove("lab-selected");
            }
            var myNode = document.getElementById("meal-modal-recipes");
            while (myNode.firstChild) {
                myNode.removeChild(myNode.firstChild);
            }
            this.classList.add("lab-selected");
            myNode.appendChild(pictures[key]);
        });
        labs_list.appendChild(li);
    });

    Object.keys(allRecipes).forEach(function (key) {
        var elm = document.createElement("div");
        for (i=0; i<allRecipes[key].length; ++i) {
            var pic = document.createElement("div");
            pic.classList.add("picture");
            var img = document.createElement("img");
            img.src = allRecipes[key][i]["image"];
            var h2 = document.createElement("h2");
            h2.appendChild(document.createTextNode(allRecipes[key][i]["name"]));
            pic.appendChild(img);
            pic.appendChild(h2);
            elm.appendChild(pic);
        }
        pictures[key] = elm;
    });

    var lab1 = document.getElementById("meal-modal-labs").children[0];
    lab1.click();
});