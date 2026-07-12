// State variables
let playerScore = 0;
let compScore = 0;
const choices = ['rock', 'paper', 'scissors'];
const emojis = {
    'rock': '🪨',
    'paper': '📄',
    'scissors': '✂️',
    'waiting': '🤖',
    'thinking': '💭'
};

// DOM Elements
const buttons = document.querySelectorAll('.choice-btn');
const playerChoiceBox = document.getElementById('playerChoiceBox');
const compChoiceBox = document.getElementById('compChoiceBox');
const resultMessage = document.getElementById('resultMessage');
const playerScoreEl = document.getElementById('playerScore');
const compScoreEl = document.getElementById('compScore');
const playerNameInput = document.getElementById('playerName');

// Add click listeners to buttons
buttons.forEach(button => {
    button.addEventListener('click', () => {
        playRound(button.dataset.choice);
    });
});

function playRound(playerChoice) {
    // 1. Lock buttons so user can't click while computer is thinking
    toggleButtons(true);

    // 2. Display Player's Choice immediately
    playerChoiceBox.textContent = emojis[playerChoice];

    // 3. Trigger Computer Thinking Simulation
    compChoiceBox.textContent = emojis['thinking'];
    compChoiceBox.classList.add('thinking');
    resultMessage.textContent = "Computer is thinking...";
    resultMessage.className = 'result-message'; // Reset animation classes

    // 4. Simulate a delay before answering (800ms)

    // Generate computer choice
    const compChoice = choices[Math.floor(Math.random() * choices.length)];
    compChoiceBox.textContent = emojis[compChoice];

    // Determine winner
    determineWinner(playerChoice, compChoice);
    setTimeout(() => {
    // Stop thinking animation
    compChoiceBox.classList.remove('thinking');

    // Unlock buttons
    toggleButtons(false);
    }, 800);
}

function determineWinner(player, computer) {
    const playerName = playerNameInput.value || "Player";

    if (player === computer) {
        showResult(`It's a Tie! Both chose ${player}`, 'tie-anim');
        return;
    }

    const playerWins =
        (player === 'rock' && computer === 'scissors') ||
        (player === 'paper' && computer === 'rock') ||
        (player === 'scissors' && computer === 'paper');

    if (playerWins) {
        playerScore++;
        playerScoreEl.textContent = playerScore;
        showResult(`${playerName} Wins! ${player} beats ${computer}`, 'win-anim');
    } else {
        compScore++;
        compScoreEl.textContent = compScore;
        showResult(`Computer Wins! ${computer} beats ${player}`, 'lose-anim');
    }
}

function showResult(message, animationClass) {
    resultMessage.textContent = message;
    // Remove existing classes, add base class and new animation class
    resultMessage.className = 'result-message';

    // Force a browser reflow to restart the animation if the same class is applied twice
    void resultMessage.offsetWidth;

    resultMessage.classList.add(animationClass);
}

function toggleButtons(disabled) {
    buttons.forEach(btn => btn.disabled = disabled);
}