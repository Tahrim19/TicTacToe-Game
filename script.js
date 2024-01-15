const button = document.querySelectorAll(".button-option");
const RestartButton = document.getElementById("restart-button");
const popup = document.querySelector(".popup");
const newGameButton = document.getElementById("new-game");
const msg = document.getElementById("message");

// Winning Pattern Array:
let winPattern = [
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 7],
  [2, 4, 6],
];

let xTurn = true;
let count = 0;
let turnElement;

function updateTurnText(text) {
    if (turnElement) {
        document.body.removeChild(turnElement);
    }
    turnElement = document.createElement('div');
    turnElement.classList.add('turn');
    turnElement.textContent = text;
    document.body.appendChild(turnElement);
}

function removeEventListener(element) {
    element.removeEventListener('click', () => {});
}

button.forEach((element) => {
    element.addEventListener('click', () => {
        if (xTurn) {
            xTurn = false;
            element.innerHTML = 'X';
            updateTurnText('It\'s O turn!');
        } else {
            xTurn = true;
            element.innerHTML = 'O';
            updateTurnText('It\'s x turn!');
        }
        count++;
        if(count === 9){
            draw();
        }
        winCheck();
    });
    removeEventListener(element);
});

const winCheck = () => {
    for(let i of winPattern){
        let[element1,element2,element3] = [
            button[i[0]].innerText,
            button[i[1]].innerText,
            button[i[2]].innerText
        ];

        if(element1 != '' && element2 != '' && element3 != ''){
            if(element1 == element2 && element2 == element3){
                winFunction(element1);
            }
        }
    }
}


const winFunction = (letter) => {
    disableButtons();
    if(letter == 'X'){
        msg.innerHTML = 'Player X Won!';
        setupReloadButton("new-game");
    }
    else{
        msg.innerHTML = 'Player O Won!';
        setupReloadButton("new-game");
    }
}

const disableButtons = () => {
    button.forEach((element) => element.disabled = true);
    popup.style.display = 'flex';
    popup.classList.add('popup');
};

// enable all buttons for new game and restart
const enableButton = () => {
    button.forEach(element => {
        element.innerText = '';
        element.disabled =  false;
    });
    popup.style.display = 'none';
    popup.classList.remove('popup');
}

newGameButton.addEventListener('click' , () => {
    count = 0;
    enableButton();
    setupReloadButton("new-game");
});

RestartButton.addEventListener('click' , () => {
    count = 0;
    enableButton();
    setupReloadButton("restart-button");
});

const draw = () => {
    disableButtons();
    msg.classList.add('message');
    msg.innerHTML = 'Its a Draw!';
    setupReloadButton("new-game");
}


const setupReloadButton = (buttonId) => {
    const reloadButton = document.getElementById(buttonId);

    if (reloadButton) {
        reloadButton.addEventListener('click', () => {
            location.reload();
        });
    } else {
        console.error(`${buttonId} button not found`);
    }
};



