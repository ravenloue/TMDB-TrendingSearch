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
        .then( results => {

            results.results.forEach((item:object) => {
                //console.log(item);
                if(item.media_type ==="person"){
                    let personPath = posterPath+item.profile_path;
                    resultsArea.innerHTML += `<div class="container-sm card bg-transparent border border-0 col-sm-2 my-3">
                                                    <div class="card-header bg-black border border-secondary">
                                                        <h4 class="text-white">${item.name}</h4>
                                                    </div>
                                                    <div class="card-body bg-black border border-secondary">
                                                        <image src="${personPath}" class="mx-4 my-2" />
                                                    </div>
                                              </div>`;
                }else if(item.name === undefined){
                    let itemPostPath = posterPath+item.poster_path;
                    resultsArea.innerHTML += `<div class="container-sm card bg-transparent border border-0 col-sm-2 my-3">
                                                <div class="card-header bg-black border border-secondary">
                                                    <h4 class="text-white">${item.title}</h4>
                                                </div>
                                                <div class="card-body bg-black border border-secondary ">
                                                    <image src="${itemPostPath}" class="mx-4 my-2" />
                                                </div>
                                              </div>`;
                }else {
                    let itemPostPath = posterPath+item.poster_path;
                    resultsArea.innerHTML += `<div class="container-sm card bg-transparent border border-0 col-sm-2 my-3">
                                                <div class="card-header bg-black border border-secondary">
                                                    <h4 class="text-white">${item.name}</h4>
                                                </div>
                                                <div class="card-body bg-black border border-secondary">
                                                    <image src="${itemPostPath}" class="mx-4 my-2" />
                                                </div>
                                              </div>`;
                }
            });
        })

})