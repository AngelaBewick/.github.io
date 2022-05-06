'use strict';

let myNumber = Math.trunc(Math.random() * 20 + 1);
console.log(myNumber);

let score = 20;
let highScore = 0;

const displayMessage = function (message) {
  document.querySelector(`.message`).textContent = message;
};

document.querySelector(`.check`).addEventListener(`click`, function () {
  const guess = Number(document.querySelector(`.guess`).value);

  if (!guess) {
    //guess is a falsy value if it is left blank (it's 0). which means !guess would be a true value when it's left blank and this if statement will execute.
    // Clean code by using displayMessage for the following:
    // document.querySelector(`.message`).textContent = `Guess your number first.`;
    displayMessage(`Guess your number first.`);
  } else if (guess === myNumber) {
    //when player wins

    displayMessage(`✨ Correct Number!`);
    document.querySelector(`.number`).textContent = myNumber;
    // change style of page when player wins
    document.querySelector(`body`).style.backgroundColor = `#60b347`; //change color
    document.querySelector(`.number`).style.width = `30rem`; //change the size of the box with `?`
    if (score > highScore) {
      highScore = score;
      document.querySelector(`.highscore`).textContent = highScore;
    }
  } else if (guess !== myNumber) {
    //if player's guess is wrong
    score--;
    document.querySelector(`.score`).textContent = score;
    if (score >= 1) {
      //   document.querySelector(`.message`).textContent = guess > myNumber ? `Too High!` : `Too Low!`;
      displayMessage(guess > myNumber ? `Too High!` : `Too Low!`);
    } else {
      displayMessage(`💥 Game Over!`);
    }
  }
});

document.querySelector(`.again`).addEventListener(`click`, function () {
  score = 20;
  myNumber = Math.trunc(Math.random() * 20 + 1);
  document.querySelector(`.highscore`).textContent = highScore;
  const guess = Number((document.querySelector(`.guess`).value = ``));
  document.querySelector(`.score`).textContent = score;
  displayMessage(`Start guessing...`);
  document.querySelector(`.number`).textContent = `?`;
  document.querySelector(`body`).style.backgroundColor = `#222`; //change color
  document.querySelector(`.number`).style.width = `15rem`; //change the size of the box with ?
});
