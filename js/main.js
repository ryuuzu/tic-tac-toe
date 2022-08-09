const playerFactory = (symbol) => {
	return { symbol };
};

const NOT_MARKED = "";
const O_MARKER = "o";
const X_MARKER = "x";

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
		if (
			(to_mark === O_MARKER || to_mark === X_MARKER) &&
			row_index < 3 &&
			row_index >= 0 &&
			column_index < 3 &&
			column_index >= 0
		) {
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
			if (board[i].every((item) => item === board[i][0])) {
				return [board[i][0], `row${i + 1}`];
			} else if (
				board[0][i] === board[1][i] &&
				board[0][i] === board[2][i]
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
