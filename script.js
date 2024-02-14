'use strict';

// // Selecting Elements
// const score0El = document.querySelector('#score--0');
// const score1El = document.getElementById('score--1');
// const current0El = document.getElementById('current--0');
// const current1El = document.getElementById('current--1');
// const diceEl = document.querySelector('.dice');
// const btnNew = document.querySelector('.btn--new');
// const btnRoll = document.querySelector('.btn--roll');
// const btnHold = document.querySelector('.btn--hold');
// const player0El = document.querySelector('.player--0');
// const player1El = document.querySelector('.player--1');

// // starting Condition
// score0El.textContent = 0;
// score1El.textContent = 0;
// diceEl.classList.add('hidden');
// let currentScore = 0;
// let flag = 1;
// let totalScore1 = 0;
// let totalScore0 = 0;

// const btnClick = function () {
//   //1. Generate a random dice roll
//   const dice = Math.trunc(Math.random() * 6) + 1;

//   //2. Display dice
//   diceEl.classList.remove('hidden');
//   diceEl.src = `dice-${dice}.png`;

//   //3. Check for rolled 1
//   if (dice !== 1) {
//     // Add dice to current score
//     currentScore += dice; 
//     //Changing the current player score
//     if (flag === 1) {
//       current0El.textContent = currentScore;
//     } else {
//       current1El.textContent = currentScore;
//     }
//   } else {
//     // Switch next player
//     if (flag === 1) {
//       player0El.classList.remove('player--active');
//       player1El.classList.add('player--active');

//       //Set active player current to zero
//       currentScore = 0;
//       current0El.textContent = 0;
//       flag = 0;
//     } else {
//       // Again Switch the players
//       player1El.classList.remove('player--active');
//       player0El.classList.add('player--active');

//       // Add Player total Score
//       totalScore1 = currentScore;

//       // Set active player current to zero
//       currentScore = 0;
//       current1El.textContent = 0;
//       flag = 1;

//     }
//   }
// }

// const btnHoldClick = function () {
//   if (flag === 1) {
//     totalScore0 += currentScore;
//     score0El.textContent = totalScore0;
//   } else {
//     totalScore1 += currentScore;;
//     score1El.textContent = totalScore1; 
//   } 
  
//   if (flag === 1) {
//     player0El.classList.remove('player--active');
//     player1El.classList.add('player--active');

//     //Set active player current to zero
//     currentScore = 0;
//     current0El.textContent = 0;
//     flag = 0;
//   } else {
//     // Again Switch the players
//     player1El.classList.remove('player--active');
//     player0El.classList.add('player--active');

//     // Add Player total Score
//     totalScore1 = currentScore;

//     // Set active player current to zero
//     currentScore = 0;
//     current1El.textContent = 0;
//     flag = 1;

//   }

//   if (totalScore0 >= Number(100) && totalScore1 < 100) {
//     score0El.textContent = '🎉 Win';
//     player1El.classList.remove('player--active');
//     player0El.classList.add('player--active');
//     btnRoll.removeEventListener('click', btnClick);
//     btnHold.removeEventListener('click', btnHoldClick);
//   }

//   console.log('sdasdsadasd');

//   if (totalScore1 >= Number(100) && totalScore0 < 100) {
//     score1El.textContent = '🎉 Win';
//     player0El.classList.remove('player--active');
//     player1El.classList.add('player--active');
//     btnRoll.removeEventListener('click', btnClick);
//     btnHold.removeEventListener('click', btnHoldClick);
//   }
// }

// // Rolling dice functionality
// btnRoll.addEventListener('click', btnClick);


// btnHold.addEventListener('click', btnHoldClick);

// btnNew.addEventListener('click', function () {
//   score0El.textContent = Number(0);
//   score1El.textContent = Number(0);

//   current0El.textContent = 0;
//   current1El.textContent = 0;

//   diceEl.classList.add('hidden');

//   player1El.classList.remove('player--active');
//   player0El.classList.add('player--active');

//   btnRoll.addEventListener('click', btnClick);
//   btnHold.addEventListener('click', btnHoldClick);

//   currentScore = 0;
//   flag = 1;
//   totalScore1 = 0;
//   totalScore0 = 0;
// })




const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');


let score, currentScore, activePlayer, playing;

// Starting conditions
const init = function () {
  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling dice Functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //3. Check for rolled 1
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //1. Add current score to active player's score
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = score[activePlayer];

    //2. Check if player's score is >=100
    if (score[activePlayer] >= 100) {
      // Finish the game
      playing = false;
      document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
      diceEl.classList.add('hidden');
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);