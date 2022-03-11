//url for fishwatch api
//can set to update with specific species in the future
var fishURL = "https://cors-anywhere-bc.herokuapp.com/https://www.fishwatch.gov/api/species";
var redSnapperURL = "https://cors-anywhere-bc.herokuapp.com/https://www.fishwatch.gov/api/species/red-snapper";

// Weather API Info
var cityName = "Chicago";
// create separate input for statecode
var state = "IL";
var countryCode = ",US";
var locationURL = "http://api.openweathermap.org/geo/1.0/direct?q=";
var APIkeyLocation = "306e5a39201f9a04bf59daf2b8544d8a";
var weatherURL = "https://cors-anywhere-bc.herokuapp.com/http://api.weatherunlocked.com/api/current/";
var APIkeyWeather = "app_key=653627bc29b26515ff93a6d98e85de58";
var appIDweather = "app_id=78fab2ab&";
var picCurrent = $(`<img>`);
var picDay1 = "";
var picDay2 = "";
var picDay3 = "";


function getLocation(){
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
    
    function getWeather() {
      fetch(weatherURL + lat + "," +lon + "?" + appIDweather + APIkeyWeather)
      .then(function (response) {
        console.log("getting weather...")
        return response.json();
      })
      .then(function (weatherData) {
        // Append this info to weather dayBlocks
        console.log(weatherData.wx_icon);
        // $(picCurrent).attr("src", weatherData.wx_icon);
        console.log(weatherData.temp_f);
        console.log(weatherData.feelslike_f);
        console.log(weatherData.humid_pct);
        console.log(weatherData.windspd_mph);
        console.log(weatherData.winddir_compass);
      })
    };
  })
  // Returns to default values after getting location & weather data.
  cityName = $("#userSearch").val("");
  state = $("#userState").val("--")
};


$("#fishBtn").on("click", getLocation);

