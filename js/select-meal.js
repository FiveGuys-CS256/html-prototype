var pictures = {};

window.addEventListener("DOMContentLoaded", function() {
    var modal = document.getElementById("meal-modal");
    var container = document.createElement("div");
    container.classList.add("modal-dialog");
    container.style = 'width:1100px; height:600px;';
    var header = document.createElement("div");
    header.classList.add("modal-header");
    var title = document.createElement("div");
    title.classList.add("title");
    title.classList.add("modal-title");
    title.appendChild(document.createTextNode("Select A Meal"));
    header.appendChild(title);
    container.appendChild(header);

    var body = document.createElement("div");
    body.classList.add("modal-body");
    body.id = "select-recipe-body";
    var labs = document.createElement("div");
    labs.classList.add("side-bar");
    var labs_list = document.createElement("ul");
    labs_list.classList.add("side-bar-list");
    labs_list.id = "meal-modal-labs";
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
    labs.appendChild(labs_list);
    body.appendChild(labs);
//               <div class="picture-layout">
//                   <div>
//                   <div class="picture"><img src="http://www.dzai.com.br/static/conteudos/2013/05/14/99/99872/posts/61826a4f3540c85560e7cf5616574e75.jpg">
//                       <h2>
//                           New York Cheesecake
//                       </h2>
//                   </div>...
    var pics = document.createElement("div");
    pics.id = "meal-modal-recipes";
    pics.classList.add("picture-layout");

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

    body.appendChild(pics);
    container.appendChild(body);

        // <div class="modal-footer">
        //     <a href="#close" class="btn">Start</a> 
        // </div>
    var footer = document.createElement("div");
    footer.classList.add("modal-footer");
    var close_button = document.createElement("a");
    close_button.href = "#close";
    close_button.classList.add("btn");
    close_button.appendChild(document.createTextNode("Start"));
    footer.appendChild(close_button);
    container.appendChild(footer);
    modal.appendChild(container);
});