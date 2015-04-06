
function ingredientList(recipe) {
    var list = "<h4> " + recipe['name'] + "</h4>";
    list += "<ul>";
    for (var j = 0; j < recipe['ingredients'].length; ++j) {
        list += "<li>" + recipe['ingredients'][j] + "</li>";
    }
    list += "</ul>";
    return list;
}

function singleRecipeModal(recipe_name) {
    var currentLab = document.getElementsByClassName("lab-selected")[0].innerHTML;
    var recipes = allRecipes[currentLab];
    for (var i=0; i < recipes.length; ++i) {
        if (recipes[i]['name'] == recipe_name) {
            var recipe = recipes[i];
            document.getElementById("single-recipe-name").innerHTML = recipe_name;
            document.getElementById("single-recipe-ingredients").innerHTML = ingredientList(recipe);
            document.getElementById("single-recipe-image").src = recipe['image'];
            var singleRecDir = document.getElementById("single-recipe-directions");
            Object.keys(recipe['timedInstructions']).forEach(function (key) {
                var instructions = recipe['timedInstructions'][key];
                for (var k=0; k<instructions.length; ++k) {
                    var li = document.createElement("li");
                    li.appendChild(document.createTextNode(instructions[k]));
                    singleRecDir.appendChild(li);
                }
            });
            break;
        }
    }
}

function populateIngredientList(name) {
    var currentLab = document.getElementsByClassName("lab-selected")[0].innerHTML;
    var recipes = allRecipes[currentLab];
    for (var i=0; i < recipes.length; ++i) {
        if (recipes[i]['name'] == name) {
            var recipe = recipes[i];
            document.getElementById("ingredient-single-view").innerHTML = ingredientList(recipe);
            break;
        }
    }
}

function populateAllIngredients() {
    var html = "<h4>All Ingredients</h4>" +
        "<ul>" +
            "<li>11 eggs, plus 2 egg yolks</li>" +
            "<li>2 3/4 cups all-purpose flour</li>" +
            "<li>8 1/2 oz butter</li>" +
            "<li>1 homemade or store-bought single-crust pie dough</li>" +
            "<li>2 cups medium diced yellow onion (from 1 large onion)</li>" +
            "<li>Coarse salt and ground pepper</li>" +
            "<li>1 teaspoon vanilla extract</li>" +
            "<li>Zest of 1 lemon</li>" +
            "<li>1 3/4 cups granulated sugar</li>" +
            "<li>8 ounces sour cream, room temperature</li>" +
            "<li>2 1/2 pounds cream cheese (5 8-ounce packages)</li>" +
            "<li>1/3 cup sugar</li>" +
            "<li>4 ounces graham crackers</li>" +
            "<li>...</li>" +
        "</ul>";

    document.getElementById("ingredient-combined-view").innerHTML = html;
}

function mealLoaded() {
    populateAllIngredients();
    var currentLab = document.getElementsByClassName("lab-selected")[0].innerHTML;
    document.getElementById("title").innerHTML = currentLab;
    var recipes = allRecipes[currentLab];
    populateIngredientList(recipes[0]['name']);
    var singles = document.querySelectorAll("a[href='#single-recipe']");
    for (var i=0; i<singles.length; ++i) {
        var single = singles[i];
        single.onclick = function () { singleRecipeModal(this.nextSibling.childNodes[0].innerHTML) };
    }
}

window.addEventListener("DOMContentLoaded", function() {
    window.location.href = '#meal-modal';
    document.getElementById("loadMealButton").addEventListener('click', mealLoaded);
});