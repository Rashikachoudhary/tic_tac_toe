
// let board = ["", "", "", "", "", "", "", "", ""];
// let gameOver = false;

// function makeMove(index) {
//     if (board[index] === "" && !gameOver) {

//         // Player move
//         board[index] = "X";
//         updateBoard();

//         // 🔥 Check if player wins
//         if (checkWinner("X")) {
//             document.getElementById("status").innerText = "You Win!";
//             gameOver = true;
//             return;
//         }

//         // 🔥 Check draw BEFORE AI move
//         if (!board.includes("")) {
//             document.getElementById("status").innerText = "It's a Draw!";
//             gameOver = true;
//             return;
//         }

//         // AI move
//         fetch("/ai-move", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({ board: board })
//         })
//         .then(response => response.json())
//         .then(data => {
//             board = data.board;
//             gameOver = data.game_over;
//             document.getElementById("status").innerText = data.message;
//             updateBoard();
//         });
//     }
// }

// function updateBoard() {
//     document.querySelectorAll(".cell").forEach((cell, index) => {
//         cell.innerText = board[index];
//     });
// }

// // 🔥 Winner check (frontend)
// function checkWinner(player) {
//     const winPatterns = [
//         [0,1,2],[3,4,5],[6,7,8],
//         [0,3,6],[1,4,7],[2,5,8],
//         [0,4,8],[2,4,6]
//     ];

//     return winPatterns.some(pattern =>
//         pattern.every(i => board[i] === player)
//     );
// }

// function restartGame() {
//     board = ["", "", "", "", "", "", "", "", ""];
//     gameOver = false;
//     document.getElementById("status").innerText = "";
//     updateBoard();
// }
let board = ["", "", "", "", "", "", "", "", ""];
let gameOver = false;

function makeMove(index) {
    if (board[index] === "" && !gameOver) {

        // Player move
        board[index] = "X";
        updateBoard();

        // Check if player wins
        if (checkWinner("X")) {
            const status = document.getElementById("status");
            status.innerText = "You Win!";
            status.className = "winner";

            gameOver = true;
            return;
        }

        // Check draw BEFORE AI move
        if (!board.includes("")) {
            const status = document.getElementById("status");
            status.innerText = "It's a Draw!";
            status.className = "draw";

            gameOver = true;
            return;
        }

        // ⏳ 1.5 second delay before AI move
        document.getElementById("status").innerText = "";

        setTimeout(() => {
            fetch("/ai-move", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ board: board })
            })
            .then(response => response.json())
            .then(data => {
                board = data.board;
                gameOver = data.game_over;
                document.getElementById("status").innerText = data.message;
                updateBoard();
            });
        }, 500); 
    }
}

function updateBoard() {
    document.querySelectorAll(".cell").forEach((cell, index) => {
        cell.innerText = board[index];
    });
}

function checkWinner(player) {
    const winPatterns = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];

    return winPatterns.some(pattern =>
        pattern.every(i => board[i] === player)
    );
}

function restartGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    gameOver = false;

    const status = document.getElementById("status");
    status.innerText = "";
    status.className = "";

    updateBoard();
}

