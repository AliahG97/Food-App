// Set Variables
var searchBarEl = document.querySelector('.searchInput');
var recipeListEl = document.querySelector('.recipeList');
var recipeEl = [];


$(function getIngList() {
    var listUrl = 'https://api.spoonacular.com/recipes/findByIngredients?apiKey=ef9c25b2e22b4e0d8363c1109951f721&ingredients=' + searchBarEl.value + '&number=5&ranking=2&ignorePantry=true'

    fetch(listUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            for (var i = 0; i < listUrl.length; i++) {
                var recipeEl = document.createElement('section');
                recipeEl[i].setAttribute('class', 'row recipe' );
                var imgEl = document.createElement('section');
                imgEl.setAttribute('class', 'col-3 recipeImg');
                var infoEl = document.createElement('section');
                infoEl.setAttribute('class', 'col-9 description')
                var recipeNameEl = document.createElement('h2');
                recipeNameEl.setAttribute('class', 'row recipeName');
                var descriptionEl = document.createElement('p');
                descriptionEl.setAttribute('class', 'row description');


                recipeListEl.append(recipeEl);
                recipeEl.append(imgEl);
                recipeEl.append(infoEl);
                infoEl.append(recipeNameEl);
                infoEl.append(descriptionEl);
                )

                



            }
        })




})

$()