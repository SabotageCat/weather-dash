// user text from <input>
var userSearch = document.getElementById("city-search");
// search history <ul>
var searchHistoryList = document.getElementById("search-history");
// search history array of user
var searchHistory = ["Toronto", "Austin", "Dallas"];
// API key
var apiKey = "ba9f54018ee03d340168e9d17e9f0d37";


// event listener for search button
document.getElementById("search").addEventListener("click", function(event) {
    // prevent page reload
    event.preventDefault();

    // if nothing in search form then break
    if (!userSearch.value) {
        return
    }

    // search function to fetch api data
    search();

    // retrieve 5 day forecast
    // fiveDayForecast();

    // add to searchHistory array
    addSearchHistory();

    // reset search field
    // userSearch.value = "";
});

// create <li> of search history array
var createHistoryItem = function() {
    // clear search history list
    searchHistoryList.innerHTML = '';
    
    // for loop to create <li> for each search history item
    for (var i = 0; i < searchHistory.length; i++) {
        var li = document.createElement("li");
        li.classList = "history mt-2 btn btn-secondary bg-opacity-50";
        li.setAttribute("data-search-history", searchHistory[i]);
        li.textContent = searchHistory[i];
        searchHistoryList.appendChild(li);
    }
    
};

// Search for city's weather
var search = function() {
    var apiUrlGeo = "https://api.openweathermap.org/geo/1.0/direct?q=" + userSearch.value + "&limit=1&appid=" + apiKey;

    fetch(apiUrlGeo).then(function(response) {
        // response successful
        if (response.ok) {
            response.json()
            .then(function(data) {
                // use lat and lon to retrieve weather data
                var apiUrlWeather = "https://api.openweathermap.org/data/2.5/onecall?lat=" + data[0].lat + "&lon=" + data[0].lon + "&units=imperial&exclude=minutely,hourly,daily,alerts&appid=" + apiKey;
                fetch(apiUrlWeather).then(function(response) {
                    // response success
                    if (response.ok) {
                        response.json()
                        .then(function(data) {
                            var weather = data.current;
                            displayWeather(weather.temp, weather.uvi, weather.humidity, weather.wind_speed, weather.weather[0].icon, weather.weather[0].description);
                        });
                    } else {
                        // if unsuccessful
                        console.log("fetch unsuccessful");
                    }
                });
            });
        } else {
            // if unsuccessful
            console.log("fetch unsuccesful");
        }
    });

};

// 5 day forecast
var fiveDayForecast = function() {

};

// display current weather and 5 day forecast
var displayWeather = function(temp, uvi, humidity, wind, icon, desc) {
    console.log(temp, uvi, humidity, wind, icon);

    var forecast = document.getElementById("forecast");
    var cityEL = document.getElementById("cityname");
    var windEL = document.getElementById("wind");
    var tempEL = document.getElementById("temp");
    var humidityEL = document.getElementById("humidity");
    var uviEL = document.getElementById("uvi");
    var iconEL = document.getElementById("icon");

    cityEL.textContent = userSearch.value + " " + moment().format("[(]M[/]D[/]YYYY[)]");

    userSearch.value = "";

    forecast.removeAttribute("hidden");
    
    iconEL.setAttribute("src", "https://openweathermap.org/img/wn/" + icon + "@2x.png");
    iconEL.setAttribute("alt", desc);
    windEL.textContent = "Wind: " + wind + " MPH";
    tempEL.textContent = "Temp: " + temp + "°F";
    humidityEL.textContent = "Humidity: " + humidity + "%";
    uviEL.textContent = uvi;

    if (uvi <= 2.99) {
        uviEL.className = "badge rounded-pill bg-success";
    } else if (uvi <= 5.99) {
        uviEL.className = "badge rounded-pill bg-warning";
    } else {
        uviEL.className = "badge rounded-pill bg-danger";
    }

};

// add to searchHistory array
var addSearchHistory = function() {
    var searchHistoryItem = userSearch.value;
    searchHistory.push(searchHistoryItem);
    createHistoryItem();
};

// load search history
createHistoryItem();