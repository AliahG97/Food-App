// Set Variables
var searchBarEl = document.querySelector('.searchInput');
var recipeListEl = document.querySelector('.recipeList');
var recipeSection = document.querySelector('.recipeSection')
var recipeEl = [];
var searchBtnEl = document.querySelector('.submitBtn');
//Spoonacular API Variables
var baseUrl = 'https://api.spoonacular.com/';
var byIngredients = 'recipes/findByIngredients?';
var summarizeRecipe;
var apiKey = 'ef9c25b2e22b4e0d8363c1109951f721';
var userIngredients;
var byIngredientsUrl;
var summarizeRecipeUrl;
var ignorePantry = 'true';
var ranking = '2';
var recipeNum = '5';
var recipes;
var images;
var description;
var recipeName;

function createRecipeList() {
    for (var i = 0; i < recipes.length; i++) {
        summarizeRecipeUrl = `${baseUrl}recipes/${recipes[i].id}/summary?apiKey=${apiKey}`
        fetch(summarizeRecipeUrl)
            .then(function (response) {
                if (response.ok) {
                    console.log(response);
                    return response.json();
                } else {
                    alert(`Error: ${response.statusText}`);
                }
            })
            .then(function (data) {
                console.log(data);
                description = data;
            }).then(function () {
                var recipeEl = document.createElement('section');
                recipeEl.setAttribute('class', 'row recipe');
                var imgEl = document.createElement('img');
                imgEl.setAttribute('class', 'col-3 recipeImg');
                imgEl.setAttribute('src', `${recipes[i].image}`);
                var infoEl = document.createElement('section');
                infoEl.setAttribute('class', 'col-9 description');
                var recipeNameEl = document.createElement('h2');
                recipeNameEl.setAttribute('class', 'row recipeName');
                recipeNameEl.textContent = recipes[i].title;
                var descriptionEl = document.createElement('p');
                descriptionEl.setAttribute('class', 'row description');

                // Append recipe results to webpage.
                recipeSection.append(recipeEl);
                recipeEl.append(imgEl);
                recipeEl.append(infoEl);
                infoEl.append(recipeNameEl);
                infoEl.append(descriptionEl);
            })
    }};

    function getRecipeList() {
        byIngredientsUrl = `${baseUrl}${byIngredients}apiKey=${apiKey}&ingredients=${userIngredients}&number=${recipeNum}&ranking=${ranking}&ingorePantry=${ignorePantry}`;

        fetch(byIngredientsUrl)
            .then(function (response) {
                if (response.ok) {
                    console.log(response);
                    return response.json();
                } else {
                    alert(`Error: ${response.statusText}`);
                }
            })
            .then(function (data) {
                console.log(data);
                recipes = data;
            })
            .then(function (data) {
                createRecipeList();
            })
    };

    searchBtnEl.addEventListener('click', function () {
        userIngredients = searchBarEl.value;
        console.log(userIngredients);
        if (userIngredients === '') {
            alert('Please list the ingredients you want in the recipes.');
        } else {
            getRecipeList();
        }
    });