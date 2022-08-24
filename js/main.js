const playerFactory = (playerName, symbol) => {
	return { playerName, symbol };
};

const NOT_MARKED = "";
const O_MARKER = "o";
const X_MARKER = "x";

const O_MARKER_HTML = `<svg class="gameMarker" height="200px" id="Layer_1" style="enable-background:new 0 0 512 512;" version="1.1" viewBox="0 0 512 512" width="200px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><g><path d="M256,48C141.1,48,48,141.1,48,256s93.1,208,208,208c114.9,0,208-93.1,208-208S370.9,48,256,48z M256,446.7    c-105.1,0-190.7-85.5-190.7-190.7c0-105.1,85.5-190.7,190.7-190.7c105.1,0,190.7,85.5,190.7,190.7    C446.7,361.1,361.1,446.7,256,446.7z"/></g></g></svg>`;
const X_MARKER_HTML = `<svg class="gameMarker" style="enable-background:new 0 0 24 24;" version="1.1" viewBox="0 0 24 24" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><style type="text/css">
	.st0{opacity:0.2;fill:none;stroke:#000000;stroke-width:5.000000e-02;stroke-miterlimit:10;}
</style><g id="grid_system"/><g id="_icons"><path d="M5.3,18.7C5.5,18.9,5.7,19,6,19s0.5-0.1,0.7-0.3l5.3-5.3l5.3,5.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3   c0.4-0.4,0.4-1,0-1.4L13.4,12l5.3-5.3c0.4-0.4,0.4-1,0-1.4s-1-0.4-1.4,0L12,10.6L6.7,5.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4   l5.3,5.3l-5.3,5.3C4.9,17.7,4.9,18.3,5.3,18.7z"/></g></svg>`;

const gameBoard = (() => {
	let board = [
		["x", "x", "o"],
		["o", "o", "x"],
		["x", "o", "x"],
	];
	const resetBoard = () => {
		board = [];
		for (let i = 0; i < 3; i++) {
			let row = [];
			for (let j = 0; j < 3; j++) {
				row.push(NOT_MARKED);
			}
			board.push(row);
		}
	};
	const getMarkAt = (row_index, column_index) => {
		return board[row_index][column_index];
	};
	const markBoard = (to_mark, row_index, column_index) => {
		console.log(`marking ${to_mark} at ${row_index}, ${column_index}`);
		if (
			(to_mark === O_MARKER || to_mark === X_MARKER) &&
			row_index < 3 &&
			row_index >= 0 &&
			column_index < 3 &&
			column_index >= 0
		) {
			if (board[row_index][column_index] !== NOT_MARKED) {
				return alert("The spot has already been marked");
			}
			board[row_index][column_index] = to_mark;
		} else {
			return;
		}
	};
	const checkBoardFilled = () => {
		return board.every((item) =>
			item.every((itemm) => itemm !== NOT_MARKED)
		);
	};
	const checkWin = () => {
		for (let i = 0; i < 3; i++) {
			if (
				board[i].every(
					(item) => item === board[i][0] && item !== NOT_MARKED
				)
			) {
				return [board[i][0], `row${i + 1}`];
			} else if (
				board[0][i] === board[1][i] &&
				board[0][i] === board[2][i] &&
				board[0][i] !== NOT_MARKED
			) {
				return [board[0][i], `column${i + 1}`];
			}
		}
		if (board[0][0] === board[1][1] && board[0][0] === board[2][2]) {
			return [board[0][0], "diag1"];
		} else if (board[0][2] === board[1][1] && board[0][2] === board[2][0]) {
			return [board[0][2], "diag2"];
		} else if (checkBoardFilled()) {
			return ["draw", null];
		}
		return [null, null];
	};
	return { getMarkAt, resetBoard, checkWin, markBoard };
})();

const player = playerFactory("Ryuuzu", O_MARKER);
const computer = playerFactory("Computer", X_MARKER);

const newGame = () => {
	gameBoard.resetBoard();
	updateBoard();
};
const boardCells = document.querySelectorAll(".boardCell");

boardCells.forEach((cell) => {
	cell.addEventListener("click", (e) => {
		const row_index = cell.getAttribute("row_index");
		const column_index = cell.getAttribute("col_index");
		const to_mark = player.symbol;
		console.log(
			`Sending ${to_mark} for mark at ${row_index}, ${column_index}`
		);
		gameBoard.markBoard(to_mark, row_index, column_index);
		updateBoard();
		let win_check = gameBoard.checkWin();
		console.log(win_check);

		const overlay = document.querySelector(".overlay");
		const winTextBlock = document.querySelector(".winTextBlock");
		const winTitle = document.querySelector(".winTitle");
		const winText = document.querySelector(".winText");
		if (win_check[0] === O_MARKER || win_check[0] === X_MARKER) {
			winTextBlock.style.display = "block";
			overlay.style.display = "block";
			winText.innerHTML = `${
				player.symbol === win_check[0]
					? player.playerName
					: computer.playerName
			} wins!`;
			winTitle.innerHTML = "We have a winner!";
		} else if (win_check[0] === "draw") {
			winTextBlock.style.display = "block";
			overlay.style.display = "block";
			winText.innerHTML = "It's a draw!";
			winTitle.innerHTML = "Draw!";
		}
	});
});

const updateBoard = () => {
	boardCells.forEach((cell) => {
		const row_index = cell.getAttribute("row_index");
		const column_index = cell.getAttribute("col_index");
		const mark = gameBoard.getMarkAt(row_index, column_index);
		if (mark === X_MARKER) {
			cell.innerHTML = X_MARKER_HTML;
		} else if (mark === O_MARKER) {
			cell.innerHTML = O_MARKER_HTML;
		} else {
			cell.innerHTML = "";
		}
	});
};

newGame();
