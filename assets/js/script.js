// Set Variables
var recipeListEl = document.querySelector('.recipeList');
console.log(recipeListEl);
var recipeSection = document.querySelector('.recipeSection')
var searchBtnEl = document.querySelector('.submitBtn');
//Spoonacular API Variables
var baseUrl = 'https://api.spoonacular.com/';
var byIngredients = 'recipes/findByIngredients?';
var summarizeRecipe;
//var apiKey = 'e3d6ede19b8b4ac39a3e036fefe8455a';
var apiKey = 'ef9c25b2e22b4e0d8363c1109951f721';

var userIngredients;
var byIngredientsUrl;

var ignorePantry = 'true';
var ranking = '2';
var recipeNum = '5';
var images;
var description;
var recipeName;
var recipeHistory = [];

function createRecipeList(recipes, description) { // Create recipe elements and append to section of the page
    for (i = 0; i < recipes.length; i++) {
        var recipeEl = document.createElement('section');
        recipeEl.setAttribute('class', 'row recipe');
        var imgEl = document.createElement('img');
        imgEl.setAttribute('class', 'col-lg-3 col-md-12 recipeImg');
        imgEl.setAttribute('src', `${recipes[i].image}`);
        var infoEl = document.createElement('section');
        infoEl.setAttribute('class', 'col-lg-9 col-md-12 description');
        var recipeNameEl = document.createElement('a');
        recipeNameEl.setAttribute('class', 'row recipeName');
        recipeNameEl.setAttribute('href', `https://spoonacular.com/recipes/${recipes[i].title}-${recipes[i].id}`); //Create clickable text that will take you to the recipe webpage.
        recipeNameEl.setAttribute('target', '_blank');
        recipeNameEl.textContent = recipes[i].title;
        var descriptionEl = document.createElement('pre');
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

async function getRecipeDescription(recipes) {
    // Map each recipe to a fetch promise
    const fetchPromises = recipes.map(async (recipe) => {
        const recipeDescriptionUrl = `${baseUrl}recipes/${recipe.id}/summary?apiKey=${apiKey}`;

        try {
            const response = await fetch(recipeDescriptionUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json(); // Parse and return the JSON data
        } catch (error) {
            console.error('Error fetching recipe description:', error);
            return null; // Return null or some error indication as per your logic
        }
    });

    // Wait for all the fetch promises to resolve
    const recipeData = await Promise.all(fetchPromises);

    // Filter out any null results if necessary
    const validRecipeData = recipeData.filter(data => data !== null);
    console.log(validRecipeData);
    createRecipeList(recipes, validRecipeData);
}



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
// Add Event Listener to any Anchor Element on the Page
$(document).on('click', 'a', function () { 
    var recipe = {
        title: this.textContent,
        href: this.href
    };

    storeRecentRecipes(recipe); // When a link is clicked, this will call to update the recent recipes list
})

//Store the recipe name and href from the associated anchor element in local Storage
function storeRecentRecipes(latestRecipe) {
    var storedRecipes = JSON.parse(localStorage.getItem('recentRecipes')) || [];

    if (!Array.isArray(storedRecipes)) {
        storedRecipes = [];
    }

    var maxStoredRecipes = 20; //Limit the amount of recent Recipes to save.

    var isDuplicate = storedRecipes.some(function (recipe) {
        return recipe.href === latestRecipe.href;
    });

    if (!isDuplicate) {
        if (storedRecipes.length >= maxStoredRecipes) {
            storedRecipes.shift();
        }

        storedRecipes = [...storedRecipes, latestRecipe];
        localStorage.setItem('recentRecipes', JSON.stringify(storedRecipes));
    }

    renderRecentRecipes();
}

// Append all recent recipes to the HTML as href links.
function renderRecentRecipes() {
    var recipeHistory = document.getElementById('otherRecipes');
    recipeHistory.innerHTML = 'Previously Viewed Recipes';
    

    var storedRecipes = JSON.parse(localStorage.getItem('recentRecipes')) || [];
    //render and element for each recent search
    for (var i = 0; i < storedRecipes.length; i++) {
        var recentRecipeEl = document.createElement('a');
        recentRecipeEl.setAttribute('class', 'row recentRecipe');
        recentRecipeEl.setAttribute('data-index', i);
        recentRecipeEl.setAttribute('href', storedRecipes[i].href);
        recentRecipeEl.setAttribute('target', '_blank');
        recentRecipeEl.textContent = storedRecipes[i].title;


        recipeHistory.appendChild(recentRecipeEl);
    }
}

function init() { //Populate the Recent Recipes from local storage on initial page load
    var storedRecipes = JSON.parse(localStorage.getItem('recentRecipes')) || [];

    if (storedRecipes !== null) {
        recipeHistory = storedRecipes;
    }
    renderRecentRecipes();
}

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

init();