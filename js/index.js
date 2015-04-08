function setLab() {
    selectedLab = document.querySelectorAll(".lab-selected").item(0).innerHTML;
    console.log("Set Lab To: " + selectedLab);
    reloadData();
}

function reloadData() {
    populateIngredientList(0);
    populateAllIngredients();
}

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
            singleRecDir.innerHTML = ""; // Prevent duplicate instructions.
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

function populateIngredients(recipe) {
  var myName = recipe.name;

  var list = "";
  list += "<h4> " + myName + "</h4>";
  list += "<ul>";

  for (var i = 0; i < recipe.ingredients.length; i++) {
    list += "<li>" + recipe.ingredients[i] + "</li>"; 
  };

  list += "</ul>";

  document.getElementById("ingredient-single-view").innerHTML = list;
};

function populateIngredientList(name) {
  populateAllIngredients();
  
  switch (name) {
  case 0:
    var recipe = allRecipes[selectedLab][0];
    populateIngredients(recipe);
    break;
  case 1:
    var recipe = allRecipes[selectedLab][1];
    populateIngredients(recipe);
    break;
  case 2:
    var recipe = allRecipes[selectedLab][2];
    populateIngredients(recipe);
    break;
  case 3:
    var recipe = allRecipes[selectedLab][3];
    populateIngredients(recipe);
    break;
  default:
    // alert("None found");
    break;
  }
};



// function populateIngredientList(name) {
//     var currentLab = document.getElementsByClassName("lab-selected")[0].innerHTML;
//     var recipes = allRecipes[currentLab];

//     for (var i=0; i < recipes.length; ++i) {
//         if (recipes[i]['name'] == name) {
//             var recipe = recipes[i];
//             document.getElementById("ingredient-single-view").innerHTML = ingredientList(recipe);
//             break;
//         }
//     }
// }

function populateAllIngredients() {
    var html = "";
    html = "<h4>All Ingredients</h4>";
    html += "<ul>";

    var recipes = allRecipes[selectedLab];

    for (var i = 0; i < recipes.length; i++) {
      var ingredients = recipes[i].ingredients;

      for (var k = 0; k < ingredients.length; k++) {
        html += "<li>" + ingredients[k] + "</li>";
      };
    };

    html += "</ul>";

    document.getElementById("ingredient-combined-view").innerHTML = html;
}

function mealLoaded() {
    setLab();
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

function setIdValue(id, value) {
  document.getElementById(id).Value = value;
}

window.addEventListener("DOMContentLoaded", function() {
    window.location.href = '#meal-modal';
    document.getElementById("loadMealButton").addEventListener('click', mealLoaded);
});