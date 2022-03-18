//url for fishwatch api
//can set to update with specific species in the future
var fishURL =
  "https://cors-anywhere-bc.herokuapp.com/https://www.fishwatch.gov/api/species";
var redSnapperURL =
  "https://cors-anywhere-bc.herokuapp.com/https://www.fishwatch.gov/api/species/red-snapper";

// WEATHER VARIABLES:
// ---------------------------------------------
// location:
var cityName = "";
var state = "";
var countryCode = ",US";
var locationURL = "https://api.openweathermap.org/geo/1.0/direct?q=";
var APIkeyLocation = "306e5a39201f9a04bf59daf2b8544d8a";
// weather:
var weatherURL = "https://api.openweathermap.org/data/2.5/onecall?lat=";
var APIkeyWeather = "c443fd962d906a14e3af8d9d37623de2";
var picCurrent = $(`<img class="object-scale-down">`);
var picDay2 = $(`<img class="object-scale-down">`);
var picDay3 = $(`<img class="object-scale-down">`);
var weatherList1 = $(`<ul>`);
var weatherDetails1 = $(`<ul>`);
var weatherList2 = $(`<ul>`);
var weatherDetails2 = $(`<ul>`);
var weatherList3 = $(`<ul>`);
var weatherDetails3 = $(`<ul>`);

