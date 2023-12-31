// Set Variables
var recipeListEl = document.querySelector('.recipeList');
console.log(recipeListEl);
var recipeSection = document.querySelector('.recipeSection')
var searchBtnEl = document.querySelector('.submitBtn');
//Spoonacular API Variables
var baseUrl = 'https://api.spoonacular.com/';
var byIngredients = 'recipes/findByIngredients?';
var summarizeRecipe;
var apiKey = 'e3d6ede19b8b4ac39a3e036fefe8455a';

var userIngredients;
var byIngredientsUrl;

var ignorePantry = 'true';
var ranking = '2';
var recipeNum = '5';
var images;
var description;
var recipeName;

function createRecipeList(recipes, description) { // Create recipe elements and append to section of the page
    for (i = 0; i < recipes.length; i++) {
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
        descriptionEl.innerHTML = description[i].summary;
        // Append recipe results to webpage.
        recipeSection.append(recipeEl);
        recipeEl.append(imgEl);
        recipeEl.append(infoEl);
        infoEl.append(recipeNameEl);
        infoEl.append(descriptionEl);
    }
};

function getRecipeDescription(recipes) { // Get the recipe description using the ID from the fetch in getRecipeList()
    var recipeData = [];
    for (i = 0; i < recipes.length; i++) {
        console.log('id: ' + recipes[i].id);
        var recipeDescriptionUrl = `${baseUrl}recipes/${recipes[i].id}/summary?apiKey=${apiKey}`;
        fetch(recipeDescriptionUrl) // Call uses 1 point per call (5 recipes = 5 points)
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                } else {
                    alert(`Error: ${response.statusText}`);
                }
            })
            .then(function (data) {
                console.log(data);
                recipeData.push(data);
            });
    };
    console.log(recipeData);
    createRecipeList(recipes, recipeData);
};

function getRecipeList() { // Get list of recipes the use the entered ingredients
    byIngredientsUrl = `${baseUrl}${byIngredients}apiKey=${apiKey}&ingredients=${userIngredients}&number=${recipeNum}&ranking=${ranking}&ingorePantry=${ignorePantry}`;

    fetch(byIngredientsUrl) // Call uses 1 point and additional 0.01 point per recipe (5 recipes = 1.05 points)
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                return response.json();
            } else {
                alert(`Error: ${response.statusText}`);
            }
        })
        .then(function (data) {
            console.log('getRecipeList: ' + data);
            getRecipeDescription(data);
        })
};

searchBtnEl.addEventListener('click', function () { // Add click listener event to Search button element
    var containerEl = document.querySelector('.recipeSection');
    var searchBarEl = document.querySelector('#searchInput');
    userIngredients = searchBarEl.value;
    if (containerEl.innerHTML !== '') {
        containerEl.innerHTML = ''; // Clear data before new search
    }
    if (userIngredients === '') {
        alert('Please list the ingredients you want in the recipes.');
    } else {
        getRecipeList();
    }
});

async function getRandomRecipes() {
    // TODO: fix the url (route)
    // var apiUrl = `${baseUrl}recipies/random?number=1&tags=vegetarian,desert`;
    var apiUrl2 = 'https://api.spoonacular.com/recipes/random?number=1&tags=vegetarian,dessert'
    try {
        var response = await fetch(`${apiUrl2}&apiKey=${apiKey}`);
        var data = await response.json();
        console.log(data)

        var recipe = data.recipes[0];
        var recipeTitle = recipe.title;
        var recipeInstructions = recipe.instructions;

        console.log(`Recipe Title:${recipeTitle}`);
        console.log(`Instructions: ${recipeInstructions}`);

    } catch (error) {
        console.error('Error fetching recipes:', error);
    }
};
// getRandomRecipes();
// var recipeContainer = document.getElementById('recipeContainer');
// recipeContainer.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
recipeListEl.addEventListener('click', function () {
    console.log('hello')
    getRandomRecipes();
})