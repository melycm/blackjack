$(function gameReady() {
    $('#play-again').hide();
  
var cardDeck = [];

function deckCards(){
    var suits = ["H", "D", "C", "S"];
    var values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    // var scores = ["11", "2", "3", "4", "5", "6", "7", "8", "9", "10", "10", "10"];

    var card = {};

    suits.forEach(function(suitCard){
        values.forEach(function(pointCard){
                card.suit = suitCard;
                card.type = pointCard;
                card.imgURl = "images/cards/" + pointCard + suitCard + ".jpg";

                switch(pointCard){

                    case "A":
                      card.value = "11";
                      break;
                    case "J":
                       card.value = "10";
                       break;
                    case "Q": 
                       card.value = "10";
                       break;
                    case "K":
                       card.value = "10";
                       break;
                    default:
                       card.value = pointCard;
                       break;
                }
                cardDeck.push(card);
                
                card = {};
                })
            
        })
        
       
}

//Trying to work the cards (points)
    function calculatePointsDealer(Hand) {
        value = []
        var sum = 0
        Hand.forEach(function (card) {
            sum = sum +parseInt(card.value);
        })
            var dealerPoints = document.getElementById("dealer-points");
            dealerPoints.innerHTML = (sum.toString() + " points")
            
        console.log("sum", sum)
        return sum;
    }

    function calculatePointsPlayer(Hand) {
        var value = []
        var sum = 0;

        Hand.forEach(function (card) {
            sum = sum + parseInt(card.value);
        })
            var playerPoints = document.getElementById("player-points");
            playerPoints.innerHTML = (sum.toString() + " points")

        console.log("sum", sum)
        return sum;
    }

// Shuffle the deck of cards 
function shuffleArray(cardDeckShuffle) {
    for (var i =cardDeckShuffle.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = cardDeckShuffle[i];
        cardDeckShuffle[i] = cardDeckShuffle[j];
        cardDeckShuffle[j] = temp;
    }
    return cardDeckShuffle;
}

//Function to the buttons
var pictures = document.querySelectorAll("button");

var dealerHand = [];
var playerHand = [];

document.getElementById("deal-button").addEventListener("click", function(){
    //write dealer logic here
    deckCards();
    cardDeck = shuffleArray(cardDeck);
    var tempCard = cardDeck.pop()
    dealerHand.push(tempCard);
    tempCard = cardDeck.pop()
    dealerHand.push(tempCard);
    tempCard = cardDeck.pop()
    playerHand.push(tempCard);
    tempCard = cardDeck.pop()
    playerHand.push(tempCard);

    var dealerContainer = document.getElementById("dealer-hand");

    var img = document.createElement("img");
    img.src = dealerHand[0].imgURl;
    dealerContainer.appendChild(img);

    var img2 = document.createElement("img");
    img2.src = dealerHand[1].imgURl;
    dealerContainer.appendChild(img2);
    
    var playerContainer = document.getElementById("player-hand");

    var img3 = document.createElement("img");
    img3.src = playerHand[0].imgURl;
    playerContainer.appendChild(img3);

    var img4 = document.createElement("img");
    img4.src = playerHand[1].imgURl;
    playerContainer.appendChild(img4);

    calculatePointsPlayer(playerHand)
    calculatePointsDealer(dealerHand)

});

document.getElementById("hit-button").addEventListener("click", function(){
    //write "hit" logic here3
    
    deckCards();
    cardDeck = shuffleArray(cardDeck);
    
    var tempCard = cardDeck.pop()
    playerHand.push(tempCard);
    

    // console.log(tempCard);

    var playerContainer = document.getElementById("player-hand");

    var img5 = document.createElement("img");
    img5.src = playerHand[2].imgURl;
    playerContainer.appendChild(img5);
    
    //calculatePointsPlayer(playerHand)
    console.log("here", playerHand);
    console.log("calculation: ", calculatePointsPlayer(playerHand)); 
    
    
    while(calculatePointsPlayer(playerHand)){
        if (calculatePointsPlayer(playerHand) > 21) {
            $('#messages').text('You Loose!');
            gameOver();
            // break;
        }
        break;
    }
});

document.getElementById("stand-button").addEventListener("click", function(){
    while(calculatePointsDealer(dealerHand) < 17){
            deckCards();
            cardDeck = shuffleArray(cardDeck);
            var tempCard = cardDeck.pop()
            dealerHand.push(tempCard);
    
            var dealerContainer = document.getElementById("dealer-hand");
    
            var img6 = document.createElement("img");
            img6.src = dealerHand[2].imgURl;
            dealerContainer.appendChild(img6);

            calculatePointsDealer(dealerHand);
            break;
        }
        if(calculatePointsDealer(dealerHand) > 21){
            var notice = document.getElementById("messages");

            var message1 = document.createElement("div");
            message1.textContent = "Player Wins!"
            notice.appendChild(message1);
            gameOver();
            
        }
        else if(calculatePointsPlayer(playerHand) > 21){
            var notice2 = document.getElementById("messages");

            var message2 = document.createElement("div");
            message2.textContent = "You lose! Dealer wins!"
            notice2.appendChild(message2);
            gameOver();
            
        }
        else{
            var dPoints = calculatePointsDealer(dealerHand);
            var pPoints = calculatePointsPlayer(playerHand);
            if(dPoints > pPoints){
                var notice3 = document.getElementById("messages");

                var message3 = document.createElement("div");
                message3.textContent = "You lose! Dealer wins!"
                notice3.appendChild(message3);
                gameOver();
                
            }
            else if(pPoints > dPoints){
                var notice4 = document.getElementById("messages");

                var message4 = document.createElement("div");
                message4.textContent = "Player Wins!"
                notice4.appendChild(message4);
                gameOver();
                
            }
        }
    
})

$('#play-again').click(function() {
    $('#deal-button').show();
    $('#hit-button').show();
    $('#stand-button').show();
    $('#play-again').hide();
    $('#player-hand').html('');
    $('#dealer-hand').html('');
    $('#messages').text('');
    $('#player-points').text('');
    $('#dealer-points').text('');
    setupNewGame();
  });

function gameOver() {
    $('#deal-button').hide();
    $('#hit-button').hide();
    $('#stand-button').hide();
    $('#play-again').show();
  }

  function setupNewGame() {
    deck = deckCards();
    dcardDeck = shuffleArray(cardDeck);
    dealerHand = [];
    playerHand = [];
  }
})
