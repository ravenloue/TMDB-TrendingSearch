import { MovieDBObject } from "./interfaces/MovieDBObject";
import { SearchResultItem } from "./interfaces/SearchResultItem";

// API information
const apiKey = '4f7cabe80884cea2dfd539471ec51096';
const apiURLstart = 'https://api.themoviedb.org/3/';

/* Using the API key and url to gather information for determining the path
 * which will be used to pull images from the movie database
 */
const configUrl = apiURLstart+'configuration?api_key='+apiKey;
var secBaseUrl: string, posterSize: string, posterPath: string, itemIDs;

fetch(configUrl)
    .then( response => response.json() )
    .then( results => {       
        secBaseUrl  = results.images.secure_base_url;
        posterSize  = results.images.poster_sizes[2];
    })
    // Concatenating the data to form the path
    .then(evt => posterPath = secBaseUrl+posterSize);

const trendingSearchBtn = document.getElementById("trendingSearchBtn") as HTMLButtonElement;
const trendType = document.getElementById("trendType") as HTMLSelectElement;
const trendTime = document.getElementById("trendTime") as HTMLSelectElement;
const resultsArea = document.getElementById('results') as HTMLDivElement;
const popoverContainer = document.getElementById('popoverContainer') as HTMLDivElement;
const popoverCard = document.getElementById('popoverCard') as HTMLDivElement;

trendingSearchBtn.addEventListener('click', evt => {

    evt.preventDefault(); // Prevents button click from refreshing the page

    resultsArea.innerHTML =``; // Clears out the previous search results

    // Retrieves the information from the form and creates a URL for the fetch function
    let type = trendType.value;
    let time = trendTime.value;
    const apiPrefix = 'trending/'+type+'/'+time+'?';
    const searchUrl = apiURLstart+apiPrefix+'api_key='+apiKey;

    // Fetching information and rendering it to the page
    fetch(searchUrl)
        .then( response => response.json() )
        .then( (results: MovieDBObject) => {
            
            results.results.forEach( item => {

                let path:string, itemName:string, nameTrunc:string = '', cardOpener:string, cardCloser:string, clickStart:string, clickEnd:string;

                // Ternary conditionals to simplifiy item properties and reduce repetitious code
                itemName = (item.name === undefined) ? item.title : item.name;
                path = (item.media_type === "person") ? posterPath+item.profile_path : posterPath+item.poster_path ;

                // Generating Strings for the cards
                cardOpener = '<div class="container-sm card bg-transparent border border-0 col-sm-2 my-3" style="width: 14.9375rem;">' +
                             '<h4 class="text-white card-header bg-black border border-secondary text-center" id="'+ item.id +"_"+ item.media_type +
                             '" title="' + itemName + '">';
                cardCloser = '</h4><image class="card-img-bottom bg-black border border-secondary" src="' + path +
                             '" alt="Promotional Image of ' + itemName + '"/></div>';

                if(itemName.length > 14){ // Truncate the name if it is too long to maintain good visibility
                    nameTrunc = itemName.substring(0,10)+'...';
                    resultsArea.innerHTML +=`${cardOpener}`+nameTrunc+`${cardCloser}`;
                }else {
                    resultsArea.innerHTML +=`${cardOpener}`+itemName+`${cardCloser}`;
                }
            })}) // End of Card Generating Sequence

        .then( () => {
            // Limiting this query selector to only h4 tags with id's means it will only look for the search cards
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
                    
                    let cardSearchURL = apiURLstart + itemType +"/"+ searchID +"?api_key="+ apiKey;
                    
                    // Callback for clicked card popup
                    fetch(cardSearchURL)
                        .then( response => response.json() )
                        .then( (results) => {

                                let idNum = results.id;
                                let cardName = (results.name === undefined) ? results.title : results.name;
                                // the biography was too long to use and I couldn't get the auto-scroll to work properly
                                let cardinfo = (results.biography === undefined) ? results.overview : 
                                    ('<b>Known for: </b>'+ results.known_for_department +
                                     '<br><b>Birthday:</b> ' + results.birthday + 
                                     '<br><b>Born:</b> ' + results.place_of_birth +
                                     '<br><b>For more information visit their profile at:</b> <a target="_blank" href="https://www.themoviedb.org/person/'+idNum+'">The Movie Database</a>');

                                let closeButton = '<button id="closeContainer" class="btn btn-outline-light" type="submit" style="position:relative; left: 95%">X</button>'
                                let cardHeader = '<h3 class="card-header">'+ closeButton + cardName + '</h3>';
                                let cardBody = '<p class="card-body bg-dark">'+ cardinfo +'</p>';

                                popoverCard.innerHTML = `${cardHeader}${cardBody}`;
                                popoverContainer.style.setProperty('display','inline');

                                const closeContainer = document.getElementById('closeContainer') as HTMLButtonElement;
                                closeContainer.addEventListener('click', evt =>{
                                    evt.preventDefault();
                                    popoverContainer.style.setProperty('display',"none");
                                })
                                

                        })
                        
                })
            })
        })
}) // end of Trending Search functionality

