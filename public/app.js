"use strict";
// Temporary class def
// API information
const apiKey = '4f7cabe80884cea2dfd539471ec51096';
const apiURLstart = 'https://api.themoviedb.org/3/';
const configUrl = apiURLstart + 'configuration?api_key=' + apiKey;
var secBaseUrl;
var posterSize;
var posterPath;
fetch(configUrl)
    .then(response => response.json())
    .then((results) => {
    secBaseUrl = results.images.secure_base_url;
    posterSize = results.images.poster_sizes[2];
})
    .then((evt) => {
    // Poster Path data
    posterPath = secBaseUrl + posterSize;
});
const trendingSearchBtn = document.getElementById("trendingSearchBtn");
const trendType = document.getElementById("trendType");
const trendTime = document.getElementById("trendTime");
//const includeAdult = document.getElementById("includeAdult") as HTMLInputElement;
const resultsArea = document.getElementById('results');
trendingSearchBtn.addEventListener('click', (evt) => {
    evt.preventDefault(); //prevents button click from refreshing the page
    resultsArea.innerHTML = ``;
    // Assigns search type and time settings 
    let type = trendType.value;
    let time = trendTime.value;
    // Strings that combine all of the above information together
    const apiPrefix = 'trending/' + type + '/' + time + '?';
    const searchUrl = apiURLstart + apiPrefix + 'api_key=' + apiKey;
    // Represents user selection for including mature rated items
    //const mature:boolean = !(includeAdult.validity.valueMissing);
    console.log(searchUrl);
    // Fetching information and rendering it to the page
    fetch(searchUrl)
        .then(response => response.json())
        .then((results) => {
        results.results.forEach((item) => {
            //console.log(item);
            if (item.media_type === "person") {
                let personPath = posterPath + item.profile_path;
                resultsArea.innerHTML += `<div class="container-sm card bg-transparent border border-0 col-sm-2 my-3">
                                                    <div class="card-header bg-black border border-secondary">
                                                        <h4 class="text-white">${item.name}</h4>
                                                    </div>
                                                    <div class="card-body bg-black border border-secondary">
                                                        <image src="${personPath}" class="mx-4 my-2" />
                                                    </div>
                                              </div>`;
            }
            else if (item.name === undefined) {
                let itemPostPath = posterPath + item.poster_path;
                resultsArea.innerHTML += `<div class="container-sm card bg-transparent border border-0 col-sm-2 my-3">
                                                <div class="card-header bg-black border border-secondary">
                                                    <h4 class="text-white">${item.title}</h4>
                                                </div>
                                                <div class="card-body bg-black border border-secondary ">
                                                    <image src="${itemPostPath}" class="mx-4 my-2" />
                                                </div>
                                              </div>`;
            }
            else {
                let itemPostPath = posterPath + item.poster_path;
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
    });
});
