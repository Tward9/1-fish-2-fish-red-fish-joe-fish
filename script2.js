var fishURL = "https://cors-anywhere-bc.herokuapp.com/https://www.fishwatch.gov/api/species";
// var redSnapperURL = "https://cors-anywhere-bc.herokuapp.com/https://www.fishwatch.gov/api/species/red-snapper";

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
            $('#btnList').empty();
            console.log(fishData);
            console.log(fishData[0]['Species Name']);
            var i = 0;
            fishData.forEach(fish => {
                //id shows as "item_undefined_n"
                $('#nameList').append($('<li/>').attr("id", ('item_' + i + '_n')).text(fish['Species Name']));
                $('#regionList').append($('<li/>').attr("id", 'item_' + i + '_r').text(fish['NOAA Fisheries Region']));
                $('#btnList').append($('<li/>').attr("id", 'item_' + i + '_btn', 'class', 'modal_open').append($('<button/>',
                    { text: 'Fun ' + fish['Species Name'] + ' Facts', id: 'btn_' + i, class: 'modal-open' })));
                // $('#btn_' + i).on('click', function (event) {

                // })
                //modal opening on every other button for some reason
                var openmodal = document.querySelectorAll('.modal-open')
                for (var i = 0; i < openmodal.length; i++) {
                    openmodal[i].addEventListener('click', function (event) {
                        // event.preventDefault()
                        toggleModal()
                    })
                }
                const overlay = document.querySelector('.modal-overlay')
                overlay.addEventListener('click', toggleModal)
                var closemodal = document.querySelectorAll('.modal-close')
                for (var i = 0; i < closemodal.length; i++) {
                    closemodal[i].addEventListener('click', toggleModal)
                }
                document.onkeydown = function (evt) {
                    evt = evt || window.event
                    var isEscape = false
                    if ("key" in evt) {
                        isEscape = (evt.key === "Escape" || evt.key === "Esc")
                    } else {
                        isEscape = (evt.keyCode === 27)
                    }
                    if (isEscape && document.body.classList.contains('modal-active')) {
                        toggleModal()
                    }
                };
                function toggleModal() {
                    const body = document.querySelector('body')
                    const modal = document.querySelector('.modal')
                    modal.classList.toggle('opacity-0')
                    modal.classList.toggle('pointer-events-none')
                    body.classList.toggle('modal-active')
                }
                i++;
                //button creates modal with info from fish api
                //display fish image
            });

        });
}

var openmodal = document.querySelectorAll('.modal-open')
for (var i = 0; i < openmodal.length; i++) {
    openmodal[i].addEventListener('click', function (event) {
        event.preventDefault()
        toggleModal()
    })
}

const overlay = document.querySelector('.modal-overlay')
overlay.addEventListener('click', toggleModal)

var closemodal = document.querySelectorAll('.modal-close')
for (var i = 0; i < closemodal.length; i++) {
    closemodal[i].addEventListener('click', toggleModal)
}

document.onkeydown = function (evt) {
    evt = evt || window.event
    var isEscape = false
    if ("key" in evt) {
        isEscape = (evt.key === "Escape" || evt.key === "Esc")
    } else {
        isEscape = (evt.keyCode === 27)
    }
    if (isEscape && document.body.classList.contains('modal-active')) {
        toggleModal()
    }
};


function toggleModal() {
    const body = document.querySelector('body')
    const modal = document.querySelector('.modal')
    modal.classList.toggle('opacity-0')
    modal.classList.toggle('pointer-events-none')
    body.classList.toggle('modal-active')
}
// function getredSnapperAPI() {
//     fetch(redSnapperURL)
//         .then(function (snapperResponse) {
//             console.log("fetched snapper");
//             return snapperResponse.json();
//         })
//         .then(function (redSnapperData) {
//             console.log(redSnapperData);
//             console.log(redSnapperData.Location);
//         });
// }

$("#fishBtn").on("click", getFishAPI);
// $("#redSnapperBtn").on("click", getredSnapperAPI);