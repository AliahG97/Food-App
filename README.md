# YumYard
This Website uses HTML and CSS and java script code to generate recipes.The recipes can be generated randomly or based on specific ingredients.The previously searched recipes are saved and can all be veiwed from local storage even when refreshed.There's also a handy grocery store locator which helps the user based on their current location to pick up the missing ingredients.

## Table of contents
- [Features](#features)
- [Screenshots](#screenshots)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features
-Random Recipe Generator:The recipe is using an API from Snoonacular to display random recipes from its library when the user clicks the 'Random Recipe' button.

-Recipe Search Filter Ingredients:The recipe is using an API from Snoonacular to display recipes from its library based on the ingredients entered into the search input  by the user and when they click the 'Search' button.

-Recent Recipes:When the user clicks any of the hyper links (underlined or in blue) inside of the recipe descriptions, they will automatically be added to the 'previously viewed recipes' and saved to the local storage. Upon clicking the links in th green boxes, its will bring the user back to the full recipe page on spoonaculars website. When the page is refreshed or the users returns to YumYard, the list of searches will remain displayed until local storage is reset and cleared.

-Store Locator:The store locator is an achored link within a button that goes to a pre-filled Google Maps search of 'gorcery store', so that when the user clicks the button, it will add in the user's longitude and latitude to then provide a list of the nearest grocery stores currently open.



## Screenshots
![YumYard Screenshot](./assets/images/ColorPalate.jpg)
(https://aliahg97.github.io/YumYard/)

## Usage 
This is a tool designed to give people ideas of what to cook at random or based on specific ingredients they may have. It's perfect for people who are very busy but may not have the time to sit and think about what they want to eat, all the ingredients, and how to prepare it. Now that can all be done with the click of a button.

git clone https://github.com/AliahG97/YumYard.git

## Contributing
-Unlimited tokens to call the API's would be amazing becuase we originally wanted to make the random recipes display one per 'click' on the 'Random Recipes' button, so they can click/call the api again each time, but we keep running out of tokens, so we decided to deiplay 10 results per API call, so that if the user doesnt link it they can just look at the next recipe on the list.

## License
Creative Common license
© YumYard by Aliah Guerra & Ryan Walker 2023. Confidential and Proprietary. All Rights Reserved.
