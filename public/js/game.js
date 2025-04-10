const socket = io();
const chess = new Chess();
const boardElement = document.querySelector(".chessBoard");

let draggedPiece = null;
let sourceSquare = null;
let playerRole = null;

const renderBoard = () => {
    const board = chess.board();
    boardElement.innerHTML = "";
    board.forEach((row, rowindex) => {
        row.forEach((square, squareindex) => {
            const se = document.createElement("div");
            se.classList.add("square", (rowindex + squareindex) % 2 === 0 ? "light" : "dark");

            se.dataset.row = rowindex;
            se.dataset.col = squareindex;

            if (square) {
                const pieceElement = document.createElement("div");
                pieceElement.classList.add("piece", square.color === 'w' ? "white" : "black");
                pieceElement.innerText = ""; // Add text or symbols for the pieces if necessary
                pieceElement.draggable = playerRole === square.color;
                pieceElement.addEventListener("dragstart", (e) => {
                    if (pieceElement.draggable) {
                        draggedPiece = pieceElement;
                        sourceSquare = { row: rowindex, col: squareindex };
                        e.dataTransfer.setData("text/plain", "");
                    }
                });
                pieceElement.addEventListener("dragend", () => {
                    draggedPiece = null;
                    sourceSquare = null;
                });
                se.append(pieceElement);
            }

            se.addEventListener("dragover", (e) => {
                e.preventDefault();
            });
            se.addEventListener("drop", (e) => {
                e.preventDefault();
                if (draggedPiece) {
                    const targetSource = {
                        row: parseInt(se.dataset.row, 10),
                        col: parseInt(se.dataset.col, 10),
                    };
                    handleMove(sourceSquare, targetSource);
                }
            });

            // Append the DOM element `se` (square element) to the board
            boardElement.append(se);
        });
    });
};

// Dummy handleMove function to prevent errors


renderBoard();

const handleMove =()=>{}

const getPieceUnicode =()=>{}