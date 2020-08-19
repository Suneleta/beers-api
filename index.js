//// LOGIC
async function getRandomBeer() {
    const response = await axios.get('https://api.punkapi.com/v2/beers/random');
    const beer = response.data[0];

    return {
        name: beer.name,
        tagline: beer.tagline,
        picture: beer.image_url,
        description: beer.description,
        date: beer.first_brewed
    };
}
async function getPageBeer(pageNumber, perPage) {
    const response = await axios.get('https://api.punkapi.com/v2/beers?page=' + pageNumber + "&per_page=" + perPage);
    for (let i = 0; i < response.data.length; i++) {
        const beer = response.data[i];
        addBeerCard({
            name: beer.name,
            tagline: beer.tagline,
            picture: beer.image_url,
            description: beer.description,
            date: beer.first_brewed
        });
    }
}

async function getBeerByName(beerName) {
    const response = await axios.get('https://api.punkapi.com/v2/beers?beer_name=' + beerName);
    for (let i = 0; i < response.data.length; i++) {
        const beer = response.data[i];
        addBeerCard({
            name: beer.name,
            tagline: beer.tagline,
            picture: beer.image_url,
            description: beer.description,
            date: beer.first_brewed
        });
    }
}
async function getBeerByDate(beerDate) {
    const response = await axios.get('https://api.punkapi.com/v2/beers?brewed_before=' + beerDate);
    for (let i = 0; i < response.data.length; i++) {
        const beer = response.data[i];
        addBeerCard({
            name: beer.name,
            tagline: beer.tagline,
            picture: beer.image_url,
            date: beer.first_brewed
        });
    }
}

/////UI////////////////////////////

$('#get-page-beer').click(async(pageNumber, perPage) => {
    try {
        document.getElementById('beers').innerHTML = '';
        const pageNumber = currentPageNumber;
        console.log(pageNumber);
        const perPage = document.getElementById("per-page").value;
        const beer = await getPageBeer(pageNumber, perPage);
        for (let i = 0; i < response.data.length; i++) {
            const beer = response.data[i];
            addBeerCard(beer);
        }
        addBeerCard(beer);
    } catch (error) {
        console.log("TCL: error", error)
    }
});

$('#search-by-name').click(async(beerName) => {
    try {
        document.getElementById('beers').innerHTML = '';
        const beerName = document.getElementById('search-name').value;
        const beer = await getBeerByName(beerName);
    } catch (error) {
        console.log("TCL:error", error)
    }
})


$('#remove-beers-button').click(() => {
    document.getElementById('beers').innerHTML = '';
})


$('#add-beer-button').click(async() => {
    try {
        const beer = await getRandomBeer();
        addBeerCard(beer);
    } catch (error) {
        console.log("TCL: error", error)
    }
});

function addBeerCard(beer) {
    const beerHTML = getBeerHTML(beer);
    $('#beers').append(beerHTML);
}

function getBeerHTML(beer) {
    return `<a class="beer-card" href="#popup1">
        <h2>${beer.name}</h2>
        <h3>${beer.tagline}</h3>
        </a>
        <div id="popup1" class="overlay">
            <div class="popup">
                <h2>${beer.name}</h2>
                <h3>${beer.date}</h3>
                <h3>${beer.tagline}</h3>
                <p>${beer.description}</p>
                <div class="center">
                <img src="${beer.picture}">
                </div>
                <a class="close" href="#">&times;</a>
            </div>
        </div>`;
}
$('.pagination li a').click(function(e) {
    document.getElementById('beers').innerHTML = '';

    e.preventDefault();
    $('.pagination li a').removeClass('active');
    $(this).addClass('active');
    return currentPageNumber = this.innerHTML;
});

$('#search-by-date').click(async(beerDate) => {
    try {
        document.getElementById('beers').innerHTML = '';
        const beerMonth = document.getElementById('search-month').value;
        const beerYear = document.getElementById('search-year').value;
        const beerDate = beerMonth + "-" + beerYear;
        console.log(beerDate)

        const beer = await getBeerByDate(beerDate);
    } catch (error) {
        console.log("TCL:error", error)
    }
})


//figurine animation

$(document).ready(function() {

    var s = Snap('#drinkingMan');
    var leftHand = s.select('#left-hand');
    var beer = s.select('#beer');
    var leftArm = s.select('#left-arm');
    var rightArm = s.select('#right-arm');
    var body = s.select('#body');
    var head = s.select('#head');



    var myMatrix = new Snap.Matrix();
    myMatrix.rotate(55, 0, 0);
    //myMatrix.translate(80,-130);

    drink();

    function drink() {

        leftArm.stop().animate({ transform: 'r65,70,150' }, 800,
            function() {
                leftArm.animate({ transform: 'r70,70,150' },
                    800,
                    function() {
                        leftArm.animate({ transform: 'r0,70,150' },
                            800
                        );
                    }
                );
            }
        );

        leftHand.stop().animate({ transform: 'r-110,13,185' },
            800,
            function() {
                leftHand.animate({ transform: 'r-115,13,185' },
                    800,
                    function() {
                        leftHand.animate({ transform: 'r0,13,185' },
                            800);

                    }
                );
            }
        );

        body.animate({ transform: 'r3, 100,240' },
            800,
            function() {
                body.animate({ transform: 'r3, 100,240' },
                    800,
                    function() {
                        body.animate({ transform: 'r0, 100,240' },
                            800
                        );
                    }
                );
            }
        );

        head.animate({ transform: 'r3, 100,240' },
            800,
            function() {
                head.animate({ transform: 'r3, 100,240' },
                    800,
                    function() {
                        head.animate({ transform: 'r0, 100,240' },
                            800
                        );
                    }
                );
            }
        );

        rightArm.stop().animate({ transform: 'r5, 180, 180' },
            800,
            function() {
                rightArm.stop().animate({ transform: 'r5, 180, 180' },
                    800,
                    function() {
                        rightArm.stop().animate({ transform: 'r0, 180, 180' },
                            800
                        );
                    }
                );
            }
        );

        beer.stop().animate({ transform: 'r40,80,255' },
            800,
            function() {
                beer.animate({ transform: 'r35,80,255' },
                    800,
                    function() {
                        beer.stop().animate({ transform: 'r0,80,255' },
                            800
                        );
                    }
                );
            }
        );



    } //end drink  

    setInterval(function() { drink() }, 4500);





});