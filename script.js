let context = null
const totalColumns = 16
const totalRows = 16
const blockSize = 32
let appleX = blockSize * 10
let appleY = blockSize * 10
let snakeY = blockSize * 5
let snakeX = blockSize * 5
let snakeHistory = [{ x: snakeX, y: snakeY }]
let game = null
let isGameOver = false
let direction = 'right'

function createSnake() {
	context.fillStyle = 'blue'
	for (let index = 0; index < snakeHistory.length; index++) {
		const snake = snakeHistory[index];
		context.fillRect(snake.x, snake.y, blockSize, blockSize);
	}
	switch (direction) {
		case 'top':
			snakeY -= blockSize
			break;
		case 'right':
			snakeX += blockSize
			break;
		case 'down':
			snakeY += blockSize
			break;
		case 'left':
			snakeX -= blockSize
			break;

		default:
			break;
	}
}

function createApple() {
	context.fillStyle = 'red'
	context.fillRect(appleX, appleY, blockSize, blockSize);
}

function createBackground() {
	context.fillStyle = 'pink'
	context.fillRect(0, 0, totalRows * blockSize, totalColumns * blockSize);
}

function runGame() {
	const firstElementFromHistory = snakeHistory[0]
	if (firstElementFromHistory.x > totalRows * blockSize && direction == 'right') {
		snakeX = 0 - blockSize
	} else if (firstElementFromHistory.x < 0) {
		snakeX = totalRows * blockSize
	} else if (firstElementFromHistory.y > totalColumns * blockSize && direction == 'down') {
		snakeY = 0 - blockSize
	} else if (firstElementFromHistory.y < 0) {
		snakeY = totalColumns * blockSize
	}

	if (isGameOver) {
		alert('Game over! :(')
		clearInterval(game)
		return
	}

	const canvas = document.getElementById('canvas')
	context = canvas.getContext('2d')
	createBackground()
	createApple()
	createSnake()

	const isCollision = appleX === snakeX && appleY === snakeY
	if (isCollision) {
		appleX = Math.floor(Math.random() * totalRows) * blockSize
		appleY = Math.floor(Math.random() * totalColumns) * blockSize
	} else {
		const snakeSelfCollision = snakeHistory.some(
			h => h.y === snakeY && h.x === snakeX
		)
		if (snakeSelfCollision) {
			isGameOver = true;
		}
		snakeHistory.pop()
	}

	snakeHistory.unshift({ x: snakeX, y: snakeY })
}

window.onload = function() {
	game = setInterval(() => runGame(), 150)
	addEventListener("keypress", function(event) {
		const key = event.key
		switch (key) {
			case 'w':
				direction = 'top'	
				break;
			case 's':
				direction = 'down'	
				break;
			case 'a':
				direction = 'left'	
				break;
			case 'd':
				direction = 'right'	
				break;

			default:
				break;
		}
	});
}

