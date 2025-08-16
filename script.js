let money = 0;
let currentMultiplier = 1;

const costs = {
    2: 50,
    4: 100,
    8: 175
};

function loadGame() {
    const savedGold = localStorage.getItem('gold');
    const savedMultiplier = localStorage.getItem('multiplier');

    if (savedGold !== null) money = parseInt(savedGold);
    if (savedMultiplier !== null) currentMultiplier = parseInt(savedMultiplier);

    updateGoldDisplay();
    checkMultiplier();
}

function saveGame() {
    localStorage.setItem('gold', money);
    localStorage.setItem('multiplier', currentMultiplier);
}


function addGold(amount = 1) {
    money += amount * currentMultiplier;
    updateGoldDisplay();
    saveGame();
}

function buyMult() {
    const select = document.getElementById('multiplier');
    const chosenMult = parseInt(select.value);

    if (money >= costs[chosenMult]) {
        money -= costs[chosenMult];       
        currentMultiplier *= chosenMult;
        alert(`Multiplier stacked! Current multiplier: ${currentMultiplier}x`);
        checkMultiplier();
        updateGoldDisplay();
        saveGame();
    } else {
        alert(`Not enough gold! You need ${costs[chosenMult]} gold.`);
    }
}

function checkMultiplier() {
    document.getElementById('Mult').textContent = `Multiplier: ${currentMultiplier}`;
}

function updateGoldDisplay() {
    document.getElementById('quantity').textContent = `Gold: ${money}`;
}

function resetGame() {
    if (confirm("Are you sure you want to reset your game?")) {
        money = 0;
        currentMultiplier = 1;
        updateGoldDisplay();
        checkMultiplier();
        localStorage.removeItem('gold');
        localStorage.removeItem('multiplier');
    }
}

setInterval(saveGame, 5000);

window.onload = loadGame;
