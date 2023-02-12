import { MovieDBObject } from "./interfaces/MovieDBObject";
import { SearchResultItem } from "./interfaces/SearchResultItem";

// API information
const apiKey = '4f7cabe80884cea2dfd539471ec51096';
const apiURLstart = 'https://api.themoviedb.org/3/';

/* Using the API key and url to gather information for determining the path
 * which will be used to pull images from the movie database
 */
const configUrl = apiURLstart+'configuration?api_key='+apiKey;
var secBaseUrl: string;
var posterSize: string;
var posterPath: string;

fetch(configUrl)
    .then( response => response.json() )
    .then( results =>{
        
        secBaseUrl  = results.images.secure_base_url;
        posterSize  = results.images.poster_sizes[2];
    })
    // Concatenating the data to form the path
    .then(evt => posterPath = secBaseUrl+posterSize);

const trendingSearchBtn = document.getElementById("trendingSearchBtn") as HTMLButtonElement;
const trendType = document.getElementById("trendType") as HTMLSelectElement;
const trendTime = document.getElementById("trendTime") as HTMLSelectElement;
//const includeAdult = document.getElementById("includeAdult") as HTMLInputElement;
const resultsArea = document.getElementById('results') as HTMLDivElement;

trendingSearchBtn.addEventListener('click', evt => {

    evt.preventDefault(); // Prevents button click from refreshing the page

    resultsArea.innerHTML =``; // Clears out the previous search results

    // Retrieves the information from the form and creates a URL for the fetch function
    let type = trendType.value;
    let time = trendTime.value;
    const apiPrefix = 'trending/'+type+'/'+time+'?';
    const searchUrl = apiURLstart+apiPrefix+'api_key='+apiKey;

    /* Represents user selection for including mature rated items
       Doesn't work right now. Look into figuring it out later.
       Most results dont seem to have adult rating anyway */
    //const mature:boolean = !(includeAdult.validity.valueMissing);

    // remove later after i've finished building the classes for the json object
    console.log(searchUrl);
    // Fetching information and rendering it to the page
    fetch(searchUrl)
        .then( response => response.json() )
        .then( (results: MovieDBObject) => {
            
            results.results.forEach( item => {

                let path:string, itemName:string, nameTrunc:string = '', cardOpener:string, cardCloser:string;

                // Simplify the naming structure of the items coming in
                if(item.name === undefined){
                    itemName = item.title;
                }else{
                    itemName = item.name;
                }

                switch(item.media_type){
                    case "person":
                        path = posterPath+item.profile_path;
                        break;
                
                    default: // Movie or TV Show option
                        path = posterPath+item.poster_path;
                }

                // Generating Strings for the cards
                cardOpener = '<div class="container-sm card bg-transparent border border-0 col-sm-2 my-3" style="width: 14.9375rem;">' +
                             '<h4 class="text-white card-header bg-black border border-secondary text-center" title="' + itemName + '">';
                cardCloser = '</h4><image class="card-img-bottom bg-black border border-secondary" src="' + path +
                             '" alt="Promotional Image of ' + itemName + '"/></div>';

                if(itemName.length > 14){ // Truncate the name if it is too long to maintain good visibility
                    nameTrunc = itemName.substring(0,10)+"...";
                    resultsArea.innerHTML +=`${cardOpener}`+nameTrunc+`${cardCloser}`;
                }else {
                    resultsArea.innerHTML +=`${cardOpener}`+itemName+`${cardCloser}`;
                }
            });
        })

})