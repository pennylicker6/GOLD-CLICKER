let money = 0;
let currentMultiplier = 1;

const costs = {
    2: 50,
    4: 100,
    8: 175
};

// --- Load saved game on page load ---
function loadGame() {
    const savedGold = localStorage.getItem('gold');
    const savedMultiplier = localStorage.getItem('multiplier');

    if (savedGold !== null) money = parseInt(savedGold);
    if (savedMultiplier !== null) currentMultiplier = parseInt(savedMultiplier);

    updateGoldDisplay();
    checkMultiplier();
}

// --- Save game ---
function saveGame() {
    localStorage.setItem('gold', money);
    localStorage.setItem('multiplier', currentMultiplier);
}

// --- Add gold ---
function addGold(amount = 1) {
    money += amount * currentMultiplier;
    updateGoldDisplay();
    saveGame(); // Save after each click
}

// --- Buy multiplier ---
function buyMult() {
    const select = document.getElementById('multiplier');
    const chosenMult = parseInt(select.value);

    if (money >= costs[chosenMult]) {
        money -= costs[chosenMult];       
        currentMultiplier *= chosenMult;
        alert(`Multiplier stacked! Current multiplier: ${currentMultiplier}x`);
        checkMultiplier();
        updateGoldDisplay();
        saveGame(); // Save after buying
    } else {
        alert(`Not enough gold! You need ${costs[chosenMult]} gold.`);
    }
}

// --- Update multiplier display ---
function checkMultiplier() {
    const mult = document.getElementById('Mult');
    mult.textContent = `Multiplier: ${currentMultiplier}`;
}

function updateGoldDisplay() {
    document.getElementById('quantity').textContent = `Gold: ${money}`;
}

// --- Reset game ---
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
