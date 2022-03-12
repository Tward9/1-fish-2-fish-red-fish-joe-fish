//url for fishwatch api
//can set to update with specific species in the future
var fishURL = "https://cors-anywhere-bc.herokuapp.com/https://www.fishwatch.gov/api/species";
var redSnapperURL = "https://cors-anywhere-bc.herokuapp.com/https://www.fishwatch.gov/api/species/red-snapper";

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
var picCurrent = $(`<img>`);
var picDay2 = $(`<img>`);
var picDay3 = $(`<img>`);
var weatherList = $(`<ul>`);


function displayWeather(){
  // Gets location from user input and converts to latitude & longitude.
  cityName = $("#userSearch").val();
  state = $("#userState").val()
  fetch(locationURL + cityName + "," + state + countryCode + "&limit=1&appid=" + APIkeyLocation)
  .then(function (location) {
    console.log("determining location...");
    return location.json()
  }).then(function (locationData) {
    var lat = locationData[0].lat;
    lat = lat.toFixed(2);
    console.log(lat);
    var lon = locationData[0].lon;
    lon = lon.toFixed(2);
    console.log(lon);
    
    getWeather(lat, lon);
    
    // Uses latitude & longitude values to get a forecast for the location.
    function getWeather() {
      var weatherIcon = `https://openweathermap.org/img/wn/`
      fetch(weatherURL + lat + "&lon=" + lon + "&exclude=minutely,hourly&units=imperial&lang=en&appid=" + APIkeyWeather)
      .then(function (response) {
        console.log("getting weather...")
        return response.json();
      })
      .then(function (weatherResponse) {
        // Retrieves and appends weather data from the first 3 days of the forecast.
        for (var i = 0; i < 3; i++) {
          var weatherIMG = weatherResponse.daily[i].weather[0].icon;         
          var tempHigh = weatherResponse.daily[i].temp.max;
          var tempLow = weatherResponse.daily[i].temp.min;
          var conditions = weatherResponse.daily[i].weather[0].description;
          var humidity = weatherResponse.daily[i].humidity;
          var windSpeed = weatherResponse.daily[i].wind_speed;
          var windDegree = weatherResponse.daily[i].wind_deg;
          var listData = $(`<li>`)

          if (i === 0) {
            console.log("1");
            // retrieves weather icon & appends to weather block
            picCurrent =$(picCurrent).attr("src", `${weatherIcon}${weatherIMG}.png`);
            $(picCurrent).appendTo("#day1")

            // creates & appends items to list
            weatherList = $(weatherList).attr("id", "day1data")
            $(weatherList).appendTo("#day1");

            listData = $(listData).text(tempHigh);
            $(listData).appendTo("#day1data");

            // listData = $(listData).text(tempLow);
            // $(listData).appendTo("#day1data");

            // listData = $(listData).val(conditions);
            // $(listData).appendTo("#day1data");

            // listData = $(listData).val(humidity);
            // $(listData).appendTo("#day1data");

            // listData = $(listData).val(windSpeed);
            // $(listData).appendTo("#day1data");

            // listData = $(listData).val(windDegree);
            // $(listData).appendTo("#day1data"); 
          }
          if (i === 1) {
            console.log("2");
            picCurrent =$(picDay2).attr("src", `${weatherIcon}${weatherIMG}.png`);
            $(picCurrent).appendTo("#day2")
            
            // creates & appends items to list
            weatherList = $(weatherList).attr("id", "day2data")
            $(weatherList).appendTo("#day2");

            listData = $(listData).text(tempHigh);
            $(listData).appendTo("#day2data");
          }
          if (i === 2) {
            console.log("3");
            picCurrent =$(picDay3).attr("src", `${weatherIcon}${weatherIMG}.png`);
            $(picCurrent).appendTo("#day3")
            
            // creates & appends items to list
            weatherList = $(weatherList).attr("id", "day3data")
            $(weatherList).appendTo("#day3");

            listData = $(listData).text(tempHigh);
            $(listData).appendTo("#day3data");
          }
        }
      })
    };
  })
  // Returns to default values after getting location & weather data.
  cityName = $("#userSearch").val("");
  state = $("#userState").val("--")
};


$("#fishBtn").on("click", displayWeather);

