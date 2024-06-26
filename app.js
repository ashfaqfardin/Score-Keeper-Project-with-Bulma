const p1 = {
    nameInput: document.querySelector('#player1Name'),
    name: '',
    score: 0,
    button: document.querySelector('#p1Button'),
    display: document.querySelector('#p1Display'),
    enterButton: document.querySelector('#p1Enter')
}

const p2 = {
    nameInput: document.querySelector('#player2Name'),
    name: '',
    score: 0,
    button: document.querySelector('#p2Button'),
    display: document.querySelector('#p2Display'),
    enterButton: document.querySelector('#p2Enter')
}

const resetButton = document.querySelector('#reset');
const winningScoreSelect = document.querySelector('#playto');
const winnerMessage = document.querySelector('#winnerMessage');
let winningScore = 3;
let isGameOver = false;

function updateScores(player, opponent) {
    if (!isGameOver) {
        player.score += 1;
        if (player.score === winningScore && (player.score - opponent.score) >= 2) {
            isGameOver = true;
            player.display.classList.add('has-text-success');
            opponent.display.classList.add('has-text-danger');
            player.button.disabled = true;
            opponent.button.disabled = true;
            winnerMessage.textContent = `${player.name || 'Player One'} wins!`;
        }
        player.display.textContent = player.score;
    }
}

p1.button.addEventListener('click', function() {
    updateScores(p1, p2);
})

p2.button.addEventListener('click', function() {
    updateScores(p2, p1);
})

winningScoreSelect.addEventListener('change', function() {
    winningScore = parseInt(this.value);
    reset();
})

resetButton.addEventListener('click', reset);

function reset() {
    isGameOver = false;
    for (let p of [p1, p2]) {
        p.score = 0;
        p.display.textContent = 0;
        p.display.classList.remove('has-text-success', 'has-text-danger');
        p.button.disabled = false;
        p.nameInput.disabled = false;
        p.nameInput.value = '';
        p.name = '';
        winnerMessage.textContent = '';
    }
}

p1.enterButton.addEventListener('click', function() {
    p1.name = p1.nameInput.value;
    p1.nameInput.disabled = true;
});

p2.enterButton.addEventListener('click', function() {
    p2.name = p2.nameInput.value;
    p2.nameInput.disabled = true;
});
