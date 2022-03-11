//url for fishwatch api
//can set to update with specific species in the future
var fishURL = "https://cors-anywhere-bc.herokuapp.com/https://www.fishwatch.gov/api/species";
var redSnapperURL = "https://cors-anywhere-bc.herokuapp.com/https://www.fishwatch.gov/api/species/red-snapper";

// Weather API Info
var weatherURL = "http://api.weatherunlocked.com/api/current/51.50,-0.12?app_id={78fab2ab}&app_key={653627bc29b26515ff93a6d98e85de58}"
var APIkeyWeather = "653627bc29b26515ff93a6d98e85de58"
var appIDweather = "78fab2ab"


// query Weather API
function getWeather() {
  fetch(weatherURL).then(function (response) {
    console.log("getting weather...")
  })
};