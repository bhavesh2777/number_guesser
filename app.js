/* 
 Game Function :- 
  - Player must guess a number between min and max
  - Player gets a certain amount of guesses
  - Notify player of guesses remaining
  - Notify the player the correct answer if lose
  - let player choose to play again.
*/

// Game Value
let min = 1,
  max = 10,
  winningNum = getRandomNum(),
  guessesLeft = 3;

// UI Elements

const game = document.querySelector("#game");
const minNum = document.querySelector(".min-num");
const maxNum = document.querySelector(".max-num");
const guessBtn = document.querySelector("#guess-btn");
const guessInput = document.querySelector("#guess-input");
const message = document.querySelector(".message");

minNum.textContent = min;
maxNum.textContent = max;

// Play Again Evenet Listener
game.addEventListener("mousedown", function(e) {
  if (e.target.value === "Play Again") {
    window.location.reload();
  }
});

// Listen for guess
guessBtn.addEventListener("click", function() {
  // guess input value is string and we want to compare so it must be num  && null value as a number is NaN = not a number
  let guess = parseInt(guessInput.value);

  // validate
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(
      ` Enter a number between ${min} and ${max} Fucker! Blind person`,
      "red"
    );
  }

  // check if won
  if (guess === winningNum) {
    // Game Over : Won
    gameOver(true, `${winningNum} is Correct!, YOU WIN!`);
  } else {
    guessesLeft -= 1;

    if (guessesLeft === 0) {
      // Game Over : lost
      gameOver(
        false,
        `Fuck You! You Lost, The correct Number was ${winningNum}`
      );
    } else {
      // Game continue : wrong ans
      setMessage(
        `${guess} Is Not Correct! ${guessesLeft} Guesses Left`,
        `blue`
      );

      guessInput.style.borderColor = "blue";
      guessInput.value = "";
    }
  }
});

function gameOver(won, msg) {
  let color;
  won === true ? (color = "green") : (color = "red");

  guessInput.disabled = true;
  guessInput.style.borderColor = color;
  setMessage(msg, color);

  // play again?
  guessBtn.value = "Play Again";
  guessBtn.className = "play-again";
}

// Random Num
function getRandomNum() {
  return Math.floor(Math.random() * 10 + 1);
}

function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}
