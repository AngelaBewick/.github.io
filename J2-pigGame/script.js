'use strict';
// Selecting elements can use query selector or getElementById
const score0Element = document.querySelector('#score--0');
const score1Element = document.getElementById('score--1');
const current0El = document.getElementById(`current--0`);
const current1El = document.getElementById(`current--1`);
const player0El = document.querySelector(`.player--0`);
const player1El = document.querySelector(`.player--1`);
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
let totalScores, currentScore, activePlayer, gameInProgress; //give variables global scope
////////////////////////////////////////////////////////
// starting conditions and reuseable functions
const initial = function () {
  totalScores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  gameInProgress = true;

  score0Element.textContent = 0;
  score1Element.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
initial(); // call the function immediately when game loads

const changePlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  //switch to next player
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle(`player--active`);
  player1El.classList.toggle(`player--active`);
};
////////////////////////////////////////////////////////

// roll dice button
btnRoll.addEventListener('click', function () {
  //can only click if game is NOT over
  if (gameInProgress) {
    //Boolean so it's already checking for true
    // 1. generate a random dice roll 1-6
    const diceRoll = Math.trunc(Math.random() * 6) + 1;
    console.log(diceRoll);
    //display the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${diceRoll}.png`;
    // check for rolled 1, if true, skip to next player
    if (diceRoll !== 1) {
      //update current score
      currentScore += diceRoll;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else if (diceRoll === 1) {
      //change player and reset current score
      changePlayer();
    }
  }
});
////////////////////////////////////////////////////////
btnHold.addEventListener('click', function () {
  if (gameInProgress) {
    //add current score to active player's score
    totalScores[activePlayer] += currentScore;
    //update displayed score
    document.getElementById(`score--${activePlayer}`).textContent =
      totalScores[activePlayer];
    //check if score is over 100
    if (totalScores[activePlayer] < 100) {
      //if score<100 change player and reset current score
      changePlayer();
    } else {
      gameInProgress = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove(`player--active`);
      diceEl.classList.add('hidden');

      //someone wins
    }
  }
});
btnNew.addEventListener('click', function () {
  initial();
});
