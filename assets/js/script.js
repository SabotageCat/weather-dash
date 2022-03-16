// user text from <input>
var userSearch = document.getElementById("city-search");
// search history <ul>
var searchHistoryList = document.getElementById("search-history");
// search history array of user
var searchHistory = ["Toronto", "Austin", "Dallas"];

// event listener for search button
document.getElementById("search").addEventListener("click", function(event) {
    event.preventDefault();
    userSearch.value = "";
});

// create <li> of search history array
var createHistoryItem = function() {
    searchHistoryList.innerHTML = '';

    for (var i = 0; i < searchHistory.length; i++) {
        var li = document.createElement("li");
        li.classList = "history mt-2 btn btn-secondary bg-opacity-50";
        li.textContent = searchHistory[i];
        searchHistoryList.appendChild(li);
    }
    
};

// Search for city's weather
var search = function() {

};