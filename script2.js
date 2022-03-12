var fishURL = "https://cors-anywhere-bc.herokuapp.com/https://www.fishwatch.gov/api/species";
// var redSnapperURL = "https://cors-anywhere-bc.herokuapp.com/https://www.fishwatch.gov/api/species/red-snapper";

//querry fishwatch api
function getFishAPI() {
    var statePic = $("#userState").val();
    
    fetch(fishURL)
        .then(function (response) {
            console.log("fetched");
            return response.json();
        })
        .then(function (fishData) {
            console.log(statePic);
            $('#nameList').empty();
            $('#regionList').empty();
            $('#btnList').empty();
            $('#regionList').append($('<li/>').attr('id', 'regionHeader').text('NOAA Fisheries Region'));
            $('#btnList').append($('<li/>').attr('id', 'btnHeader').text('Fish Name'));
            var alaska = 'AK';
            var greater_atlantic = ['MN', 'ND', 'SD', 'WI','IL', 'IN', 'MI', 'OH', 'WV', 'VA', 'MD', 'DE', 'NJ', 'PA', 'NY', 'CT', 'RI', 'MA', 'VT', 'NH', 'ME'];
            var pacific_islands = ['american samoa', 'guam', 'HI', 'northern nariana islands'];
            var southeast = ['NM', 'CO', 'TX', 'OK', 'KS', 'NE', 'IA', 'MO', 'AR', 'LA', 'MS', 'TN', 'KY', 'AL', 'GA', 'FL', 'SC', 'NC'];
            var west_coast = ['WA', 'OR', 'CA', 'NV', 'ID', 'MT', 'WY', 'UT', 'AZ'];
            if (greater_atlantic.includes(statePic)) {
                console.log('atlantic');
                var fishRegion = 'Greater Atlantic';
            }else if (southeast.includes(statePic)) {
                console.log('southeast');
                var fishRegion = 'Southeast';
            }else if (west_coast.includes(statePic)) {
                console.log('west coast');
                var fishRegion = 'West Coast';
            }else if (pacific_islands.includes(statePic)) {
                console.log('pacfic islands');
                var fishRegion = 'Pacific Islands';
            }else{
                console.log('alaska');
                var fishRegion = 'Alaska';
            }
            console.log(fishData);
            // console.log(fishData[0]['Species Name']);
            fishData.forEach(function (fish, i) {
                // console.log(i);
                //id shows as "item_undefined_n"
                // $('#nameList').append($('<li/>').attr("id", 'item_' + i + '_n').addClass('item_' + i).text(fish['Species Name']));
                if (fish['NOAA Fisheries Region'] == fishRegion) {
                    $('#regionList').append($('<li/>').attr("id", 'item_' + i + '_r').addClass('item_' + i).text(fish['NOAA Fisheries Region']));
                    $('#btnList').append($('<li/>').attr("id", 'item_' + i + '_btn', 'class', 'modal_open', 'item_' + i).append($('<button/>',
                        { text: fish['Species Name'], id: 'btn_' + i, class: 'modal-open' }).addClass('item_' + i)));
                    $('item_' + i + '_btn').text('test');
                    $('.modal-open').on('click', function (event) {
                        event.stopImmediatePropagation();
                        event.preventDefault();
                        console.log('clicked');
                        var clickedBtnClass = event.target.className;
                        console.log(clickedBtnClass);
                        //needs to link id/class of items for information to be able to add to modals
                        toggleModal();
                    })
    
                    const overlay = document.querySelector('.modal-overlay');
                    overlay.addEventListener('click', toggleModal());
                    var closemodal = $('.modal-close');
                    closemodal.on('click', toggleModal());
    
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
                }
                // $('table').addClass('rounded-lg p-2 text-xl bg-emerald-300 border-solid border-2 border-gray-900');
                // $('button').addClass('rounded-lg p-1 text-l bg-emerald-300 border-solid border-2 border-gray-900');

                // })

                //button creates modal with info from fish api
                //display fish image
            });

        });
}

//modal control
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