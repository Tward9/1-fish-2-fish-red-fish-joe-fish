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

// //querry fishwatch api
// function getFishAPI() {
//   fetch(fishURL)
//     .then(function (response) {
//       console.log("fetched");
//       return response.json();
//     })
//     .then(function (fishData) {
//       console.log(fishData);
//       for (i = 0; i < fishData.length; i++) {
//         console.log(fishData[i]['Species Name']);
//         console.log(fishData[i]['NOAA Fisheries Region']);
//         //need to fix addition to table just for data display
//         $('#fishTable').append(`<tr><td>` +$(fishData[i]['NOAA Fisheries Region'])+`</td><td>` +$(fishData[i]['Species Name'])+`</td></tr>`)
//       }
//     });
// }

// function getredSnapperAPI() {
//   fetch(redSnapperURL)
//     .then(function (snapperResponse) {
//       console.log("fetched snapper");
//       return snapperResponse.json();
//     })
//     .then(function (redSnapperData) {
//       console.log(redSnapperData);
//       console.log(redSnapperData.Location);
//     });
// }

// $("#fishBtn").on("click", getFishAPI);
// $("#redSnapperBtn").on("click", getredSnapperAPI);