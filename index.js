/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) { // C2SKC4: 15 
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    for (const game of games) { // (Challenge 3) C3SKC1: 11 games/times
        // create a new div element, which will become the game card
        let newDiv = document.createElement("div");

        // add the class game-card to the list
        newDiv.classList.add("game-card")

        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")
        let precentageFunded = ((game.pledged / game.goal)*100).toFixed(2); // Round to nearest 2 decimal places
        const gameInfo = `
            <h1>${game.name}</h1>
            <img class="game-img" src="${game.img}"/>
            <p>${game.description}</p>
            <p><strong>Funded: ${precentageFunded}% | Backers: ${game.backers}</strong></p>
        `;
        newDiv.innerHTML = gameInfo;

        // append the game to the games-container
        document.getElementById("games-container").append(newDiv);
    }
} // C3SKC2: yellow

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON) // C3SKC3: GAMES_JSON
// C3C3SK: 11seafoamGAMES_JSON

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalBackers = GAMES_JSON.reduce((acc, game) => {
    return acc + game.backers;
}, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = totalBackers.toLocaleString('en-US'); // C4SKC1: 19,187

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const totalPledged = GAMES_JSON.reduce((acc, game) => {
    return acc + game.pledged;
}, 0);

// set inner HTML using template literal
raisedCard.innerHTML = "$" + totalPledged.toLocaleString('en-US'); // C4SKC2: 800,268

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games"); // C4SKC3: BRAIN
const totalGames = GAMES_JSON.reduce((acc, game) => {
    return acc += 1
}, 0);

gamesCard.innerHTML = totalGames.toLocaleString('en-US') // C4SK: 19187800268BRAIN

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    let listOfUnfundedGames = GAMES_JSON.filter((game) => {
        return game.pledged < game.goal
    });

    // C5SKC1: 7 
    console.log(listOfUnfundedGames);

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(listOfUnfundedGames);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let listOfFundedGames = GAMES_JSON.filter((game) => {
        return game.pledged >= game.goal
    });

    // C5SKC2: 11 - 7 = 4
    console.log(listOfFundedGames);

    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(listOfFundedGames);
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly)
fundedBtn.addEventListener("click", filterFundedOnly)
allBtn.addEventListener("click", showAllGames)
// C5SKC3: FLANNEL
// C5SKC4: click
// C5SK: 74FLANNELclick

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const unfundedGames = GAMES_JSON.reduce((acc, game) => {
    // If  game.backers < game.goal, then acc += 1. Else acc = acc
    return game.pledged < game.goal ? acc + 1 : acc;
}, 0);
// console.log(unfundedGames);

// create a string that explains the number of unfunded games using the ternary operator
let gameString = unfundedGames > 1 ? "games" : "game";
let remainString = unfundedGames <= 1 ? "remains" : "remain";

const displayStr = `A total of $${totalPledged.toLocaleString('en-US')} has been raised for ${totalGames} ${gameString}. Currently, ${unfundedGames} ${gameString}
${remainString} unfunded. We need your help to fund these amazing games!`;
// C6SKC1: toLocaleString

// create a new DOM element containing the template string and append it to the description container
let newDescription = document.createElement('p');
newDescription.innerHTML = displayStr;
descriptionContainer.append(newDescription);
// C6SKC2: <div>
// C6SKC3: 1
// C6SKC4: IVY
// C6SK: toLocaleString<div>1IVY

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
let [first, second, ...others] = sortedGames;

// create a new element to hold the name of the top pledge game, then append it to the correct element
let topPledged = document.createElement("p");
topPledged.innerHTML = first.name;
document.getElementById("first-game").append(topPledged);

// do the same for the runner up item
let secondPledged = document.createElement("p");
secondPledged.innerHTML = second.name;
document.getElementById("second-game").append(secondPledged);

// C7SKC1: Zoo
// C7SKC2: How
// C7SKC3: CEDAR
// C7SK: ZooHowCEDAR