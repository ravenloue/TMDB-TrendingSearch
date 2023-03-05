let path, itemName, nameTrunc = '';
let cardOpener, cardCloser;
/***
 * This method takes a SearchResultItem and the poster path URL from an API
 * call to TMDB.com to generate a card which contains the item's name and a
 * related image (movie or tv poster, head shot). If the item's name is too
 * long, it will be truncated in order to maintain more of a standard sized
 * card.
 * @param {SearchResultItem} item - The item object and its properties
 * @param {string} posterPath - The specific URL to generate an item's image
 * @returns resultsCard {string}
 */
function generateResultsCard(item, posterPath) {
    // Ternary conditionals to simplifiy item properties and reduce repetitious code
    itemName = (item.name === undefined) ? item.title : item.name;
    path = (item.media_type === "person") ? posterPath + item.profile_path : posterPath + item.poster_path;
    // Generating Strings for the cards
    cardOpener = '<div class="container-sm card bg-transparent border border-0 col-sm-2 my-3" style="width: 14.9375rem;">' +
        '<h4 class="text-white card-header bg-black border border-secondary text-center" id="' + item.id + "_" +
        item.media_type + '" title="' + itemName + '">';
    cardCloser = '</h4><image class="card-img-bottom bg-black border border-secondary" src="' + path +
        '" alt="Promotional Image of ' + itemName + '"/></div>';
    // Truncate the name if it is too long to maintain good visibility
    if (itemName.length > 13) {
        nameTrunc = itemName.substring(0, 10) + '...';
        return `${cardOpener}` + nameTrunc + `${cardCloser}`;
    }
    else {
        return `${cardOpener}` + itemName + `${cardCloser}`;
    }
}
/***
 * This method takes a SearchResultItem to generate a 'pop-up' card which
 * contains the item's name (full name if truncated) and a description of
 * the item: an overview if movie or tv show, or a short biography and a link
 * to the item's TMDB.com location if it is a person.
 * @param {SearchResultItem} item - The item object and its properties
 * @returns DetailsCard {string}
 */
function generateDetailsCard(item) {
    let idNum = item.id;
    let cardName = (item.name === undefined) ? item.title : item.name;
    // the biography was too long to use and I couldn't get the auto-scroll to work properly
    let cardinfo = (item.biography === undefined) ? item.overview :
        ('<b>Known for: </b>' + item.known_for_department +
            '<br><b>Birthday:</b> ' + item.birthday +
            '<br><b>Born:</b> ' + item.place_of_birth +
            '<br><b>For more information visit their profile at:</b> <a target="_blank" href="https://www.themoviedb.org/person/' + idNum + '">The Movie Database</a>');
    let closeButton = '<button id="closeContainer" class="btn btn-outline-light" type="submit" style="position:relative; left: 95%">X</button>';
    let cardHeader = '<h3 class="card-header">' + closeButton + cardName + '</h3>';
    let cardBody = '<p class="card-body bg-dark">' + cardinfo + '</p>';
    return `${cardHeader}${cardBody}`;
}
export { generateResultsCard, generateDetailsCard };
