// Initiate players
const namePlayer1_txt = document.querySelector("#player1-name");
const readyPlayer1_btn = document.querySelector("#ready-player1");
const namePlayer2_txt = document.querySelector("#player2-name");
const readyPlayer2_btn = document.querySelector("#ready-player2");

// start/restart button
const start_btn = document.querySelector("#start-restart");


// Cells of board
const cells = document.querySelectorAll(".cell");

// Board
const board = document.querySelector(".board");


// Paragrpah for messages
const message = document.querySelector("p");

let player1;
let player2;


// gameBoard with Module Pattern
const GameBoard = (() => {
    let currentPlayerTurn;
    let markedCells;

    const startGame = () => {
        board.disabled = false;
        //board.removeAttribute('disabled');
        board.classList.remove("disabled-div");
        for (let i = 0; i < cells.length; i++) {
            cells[i].disabled = false;
            //cells[i].removeAttribute('disabled');
            cells[i].classList.remove("disabled-div");
        }
        currentPlayerTurn = player1;
        markedCells = 0;
        displayController.showCurrentTurn();
        // Make cells content empty
        cells.forEach((cell, index) => {
            cell.innerText = "";
        });
        player1.restartMarkedCells();
        player2.restartMarkedCells();
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

    const showWinner = (player) => {
        message.innerText = player.getName() + " WINS";
        //board.setAttribute('disabled', disabled);
        board.classList.add("disabled-div");
        board.disabled = true;
        for (let i = 0; i < cells.length; i++) {
            cells[i].disabled = true;
            cells[i].setAttribute('disabled', disabled);
            cells[i].classList.add("disabled-div");
        }
    }


    return {
        markCell,
        showCurrentTurn,
        showWinner
    }
})();


// players Factory Function
const playerFactory = (name, marker) => {
    let markedPlayerCells = [];
    const getName = () => name;
    const getMarker = function() {
        return marker;
    }
    const addMarkedPlayerCell = numCell => {
        markedPlayerCells.push(numCell);
    };
    const restartMarkedCells = () => {
        markedPlayerCells = [];
    };
    const getMarkedCells = () => {
        return markedPlayerCells;
    }
    return {getName, getMarker, addMarkedPlayerCell, restartMarkedCells, getMarkedCells};
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
            if (GameBoard.getCurrentPlayerTurn().getMarker() == player1.getMarker()) {

                player1.addMarkedPlayerCell(Number(cell.getAttribute("data-num-cell")));
                if (checkWinCondition(player1)) {
                    return;
                }


            } else if (GameBoard.getCurrentPlayerTurn().getMarker() == player2.getMarker()) {

                player2.addMarkedPlayerCell(Number(cell.getAttribute("data-num-cell")));
                
                if (checkWinCondition(player2)) {
                    return;
                }
            }
            
            GameBoard.changeCurrentPlayerTurn();
        }
        
    });
});

function checkWinCondition(player) {
    const markedPlayerCells = player.getMarkedCells();

    
    if (
        // Horizontal
        (markedPlayerCells.includes(1) && markedPlayerCells.includes(2) && markedPlayerCells.includes(3)) ||
        (markedPlayerCells.includes(4) && markedPlayerCells.includes(5) && markedPlayerCells.includes(6)) ||
        (markedPlayerCells.includes(7) && markedPlayerCells.includes(8) && markedPlayerCells.includes(9)) ||
        // Diagonal
        (markedPlayerCells.includes(1) && markedPlayerCells.includes(5) && markedPlayerCells.includes(9)) ||
        (markedPlayerCells.includes(3) && markedPlayerCells.includes(5) && markedPlayerCells.includes(7)) ||
        // Vertical
        (markedPlayerCells.includes(1) && markedPlayerCells.includes(4) && markedPlayerCells.includes(7)) ||
        (markedPlayerCells.includes(2) && markedPlayerCells.includes(5) && markedPlayerCells.includes(8)) ||
        (markedPlayerCells.includes(3) && markedPlayerCells.includes(6) && markedPlayerCells.includes(9))
        ) {
        displayController.showWinner(player);
        return true;
    }
}


start_btn.addEventListener("click", function () {
    GameBoard.startGame();
});