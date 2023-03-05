import { getConfigUrl } from "./api.js";
/* Using the API key and url to gather information for determining the path
 * which will be used to pull images from the movie database
 */
const configUrl = getConfigUrl();
var secBaseUrl, posterSize, posterPath, itemIDs;
fetch(configUrl)
    .then(response => response.json())
    .then(results => {
    secBaseUrl = results.images.secure_base_url;
    posterSize = results.images.poster_sizes[2];
})
    // Concatenating the data to form the path
    .then(evt => posterPath = secBaseUrl + posterSize);
/***
 * This method utilizes a fetch call to generate a URL for the poster path of
 * a TMDB Search Item so that later methods can populate images during their
 * searches
 * @returns {string} posterPath
 */
function getPosterPath() { return posterPath; }
export { getPosterPath };
