const cardscontainer = document.getElementById("cards");
let firstCard, secondCard;
let cards = [];
let score = 0;
let lockboard = false;
document.getElementById("score").textContent = "score:" + score;
fetch("./data/cards.json")
.then((res) => res.json())
.then((data) =>{
    cards = [...data,...data];
    shuffleCards();
    generateCards();
    console.log(cards);
})
function shuffleCards(){
    let currentIndex = cards.length; // 18
    let randomIndex;
    let tempvalue;
    while (currentIndex !== 0){
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        tempvalue = cards[currentIndex];
        cards[currentIndex] = cards[randomIndex];
        cards[randomIndex] = tempvalue;
    }
}
function generateCards (){
    for (let card of cards){
        const cardElement = document.createElement("div");
        cardElement.classList.add("card");
        cardElement.setAttribute("data-name" , card.name);
        cardElement.innerHTML=`
        <div class="front">
            <img class="front-image" src=${card.image}>
        </div>
        <div class="back"></div>
        `;
        cardscontainer.appendChild(cardElement);
       // cardElement.addEventlistener( "click", flipCard);
        cardElement.addEventListener("click",flipCard);
    } 
}
function flipCard(){
    if(lockboard) return;
    if(this===firstCard) return;

    this.classList.add("flipped");

    if(!firstCard){
        firstCard=this;
        return;
    }
    secondCard=this;

    lockboard =true;
    checkForMatch();

}  
function checkForMatch()
{
let isMatch = firstCard.dataset.name === secondCard.dataset.name;
if(isMatch){
    disableCards();
}
else{
    unflipCards();
}
}
function unlockBoard() {
firstCard = null;
secondCard = null;
lockboard = false; 
}
function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    score++;
    document.getElementById("score").textContent = "score:" + score;

    unlockBoard();
}
function unflipCards(){
  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
unlockBoard();},1000)
  }
function restart(){
    shuffleCards();
    unlockBoard();
    cardscontainer.innerHTML = "";
    generateCards();
    score = 0;
    document.getElementById("score").textContent = score;
}