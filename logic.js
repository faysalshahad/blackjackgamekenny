let dealerSum = 0, yourSum = 0, dealerAceCount = 0, yourAceCount = 0, 
hidden, deck, canHit = true;

const replayGame = document.querySelector("#replayButton");

replayGame.addEventListener("click", playAgain);

window.onload = function playBlackJack() {
    buildDeck();
    shuffleDeck();
    startGame();
};

function buildDeck() {
    let values = 
    ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let types = ["C", "D", "H", "S"];
    deck = [];

    for (let i = 0; i < types.length; i++) {
        for (let j = 0; j < values.length; j++) {
            /**These namings are equivalent to our card images saved inside 
             * our cards folder. In this way we will build all 52 cards
             * inside our card deck.*/
            deck.push(values[j]+ "-"+ types[i]);
        }
    //console.log("All 52 Cards" +deck);
    }
}

function shuffleDeck() {
    for (let i = 0; i < deck.length; i++) {
       let j = Math.floor(Math.random() * deck.length);
       let temp = deck[i];
       deck[i] = deck[j];
       deck [j] = temp;        
    }
    //console.log("All 52 Cards" +deck);
}

function startGame() {
    /**JavaScript Array pop()
    The pop() method removes the last element from an array and returns 
    that element.*/
    hidden = deck.pop();
    dealerSum += getValue(hidden);
    dealerAceCount += checkAce(hidden);
    //console.log("Hidden Card " +hidden);
    //console.log("Dealer Sum " +dealerSum);
    while (dealerSum < 17) {
        /**Creating Image element */
        let cardImg = document.createElement("img");
        let card = deck.pop();
        /**Creating the source for the card image */
        cardImg.src = "./cards/" + card + ".png";
        dealerSum += getValue(card);
        dealerAceCount += checkAce(card);
        /**The append() method inserts specified content at the end of 
         * the selected elements. Adding an image one after another until
         * the while loops last */
        document.getElementById("dealer-cards").append(cardImg);
    }
   // console.log("Dealer Sum after the Image " + dealerSum);
    
    /**Assigning two cards initially to you or the player */
    for (let i = 0; i < 2; i++) {
        /**Creating Image element */
        let cardImg = document.createElement("img");
        let card = deck.pop();
        /**Creating the source for the card image */
        cardImg.src = "./cards/" + card + ".png";
        yourSum += getValue(card);
        yourAceCount += checkAce(card);
        /**The append() method inserts specified content at the end of 
         * the selected elements. Adding an image one after another until
         * the while loops last */
        document.getElementById("your-cards").append(cardImg);
        /**Displaying the Total Sum of your cards whatever is available to
         * you right now.*/
        document.getElementById("your-sum").innerText = yourSum;
    }
    //console.log("Your Sum after the Image " + yourSum);
    /**Adding addEventListener for hit button and after click hit is the 
     * name of the callback function.*/
    document.getElementById("hitButton").addEventListener("click", hit);
    /**Adding addEventListener for stay button and after click stays is the 
     * name of the callback function.*/
    document.getElementById("stayButton").addEventListener("click", stay);
}

function hit() {
    if (!canHit) {
        return;
    }
        /**Creating Image element */
        let cardImg = document.createElement("img");
        let card = deck.pop();
        /**Creating the source for the card image */
        cardImg.src = "./cards/" + card + ".png";
        yourSum += getValue(card);
        yourAceCount += checkAce(card);
        /**The append() method inserts specified content at the end of 
         * the selected elements. Adding an image one after another until
         * the while loops last */
        document.getElementById("your-cards").append(cardImg);
         /**Displaying the Total Sum of your cards whatever is available to
         * you right now.*/
         document.getElementById("your-sum").innerText = yourSum;
        /**Calling function called reduceAce*/
        if (reduceAce(yourSum, yourAceCount) > 21) {
            canHit = false;
            document.getElementById("hitButton").disabled = true;
        }
}

function stay() {
    dealerSum = reduceAce(dealerSum, dealerAceCount);
    yourSum = reduceAce(yourSum, yourAceCount);
    canHit = false;
    document.getElementById("hitButton").disabled = true;
    document.getElementById("stayButton").disabled = true;
    /**Revealing the hidden card from the dealer side */
    document.getElementById("hidden").src = "./cards/" + hidden + ".png";

    let message = "";

    if (yourSum > 21) {
        message = "You Lose!";
    } else if (dealerSum > 21 && yourSum < 21) {
        message = "You Win!";
    } else if (dealerSum === yourSum) {
        message = "It is a Draw!"
    } else if (yourSum > dealerSum) {
        message = "You Win!";
    } else if (yourSum < dealerSum) {
        message = "You Lose!";
    }
    document.getElementById("dealer-sum").innerText = dealerSum;
    document.getElementById("your-sum").innerText = yourSum;
    document.getElementById("resultsText").innerText = `This Round's Result: ${message}`;
}

function getValue(card) {
    /**Card picture has been saved with "-" in the middle of a value and 
     * type. For an instance 4-C is the card name in the card folder.
     * car.split will separate 4 and C and store them inside an array []
     * like the following way ["4" , "C"]
    */
    let data = card.split("-");
    let value = data[0];

    /**Checking whether the card value contains any number digits or not.
     * The JavaScript isNaN() Function is used to check whether a given 
     * value is an illegal number or not. It returns true if the value is a 
     * NaN else returns false. It is different from the Number.
     */
    if (isNaN(value)) {
        if (value === "A") {
            return 11;
        } else { 
            /** if it is not A then it will be either King, Queen or Joker */
            return 10;
        }
    } else {
        /**The parseInt method parses a value as a string and returns the 
         * first integer */
        return parseInt(value);
    }
}

function checkAce(card) {
    if (card[0] === "A") {
        return 1;
    }
    return 0;
}

function reduceAce(playerSum, playerAceCount) {
    /**Creating while loop where playerSum exceeds 21 number and
     * player has a Ace in their hand*/
    while (playerSum > 21 && playerAceCount > 0) {
        /**If you have more than 21 and a Ace then it will reduce the
         * playerSum by 10 and reducing the AceCount by 1.
         */
        playerSum -= 10;
        playerAceCount -= 1;
    }
    return playerSum;
}

function playAgain() {
    window.location.reload();
}