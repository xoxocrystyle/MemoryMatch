$(document).ready(function() {
    randomCards();
    $(".card").on("click", card_clicked);
    $("#intro").hide().fadeIn(100);
    $("#play").on("click", function (e) {
        e.preventDefault();
        $("#intro").fadeOut(1000);
    });
    $("#play").click(play);
    $("#pause").click(pause);
});

//shuffle le images
function randomCards() {
    var images = ['images/amethyst.png',
        'images/connie.png',
        'images/garnet.png',
        'images/greg.png',
        'images/lars.png',
        'images/pearl.png',
        'images/peridot.png',
        'images/steven.png',
        'images/rosequartz.png'];
    var totalCards = 18;

// makes multiple of images array
    var cards = images.concat(images);
    var all_cards = cards.length;

//new array with randomized images
    var random_images = [];
    for (var i = 0; i < all_cards; i++) {
        var random = Math.floor((Math.random() * cards.length));
        random_images.push(cards.splice(random, 1));
    }

//appending cards to the game area
    for (var j = 0; j < totalCards; j++) {
        console.log('card' + j);
        var card_div = $('<div>').addClass('card');
        var back_div = $('<div>').addClass('back').html('<img src="images/stevenBack.png">');
        var front_div = $('<div>').addClass('front').html('<img src="' + random_images[j] + '"></div>');
        card_div.append(back_div);
        card_div.append(front_div);
        $('#game-area').append(card_div);
    }
}


//***cards and stats****//

var firstCard = null;
var secondCard = null;
var matches = 0;
var accuracy = 0;
var games_played = 0;
var total_possible_matches = 9;
var attempts = 0;

//flip thou cards
function toggleCard (cardFlip){
    return cardFlip.find(".back").toggleClass("hidden");
}

//click thou cards
function card_clicked () {
    if (!firstCard) {
        firstCard = this;
        toggleCard($(firstCard));
    } else {
        if (this === firstCard) {
            return;
        } else {
            secondCard = this;
            toggleCard($(secondCard));
            var firstCardFlip = $(firstCard).find(".front").find("img").attr("src");
            var secondCardFlip = $(secondCard).find(".front").find("img").attr("src");
            if (firstCardFlip === secondCardFlip) {
                matches++;
                console.log("matches" + matches);
                firstCard=null;
                secondCard=null;
            } else {
                attempts++;
                console.log("counter" + attempts);
                $(".card").off();
                setTimeout(function () {
                    $(".card").on("click", card_clicked);
                    toggleCard($(firstCard));
                    toggleCard($(secondCard));
                    firstCard=null;
                    secondCard=null;
                }, 1000);
                    firstCardFlip = null;
                    secondCardFlip = null;
                if (matches === 10) {
                        console.log("You won");
                } else {
                    return;
                }
            }
        }
    }

    if (attempts === 15) {
        $("#you-lose").show("slow").addClass('slide', 1000)
        $("#game-board").off();
    }
    if (matches === 9) {
        $("#you-won").show("slow").addClass('slide', 1000)
    }

//add thou stats

//var can i click cards
//wherever you have 2 cards, can i click cards to false.


    //reset stats still buggy - work in progress atm
    $(".reset").on("click", function(){
        games_played++;
        reset_stats();
       
    });

    displayStats();

    function displayStats () {
        $(".games-value").text(games_played);
        $(".attempts-value").text(attempts);
        if (attempts > 0) {
            $(".accuracy-value").text(percentage());
        }
    }

    function reset_stats(){
        accuracy = 0;
        matches = 0;
        attempts = 0;
        displayStats();
    }



    function percentage () {
        var output = (((matches / attempts).toFixed(2)) * 100) + "%";
        return  output;
    }

}

//audio
var pr = new Audio("NaturalLight.mp3");
pr.play();

function play(){
pr.play();
}


function pause(){
    pr.pause();
}

//cheat code
function operationCwal (){
    $(".back").css('opacity', 0.1);
}





