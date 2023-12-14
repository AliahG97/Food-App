// Set Variables
var recipeListEl = document.querySelector('.recipeList');
var recipeEl = [];
// Spoonacular API Variables
var baseUrl = 'https://api.spoonacular.com/';
var apiKey = 'ef9c25b2e22b4e0d8363c1109951f721';
// Recipe by ingredients Variables
var ingApi = 'recipes/findByIngredients?';
var ingInput = document.querySelector('.searchInput');
// Random Recipe Variables
var randomUrl = `${baseUrl}recipes/random?`;

// Function to create list of recipes from the user input.
$(function getIngList() {
    var listUrl = `${baseUrl}${ingAPI}apiKey=${apiKey}&ingredients=${ingInput.values}&number=5&ranking=2&ignorePantry=true`;

    fetch(listUrl)
        .then(function (response) {
            return response.json();
        }) 
        // create elements/containers for recipe elements
        .then(function (data) { 
            for (var i = 0; i < listUrl.length; i++) {
                var recipeEl = document.createElement('section');
                recipeEl[i].setAttribute('class', 'row recipe' );
                var imgEl = document.createElement('section');
                imgEl.setAttribute('class', 'col-3 recipeImg');
                var infoEl = document.createElement('section');
                infoEl.setAttribute('class', 'col-9 infoBox')
                var recipeNameEl = document.createElement('h2');
                recipeNameEl.setAttribute('class', 'row recipeName');
                var descriptionEl = document.createElement('p');
                descriptionEl.setAttribute('class', 'row description');
                // Append Elements
                recipeListEl.append(recipeEl);
                recipeEl.append(imgEl);
                recipeEl.append(infoEl);
                infoEl.append(recipeNameEl);
                infoEl.append(descriptionEl);
            }
        });
    })