function displayWeather() {
  // Gets location from user input and converts to latitude & longitude.
  cityName = $("#userSearch").val();
  state = $("#userState").val();

  if (state != "--") {
    fetch(
      locationURL +
        cityName +
        "," +
        state +
        countryCode +
        "&limit=1&appid=" +
        APIkeyLocation
    )
      .then(function (location) {
        console.log("determining location...");
        return location.json();
      })
      .then(function (locationData) {
        var lat = locationData[0].lat;
        lat = lat.toFixed(2);
        console.log(lat);
        var lon = locationData[0].lon;
        lon = lon.toFixed(2);
        console.log(lon);

        getWeather(lat, lon);
        $("#day1data").empty();
        $("#day2data").empty();
        $("#day3data").empty();
        $("#day1details").empty();
        $("#day2details").empty();
        $("#day3details").empty();
        // Uses latitude & longitude values to get a forecast for the location.
        function getWeather() {
          var weatherIcon = `https://openweathermap.org/img/wn/`;
          fetch(
            weatherURL +
              lat +
              "&lon=" +
              lon +
              "&exclude=minutely,hourly&units=imperial&lang=en&appid=" +
              APIkeyWeather
          )
            .then(function (response) {
              console.log("getting weather...");
              return response.json();
            })
            .then(function (weatherResponse) {
              // Retrieves and appends weather data from the first 3 days of the forecast.
              for (var i = 0; i < 3; i++) {
                var weatherIMG = weatherResponse.daily[i].weather[0].icon;
                var tempHigh = weatherResponse.daily[i].temp.max.toFixed();
                var tempLow = weatherResponse.daily[i].temp.min.toFixed();
                var conditions =
                  weatherResponse.daily[i].weather[0].description;
                var humidity = weatherResponse.daily[i].humidity;
                var windSpeed = weatherResponse.daily[i].wind_speed.toFixed();
                var windDegree = weatherResponse.daily[i].wind_deg;

                if (i === 0) {
                  console.log("1");
                  // retrieves weather icon & appends to weather block
                  picCurrent = $(picCurrent)
                    .addClass("h-11")
                    .attr("src", `${weatherIcon}${weatherIMG}.png`);
                  $(picCurrent).appendTo("#day1");

                  // creates & appends items to list
                  weatherList1 = $(weatherList1).attr("id", "day1data");
                  $(weatherList1).appendTo("#day1");

                  weatherDetails1 = $(weatherDetails1).attr(
                    "id",
                    "day1details"
                  );
                  $(weatherDetails1).appendTo("#day1dataBlock");

                  tempHigh = `<li class="text-xs Phone:text-2xl font-info list-none">High: ${tempHigh}º</li>`;
                  $(tempHigh).appendTo("#day1data");

                  tempLow = `<li class="text-xs Phone:text-2xl font-info list-none">Low: ${tempLow}º</li>`;
                  $(tempLow).appendTo("#day1data");

                  conditions = `<li class="px-1 text-xs Phone:text-xl font-info list-none">${conditions}</li>`;
                  $(conditions).appendTo("#day1details");

                  humidity = `<li class="px-1 text-xs Phone:text-xl font-info list-none">Humidity: ${humidity}%</li>`;
                  $(humidity).appendTo("#day1details");

                  windSpeed = `<li class="px-1 text-xs Phone:text-xl font-info list-none">Wind: ${windSpeed} MPH</li>`;
                  $(windSpeed).appendTo("#day1details");

                  windDegree = `<li class="px-1 text-xs Phone:text-xl font-info list-none">${windDegree}º</li>`;

                  if ($(windDegree).txt <= 11 || $(windDegree).txt >= 349) {
                    var direction = `N`;
                  } else if (
                    $(windDegree).txt >= 12 &&
                    $(windDegree).txt <= 33
                  ) {
                    direction = `NNE`;
                  } else if (
                    $(windDegree).txt >= 34 &&
                    $(windDegree).txt <= 56
                  ) {
                    direction = `NE`;
                  } else if (
                    $(windDegree).txt >= 57 &&
                    $(windDegree).txt <= 78
                  ) {
                    direction = `ENE`;
                  } else if (
                    $(windDegree).txt >= 79 &&
                    $(windDegree).txt <= 101
                  ) {
                    direction = `E`;
                  } else if (
                    $(windDegree).txt >= 102 &&
                    $(windDegree).txt <= 123
                  ) {
                    direction = `ESE`;
                  } else if (
                    $(windDegree).txt >= 124 &&
                    $(windDegree).txt <= 146
                  ) {
                    direction = `SE`;
                  } else if (
                    $(windDegree).txt >= 147 &&
                    $(windDegree).txt <= 168
                  ) {
                    direction = `SSE`;
                  } else if (
                    $(windDegree).txt >= 169 &&
                    $(windDegree).txt <= 191
                  ) {
                    direction = `S`;
                  } else if (
                    $(windDegree).txt >= 192 &&
                    $(windDegree).txt <= 213
                  ) {
                    direction = `SSW`;
                  } else if (
                    $(windDegree).txt >= 214 &&
                    $(windDegree).txt <= 236
                  ) {
                    direction = `SW`;
                  } else if (
                    $(windDegree).txt >= 237 &&
                    $(windDegree).txt <= 258
                  ) {
                    direction = `WSW`;
                  } else if (
                    $(windDegree).txt >= 259 &&
                    $(windDegree).txt <= 281
                  ) {
                    direction = `W`;
                  } else if (
                    $(windDegree).txt >= 282 &&
                    $(windDegree).txt <= 303
                  ) {
                    direction = `WNW`;
                  } else if (
                    $(windDegree).txt >= 304 &&
                    $(windDegree).txt <= 326
                  ) {
                    direction = `NW`;
                  } else {
                    direction = `NNW`;
                  }
                  windDegree = `<li class="px-1 text-xs Phone:text-xl font-info list-none">${direction}</li>`;
                  $(windDegree).appendTo("#day1details");
                } else if (i === 1) {
                  console.log("2");
                  picCurrent = $(picDay2)
                    .addClass("h-11")
                    .attr("src", `${weatherIcon}${weatherIMG}.png`);
                  $(picCurrent).appendTo("#day2");

                  // creates & appends items to list
                  weatherList2 = $(weatherList2).attr("id", "day2data");
                  $(weatherList2).appendTo("#day2");

                  weatherDetails2 = $(weatherDetails2).attr(
                    "id",
                    "day2details"
                  );
                  $(weatherDetails2).appendTo("#day2dataBlock");

                  tempHigh = `<li class="text-xs Phone:text-2xl font-info list-none">High: ${tempHigh}º</li>`;
                  $(tempHigh).appendTo("#day2data");

                  tempLow = `<li class="text-xs Phone:text-2xl font-info list-none">Low: ${tempLow}º</li>`;
                  $(tempLow).appendTo("#day2data");

                  conditions = `<li class="px-1 text-xs Phone:text-2xl font-info list-none">${conditions}</li>`;
                  $(conditions).appendTo("#day2details");

                  humidity = `<li class="px-1 text-xs Phone:text-2xl font-info list-none">Humidity: ${humidity}%</li>`;
                  $(humidity).appendTo("#day2details");

                  windSpeed = `<li class="px-1 text-xs Phone:text-2xl font-info list-none">Wind: ${windSpeed} MPH</li>`;
                  $(windSpeed).appendTo("#day2details");

                  windDegree = `<li class="px-1 text-xs Phone:text-2xl font-info list-none">${windDegree}º</li>`;
                  if ($(windDegree).txt <= 11 || $(windDegree).txt >= 349) {
                    var direction = `N`;
                  } else if (
                    $(windDegree).txt >= 12 &&
                    $(windDegree).txt <= 33
                  ) {
                    direction = `NNE`;
                  } else if (
                    $(windDegree).txt >= 34 &&
                    $(windDegree).txt <= 56
                  ) {
                    direction = `NE`;
                  } else if (
                    $(windDegree).txt >= 57 &&
                    $(windDegree).txt <= 78
                  ) {
                    direction = `ENE`;
                  } else if (
                    $(windDegree).txt >= 79 &&
                    $(windDegree).txt <= 101
                  ) {
                    direction = `E`;
                  } else if (
                    $(windDegree).txt >= 102 &&
                    $(windDegree).txt <= 123
                  ) {
                    direction = `ESE`;
                  } else if (
                    $(windDegree).txt >= 124 &&
                    $(windDegree).txt <= 146
                  ) {
                    direction = `SE`;
                  } else if (
                    $(windDegree).txt >= 147 &&
                    $(windDegree).txt <= 168
                  ) {
                    direction = `SSE`;
                  } else if (
                    $(windDegree).txt >= 169 &&
                    $(windDegree).txt <= 191
                  ) {
                    direction = `S`;
                  } else if (
                    $(windDegree).txt >= 192 &&
                    $(windDegree).txt <= 213
                  ) {
                    direction = `SSW`;
                  } else if (
                    $(windDegree).txt >= 214 &&
                    $(windDegree).txt <= 236
                  ) {
                    direction = `SW`;
                  } else if (
                    $(windDegree).txt >= 237 &&
                    $(windDegree).txt <= 258
                  ) {
                    direction = `WSW`;
                  } else if (
                    $(windDegree).txt >= 259 &&
                    $(windDegree).txt <= 281
                  ) {
                    direction = `W`;
                  } else if (
                    $(windDegree).txt >= 282 &&
                    $(windDegree).txt <= 303
                  ) {
                    direction = `WNW`;
                  } else if (
                    $(windDegree).txt >= 304 &&
                    $(windDegree).txt <= 326
                  ) {
                    direction = `NW`;
                  } else {
                    direction = `NNW`;
                  }
                  windDegree = `<li class="px-1 text-xs Phone:text-2xl font-info list-none">${direction}</li>`;
                  $(windDegree).appendTo("#day2details");
                } else if (i === 2) {
                  console.log("3");
                  picCurrent = $(picDay3)
                    .addClass("h-11")
                    .attr("src", `${weatherIcon}${weatherIMG}.png`);
                  $(picCurrent).appendTo("#day3");

                  // creates & appends items to list
                  weatherList3 = $(weatherList3).attr("id", "day3data");
                  $(weatherList3).appendTo("#day3");

                  weatherDetails3 = $(weatherDetails3).attr(
                    "id",
                    "day3details"
                  );
                  $(weatherDetails3).appendTo("#day3dataBlock");

                  tempHigh = `<li class="text-xs Phone:text-2xl font-info list-none">High: ${tempHigh}º</li>`;
                  $(tempHigh).appendTo("#day3data");

                  tempLow = `<li class="text-xs Phone:text-2xl font-info list-none">Low: ${tempLow}º</li>`;
                  $(tempLow).appendTo("#day3data");

                  conditions = `<li class="px-1 text-xs Phone:text-2xl font-info list-none">${conditions}</li>`;
                  $(conditions).appendTo("#day3details");

                  humidity = `<li class="px-1 text-xs Phone:text-2xl font-info list-none">Humidity: ${humidity}%</li>`;
                  $(humidity).appendTo("#day3details");

                  windSpeed = `<li class="px-1 text-xs Phone:text-2xl font-info list-none">Wind: ${windSpeed} MPH</li>`;
                  $(windSpeed).appendTo("#day3details");

                  windDegree = `<li class="px-1 text-xs Phone:text-2xl font-info list-none">${windDegree}º</li>`;
                  if ($(windDegree).txt <= 11 || $(windDegree).txt >= 349) {
                    var direction = `N`;
                  } else if (
                    $(windDegree).txt >= 12 &&
                    $(windDegree).txt <= 33
                  ) {
                    direction = `NNE`;
                  } else if (
                    $(windDegree).txt >= 34 &&
                    $(windDegree).txt <= 56
                  ) {
                    direction = `NE`;
                  } else if (
                    $(windDegree).txt >= 57 &&
                    $(windDegree).txt <= 78
                  ) {
                    direction = `ENE`;
                  } else if (
                    $(windDegree).txt >= 79 &&
                    $(windDegree).txt <= 101
                  ) {
                    direction = `E`;
                  } else if (
                    $(windDegree).txt >= 102 &&
                    $(windDegree).txt <= 123
                  ) {
                    direction = `ESE`;
                  } else if (
                    $(windDegree).txt >= 124 &&
                    $(windDegree).txt <= 146
                  ) {
                    direction = `SE`;
                  } else if (
                    $(windDegree).txt >= 147 &&
                    $(windDegree).txt <= 168
                  ) {
                    direction = `SSE`;
                  } else if (
                    $(windDegree).txt >= 169 &&
                    $(windDegree).txt <= 191
                  ) {
                    direction = `S`;
                  } else if (
                    $(windDegree).txt >= 192 &&
                    $(windDegree).txt <= 213
                  ) {
                    direction = `SSW`;
                  } else if (
                    $(windDegree).txt >= 214 &&
                    $(windDegree).txt <= 236
                  ) {
                    direction = `SW`;
                  } else if (
                    $(windDegree).txt >= 237 &&
                    $(windDegree).txt <= 258
                  ) {
                    direction = `WSW`;
                  } else if (
                    $(windDegree).txt >= 259 &&
                    $(windDegree).txt <= 281
                  ) {
                    direction = `W`;
                  } else if (
                    $(windDegree).txt >= 282 &&
                    $(windDegree).txt <= 303
                  ) {
                    direction = `WNW`;
                  } else if (
                    $(windDegree).txt >= 304 &&
                    $(windDegree).txt <= 326
                  ) {
                    direction = `NW`;
                  } else {
                    direction = `NNW`;
                  }
                  windDegree = `<li class="px-1 text-xs Phone:text-2xl font-info list-none">${direction}</li>`;
                  $(windDegree).appendTo("#day3details");
                  state = $("#userState").val("--");
                }
              }
            });
        }
      });
  }
  // Returns to default values after getting location & weather data.
  cityName = $("#userSearch").val("");
}

$("#searchButton").on("click", displayWeather);
