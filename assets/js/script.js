// Set Variables
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

var ignorePantry = 'true';
var ranking = '2';
var recipeNum = '5';
var images;
var description;
var recipeName;

function createRecipeList(recipe, description) {
    console.log(recipe);
        var recipeEl = document.createElement('section');
        recipeEl.setAttribute('class', 'row recipe');
        var imgEl = document.createElement('img');
        imgEl.setAttribute('class', 'col-3 recipeImg');
        imgEl.setAttribute('src', `${recipe.image}`);
        var infoEl = document.createElement('section');
        infoEl.setAttribute('class', 'col-9 description');
        var recipeNameEl = document.createElement('h2');
        recipeNameEl.setAttribute('class', 'row recipeName');
        recipeNameEl.textContent = recipe.title; 
        var descriptionEl = document.createElement('code');
        descriptionEl.setAttribute('class', 'row description');
        descriptionEl.textContent = description.summary;
        // Append recipe results to webpage.
        recipeSection.append(recipeEl);
        recipeEl.append(imgEl);
        recipeEl.append(infoEl);
        infoEl.append(recipeNameEl);
        infoEl.append(descriptionEl);
    
    };

function getRecipeDescription(recipes) {
    for (i = 0; i < recipes.length; i++) {
        console.log('id: '+ recipes[i].id);
        var recipeDescriptionUrl = `${baseUrl}recipes/${recipes[i].id}/summary?apiKey=${apiKey}`;
    fetch(recipeDescriptionUrl)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                alert(`Error: ${response.statusText}`);
            }
        })
        .then(function (data) {
            console.log(data);
            createRecipeList(recipes[i], data);
        });
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
                getRecipeDescription(data);
            })    
            };

    searchBtnEl.addEventListener('click', function () {
        var searchBarEl = document.querySelector('#searchInput');
        userIngredients = searchBarEl.value;
        console.log(userIngredients);
        if (userIngredients === '') {
            alert('Please list the ingredients you want in the recipes.');
        } else {
            getRecipeList();
        }
    });

    async function getRandomRecipes() {
        // TODO: fix the url (route)
        var apiUrl = `${baseUrl}recipies/random?number=1&tags=vegetarian,desert`;
        try {
            var response = await fetch(`${apiUrl}&apiKey=${apiKey}`);
            var data = await response.json();


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