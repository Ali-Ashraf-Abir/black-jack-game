// Define card values and suits
const values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
const suits = ["hearts", "diamonds", "clubs", "spades"];

// Create a deck of cards
let deck = [];
for (let i = 0; i < values.length; i++) {
  for (let j = 0; j < suits.length; j++) {
    deck.push(values[i] + " of " + suits[j]);
  }
}

// Shuffle the deck
function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

// Deal a card from the deck
function dealCard(deck) {
  return deck.shift();
}

// Calculate the value of a hand
function calculateHandValue(hand) {
  let value = 0;
  let numAces = 0;
  for (let i = 0; i < hand.length; i++) {
    const cardValue = hand[i].split(" ")[0];
    if (cardValue === "A") {
      numAces++;
      value += 11;
    } else if (["J", "Q", "K"].includes(cardValue)) {
      value += 10;
    } else {
      value += parseInt(cardValue);
    }
  }
  while (numAces > 0 && value > 21) {
    value -= 10;
    numAces--;
  }
  return value;
}

// Set up the game
let playerHand = [];
let dealerHand = [];
let playerHandValue = 0;
let dealerHandValue = 0;

function startGame() {
  deck = shuffleDeck(deck);
  playerHand = [dealCard(deck), dealCard(deck)];
  dealerHand = [dealCard(deck), dealCard(deck)];
  playerHandValue = calculateHandValue(playerHand);
  dealerHandValue = calculateHandValue(dealerHand);
}

// Play the game
function playGame() {
    startGame();
    console.log("Player's hand: ", playerHand, " Value: ", playerHandValue);
    console.log("Dealer's hand: ", [dealerHand[0], "unknown"]);

    const playerhand=document.getElementById("player-hand")
    const dealerhand=document.getElementById("dealer-hand")
    const createNewTag=document.createElement("p")
    createNewTag.classList.add("text-player")
    const createNewTagForDealer=document.createElement("p")
    createNewTagForDealer.classList.add("text-dealer")
    createNewTag.innerHTML=`

    player's hand: "${playerHand}" value: "${playerHandValue}

    `
    createNewTagForDealer.innerHTML=`
    "Dealer's hand: ", ${dealerHand[0]}, "unknown"
    
    `
    playerhand.appendChild(createNewTag)
    dealerhand.appendChild(createNewTagForDealer)

  
    let playerTurn = true;

    let hitOrStand="none"

      document.getElementById("hit").addEventListener("click",function(){
        hitOrStand="hit"
        console.log(hitOrStand)
        playerHand.push(dealCard(deck));
        playerHandValue = calculateHandValue(playerHand);
        console.log("Player's hand: ", playerHand, " Value: ", playerHandValue);
        createNewTag.innerHTML=`
        player's hand: ${playerHand} value: ${playerHandValue}
        `
        if (playerHandValue > 21) {
          const createlosetext=document.createElement("p")
          createlosetext.classList.add("text-red")
          createlosetext.innerHTML='playerburst!! you lost!!'
          playerhand.appendChild(createlosetext)
          playerTurn=false
        }
      })


    document.getElementById("stand").addEventListener("click",function(){
        console.log(dealerHandValue)
        if (playerHandValue <= 21) {

            if(dealerHandValue >=17){
                createNewTagForDealer.innerHTML=`
              
                Dealer's hand: ${dealerHand} value:${dealerHandValue}
                `
                dealerhand.appendChild(createNewTagForDealer)
        

            }



            while (dealerHandValue < 17) {
            

              dealerHand.push(dealCard(deck));
              dealerHandValue = calculateHandValue(dealerHand);
              console.log("Dealer's hand: ", dealerHand, " Value: ", dealerHandValue);
              createNewTagForDealer.innerHTML=`
              
              Dealer's hand: ${dealerHand} value:${dealerHandValue}
              `
              dealerhand.appendChild(createNewTagForDealer)
      
              if (dealerHandValue > 21) {

                console.log("Dealer busts! Player wins.");
                const createdealerburst=document.createElement("p")
                createdealerburst.classList.add("text-green")
                createdealerburst.innerHTML=`
                Dealer busts! Player wins.
                `
                dealerhand.appendChild(createdealerburst)
                return;
              }
            }
        
            if (dealerHandValue <= 21 && dealerHandValue >= playerHandValue) {
              console.log("Dealer wins!");
              const finalmessagedealer=document.createElement("p")
              finalmessagedealer.classList.add("text-red")
              finalmessagedealer.innerText="Dealer wins"
              dealerhand.appendChild(finalmessagedealer)
            } else {
              console.log("Player wins!");
              const finalmessageplayer=document.createElement("p")
              finalmessageplayer.classList.add("text-green")
              finalmessageplayer.innerText="player wins!"
              playerhand.appendChild(finalmessageplayer)
            }
          }

    })
  

  }
let game="off"

  if(game=="off"){
  document.getElementById("deal").addEventListener("click",function(){
    playGame()
    game="started"

    
  })}

  if (game=="started"){
    document.getElementById("deal").addEventListener("click",function(){
        window.location.href="index.html"
        game="off"
    })}
