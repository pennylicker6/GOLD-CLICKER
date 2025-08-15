let money = 0;
let currentMultiplier = 1;

const costs = {
    2: 50,
    4: 100,
    8: 175
};

function addGold(amount = 1) {
    money += amount * currentMultiplier;
    updateGoldDisplay();
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
    } else {
        alert(`Not enough gold! You need ${costs[chosenMult]} gold.`);
    }
}

function checkMultiplier() {
    const mult = document.getElementById('Mult');
    mult.textContent = `Multiplier: ${currentMultiplier}`;
}

function updateGoldDisplay() {
    document.getElementById('quantity').textContent = `Gold: ${money}`;
}
