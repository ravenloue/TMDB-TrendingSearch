// API information
const apiKey = '4f7cabe80884cea2dfd539471ec51096';
const apiURLstart = 'https://api.themoviedb.org/3/';
/* Using the API key and url to gather information for determining the path
 * which will be used to pull images from the movie database
 */
const configUrl = apiURLstart + 'configuration?api_key=' + apiKey;
var secBaseUrl;
var posterSize;
var posterPath;
fetch(configUrl)
    .then(response => response.json())
    .then(results => {
    secBaseUrl = results.images.secure_base_url;
    posterSize = results.images.poster_sizes[2];
})
    // Concatenating the data to form the path
    .then(evt => posterPath = secBaseUrl + posterSize);
const trendingSearchBtn = document.getElementById("trendingSearchBtn");
const trendType = document.getElementById("trendType");
const trendTime = document.getElementById("trendTime");
const resultsArea = document.getElementById('results');
trendingSearchBtn.addEventListener('click', evt => {
    evt.preventDefault(); // Prevents button click from refreshing the page
    resultsArea.innerHTML = ``; // Clears out the previous search results
    // Retrieves the information from the form and creates a URL for the fetch function
    let type = trendType.value;
    let time = trendTime.value;
    const apiPrefix = 'trending/' + type + '/' + time + '?';
    const searchUrl = apiURLstart + apiPrefix + 'api_key=' + apiKey;
    // Fetching information and rendering it to the page
    fetch(searchUrl)
        .then(response => response.json())
        .then((results) => {
        results.results.forEach(item => {
            let path, itemName, nameTrunc = '', cardOpener, cardCloser;
            // Ternary conditionals to simplifiy item properties and reduce repetitious code
            itemName = (item.name === undefined) ? item.title : item.name;
            path = (item.media_type === "person") ? posterPath + item.profile_path : posterPath + item.poster_path;
            // Generating Strings for the cards
            cardOpener = '<article class="container-sm card bg-transparent border border-0 col-sm-2 my-3" style="width: 14.9375rem;">' +
                '<h4 class="text-white card-header bg-black border border-secondary text-center" id="' + item.id + '" title="' + itemName + '">';
            cardCloser = '</h4><image class="card-img-bottom bg-black border border-secondary" src="' + path +
                '" alt="Promotional Image of ' + itemName + '"/></article>';
            if (itemName.length > 14) { // Truncate the name if it is too long to maintain good visibility
                nameTrunc = itemName.substring(0, 10) + '...';
                resultsArea.innerHTML += `${cardOpener} <a onclick="alert('` + itemName + `');">` + nameTrunc + `</a> ${cardCloser}`;
            }
            else {
                resultsArea.innerHTML += `${cardOpener}` + itemName + `${cardCloser}`;
            }
        });
    }); // End of Fetch calls
}); // end of Trending Search functionality
export {};
