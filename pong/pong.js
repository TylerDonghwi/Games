const gameBoard = document.querySelector('#gameBoard')
const context = gameBoard.getContext('2d')
const scoreText = document.querySelector('#scoreText')
const resetBtn = document.querySelector('#resetBtn')
const gameWidth = gameBoard.width
const gameHeight = gameBoard.height
const boardBackground = 'white'
const paddle1Color = 'blue'
const paddle2Color = 'red'
const paddleBorder = 'black'
const ballColor = 'black'
const ballRadius = 12.5
const paddleSpeed = 50

// ball
let intervalId
let ballSpeed = 1
let ballX = gameWidth / 2
let ballY = gameHeight / 2

// player score
let player1Score = 0
let player2Score = 0

// paddles
class Paddle {
    constructor(width, height, x, y) {
        this.width = width
        this.height = height
        this.x = x
        this.y = y
    }
}

let paddle1 = new Paddle(25, 100, 0, 0)
let paddle2 = new Paddle(25, 100, gameWidth - 25, gameHeight - 100)

// event listeners for paddles
window.addEventListener('keydown', changeDirection)
resetBtn.addEventListener('click', resetGame)

// start game
gameStart()
drawPaddles()

function gameStart() {}

function nextTick() {}

function clearBoard() {}

function drawPaddles() {
    context.strokeStyle = paddleBorder

    // paddle 1
    context.fillStyle = paddle1Color
    context.fillRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height)
    context.strokeRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height)

    // paddle 2
    context.fillStyle = paddle2Color
    context.fillRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height)
    context.strokeRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height)

}

function createBall() {}

function moveBall() {}

function drawBall() {}

function checkCollision() {}

function changeDirection() {}

function updateScore() {}

function resetGame() {}