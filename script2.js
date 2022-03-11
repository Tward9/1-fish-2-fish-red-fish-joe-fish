var fishURL = "https://cors-anywhere-bc.herokuapp.com/https://www.fishwatch.gov/api/species";
var redSnapperURL = "https://cors-anywhere-bc.herokuapp.com/https://www.fishwatch.gov/api/species/red-snapper";


// //Creating table elements 
// var table = document.createElement("table");
// var tableBody = document.createElement("tbody");
// var tableCell = document.createElement("td");
// var tableRow = document.createElement("tr");


//querry fishwatch api
function getFishAPI() {
    fetch(fishURL)
        .then(function (response) {
            console.log("fetched");
            return response.json();
        })
        .then(function (fishData) {
            $('#nameList').empty();
            $('#regionList').empty();
            console.log(fishData);
            console.log(fishData[0]['Species Name']);
            console.log(fishData.l);
            var i = 0;
            fishData.forEach(fish => {
                $('#nameList').append($('<li/>').attr("id", 'item' + i + 'n').text(fish['Species Name']));
                $('#regionList').append($('<li/>').attr("id", 'item' + i + 'r').text(fish['NOAA Fisheries Region']));
                i++;
            });
            // for (i = 0; i < fishData.length; i++) {
            //     console.log(fishData[i]['Species Name']);
            //     console.log(fishData[i]['NOAA Fisheries Region']);

            //     var fishName = $(fishData[i]['Species Name'])
            //     var fishRegion = $(fishData[i]['NOAA Fisheries Region']);

            //     $('#nameList').append($('<li/>').attr("id", 'item' + i + 'n').text($(fishData[i]['Species Name'])));
            //     $('#regionList').append($('<li/>').attr("id", 'item' + i + 'r').text(fishRegion));
            // }
        });
}

function getredSnapperAPI() {
    fetch(redSnapperURL)
        .then(function (snapperResponse) {
            console.log("fetched snapper");
            return snapperResponse.json();
        })
        .then(function (redSnapperData) {
            console.log(redSnapperData);
            console.log(redSnapperData.Location);
        });
}

$("#fishBtn").on("click", getFishAPI);
$("#redSnapperBtn").on("click", getredSnapperAPI);