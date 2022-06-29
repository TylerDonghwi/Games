const gameBoard = document.querySelector("#gameBoard")
const context = gameBoard.getContext("2d")
const scoreText = document.querySelector("#scoreText")
const resetBtn = document.querySelector("#resetBtn")
const gameWidth = gameBoard.width
const gameHeight = gameBoard.height

const snakeColor = "lightgreen"
const snakeBorder = "black"
const foodColor = ["red", "blue", "orange", "yellow", "green", "purple", "navy"];
const unitSize = 25;

let running = false;
let xVelocity = unitSize;
let yVelocity = 0;
let foodX;
let foodY;

let score = 0;

let snake = [
    { x: unitSize * 4, y: 0 },
    { x: unitSize * 3, y: 0 },
    { x: unitSize * 2, y: 0 },
    { x: unitSize, y: 0 },
    { x: 0, y: 0 }
]

window.addEventListener("keydown", changeDirection)
resetBtn.addEventListener('click', resetGame)

gameStart()
    // createFood()

function gameStart() {
    running = true
    scoreText.textContent = score
    createFood()
    drawFood()
    nextTick()
}

function nextTick() {
    // check if the game is running
    if (running) {
        setTimeout(() => {
            clearBoard()
            drawFood()
            moveSnake()
            drawSnake()
            checkGameOver()
            nextTick()
        }, 50)
    } else {
        displayGameOver()
        const audio = document.querySelector("#audio-loss")
        audio.currentTime = 0
        audio.play()
    }
}

function clearBoard() {}

function createFood() {
    function randomFood(min, max) {
        // random coordinate in the board
        const random = Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize
        return random
    }
    foodX = randomFood(0, gameWidth - unitSize)
    foodY = randomFood(0, gameWidth - unitSize)
}

function drawFood() {
    context.fillStyle = foodColor[Math.floor(Math.random() * (foodColor.length - 1))];
    context.fillRect(foodX, foodY, unitSize, unitSize)
}

function moveSnake() {}

function drawSnake() {}

function changeDirection() {}

function checkGameOver() {}

function displayGameOver() {}

function resetGame() {}