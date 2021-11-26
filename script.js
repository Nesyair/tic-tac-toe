// Initiate players
const namePlayer1_txt = document.querySelector("#player1-name");
const readyPlayer1_btn = document.querySelector("#ready-player1");
const namePlayer2_txt = document.querySelector("#player2-name");
const readyPlayer2_btn = document.querySelector("#ready-player2");

// start/restart button
const start_btn = document.querySelector("#start-restart");


// Cells of board
const cells = document.querySelectorAll(".cell");

// Paragrpah for messages
const message = document.querySelector("p");

let player1;
let player2;


// gameBoard with Module Pattern
const GameBoard = (() => {
    let currentPlayerTurn;
    let markedCells;
    const startGame = () => {
        currentPlayerTurn = player1;
        markedCells = 0;
        displayController.showCurrentTurn();
        // Make cells content empty
        cells.forEach((cell, index) => {
            cell.innerText = "";
        });
    };
    const getCurrentPlayerTurn = () => currentPlayerTurn;
    const changeCurrentPlayerTurn = () => {
        if (getCurrentPlayerTurn() == player1) {
            currentPlayerTurn = player2
            displayController.showCurrentTurn();
        } else if (getCurrentPlayerTurn() == player2) {
            currentPlayerTurn = player1
            displayController.showCurrentTurn();
        }
        markedCells++

        if (markedCells >= 9) {
            message.innerText = "IT IS A DRAW"
        }
    };

    return {
        startGame,
        getCurrentPlayerTurn,
        changeCurrentPlayerTurn
    }

    }
)();

// displayController with Module Pattern
const displayController = (() => {
    
    const markCell = (player, cell) => {
        cell.innerText = player.getMarker();
    };

    const showCurrentTurn = () => {
          message.innerText = GameBoard.getCurrentPlayerTurn().getName() + " TURN";
    };



    return {
        markCell,
        showCurrentTurn
    }
})();


// players Factory Function
const playerFactory = (name, marker) => {
    const getName = () => name;
    const getMarker = function() {
        return marker;
    }
    return {getName, getMarker};
};





readyPlayer1_btn.addEventListener("click", function() {
    player1 = playerFactory(namePlayer1_txt.value, "X");
});

readyPlayer2_btn.addEventListener("click", function() {
    player2 = playerFactory(namePlayer2_txt.value, "O");
});





cells.forEach((cell, index) => {
    cell.addEventListener("click", function() {
        if (cell.innerText == "") {
            displayController.markCell(GameBoard.getCurrentPlayerTurn(), cell);
            GameBoard.changeCurrentPlayerTurn();
        }
        
    });
});


start_btn.addEventListener("click", function () {
    GameBoard.startGame();
});