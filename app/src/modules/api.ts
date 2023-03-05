// API information
const apiKey = '4f7cabe80884cea2dfd539471ec51096';
const apiURLstart = 'https://api.themoviedb.org/3/';

const configUrl = apiURLstart+'configuration?api_key='+apiKey;

/***
 * This method returns a string that contains an API key from TMDB.com
 * @returns apiKey {string} 
 */
function getAPIKey(){ return apiKey; }

/***
 * This method returns a string for the beginning portion of an API call 
 * from TMDB.com 
 * @returns apiURL {string} 
 */
function getAPIURL(){ return apiURLstart; }

/***
 * This method returns the beginning of the configuration URL as a string 
 * for certain API calls 
 * @returns configUrl {string} 
 */
function getConfigUrl(){ return configUrl; }

/***
 * This method takes a valid type and time and returns a string that can
 * be used to make an API call to TMDB.com for a Trending Search
 * @param {string} type - Type of trending search (all, person, tv, movie)
 * @param {string} time - Window of time for trending search (today, this week)
 * @returns searchURL {string}
 */
function getSearchURL(type:string, time:string){
    let apiPrefix = 'trending/'+type+'/'+time+'?';
    let apiURL = getAPIURL();
    let api = getAPIKey();

    return apiURL+apiPrefix+'api_key='+api;
}

/***
 * This method takes a valid type and id and returns a string that can be 
 * used to make an API call to TMDB.com to search for a specific item
 * @param {string} type - Type of item (person, tv, movie)
 * @param {string} id - ID number of item in string format
 * @returns cardURL {string}
 */
function getCardURL(type: string, id: string){
    let apiURL = getAPIURL();
    let api = getAPIKey();

    return apiURL+type+"/"+id+"?api_key="+api;
}

export {
    getAPIKey,
    getAPIURL,
    getConfigUrl,
    getSearchURL,
    getCardURL
}