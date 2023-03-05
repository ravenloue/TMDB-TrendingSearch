import { MovieDBObject } from "./interfaces/MovieDBObject";
import { getCardURL, getSearchURL } from "./modules/api.js";
import { generateDetailsCard, generateResultsCard } from "./modules/generateCard.js";
import { getPosterPath } from "./modules/imgSizes.js";
//
var itemIDs;
//
const trendingSearchBtn = document.getElementById("trendingSearchBtn") as HTMLButtonElement;
const trendType = document.getElementById("trendType") as HTMLSelectElement;
const trendTime = document.getElementById("trendTime") as HTMLSelectElement;
const resultsArea = document.getElementById('results') as HTMLDivElement;
const popoverContainer = document.getElementById('popoverContainer') as HTMLDivElement;
const popoverCard = document.getElementById('popoverCard') as HTMLDivElement;
//
trendingSearchBtn.addEventListener('click', evt => {

    evt.preventDefault(); // Prevents button click from refreshing the page

    resultsArea.innerHTML =``; // Clears out the previous search results

    // Retrieves the information from the form and creates a URL for the fetch function
    let type = trendType.value;
    let time = trendTime.value;
    const searchUrl = getSearchURL(type, time);
    const posterPath = getPosterPath();

    // Fetching information and rendering it to the page
    fetch(searchUrl)
        .then( response => response.json() )
        .then( (results: MovieDBObject) => {
            
            results.results.forEach( item => {

            resultsArea.innerHTML += generateResultsCard(item, posterPath);
                
            })}) // End of Card Generating Sequence

        .then( () => {
            // Limiting this query selector to only h4 tags with id's means it will only look for the search card titles
            itemIDs = document.querySelectorAll('h4[id]');

            itemIDs.forEach( item => {
                item.addEventListener('click', evt => {

                    let itemType: string, searchID: string;

                    if(item.id.endsWith("person")){
                        itemType = "person";
                    }else if(item.id.endsWith("movie")){
                        itemType = "movie";
                    }else{
                        itemType = "tv";
                    }
                    searchID = item.id.slice(0, item.id.length - (itemType.length + 1));                   
                    let cardSearchURL = getCardURL(itemType, searchID);
                    
                    // Generating Detail 'pop-up' card
                    fetch(cardSearchURL)
                        .then( response => response.json() )
                        .then( (results) => {
                                popoverCard.innerHTML = generateDetailsCard(results);
                                popoverContainer.style.setProperty('display','inline');

                                const closeContainer = document.getElementById('closeContainer') as HTMLButtonElement;
                                closeContainer.addEventListener('click', evt =>{
                                    evt.preventDefault();
                                    popoverContainer.style.setProperty('display',"none");
                                })
                        }) // End of Card Details Fetch Call
                })
            })})// End of Event Listener generation for each card
}) // end of Trending Search functionality

