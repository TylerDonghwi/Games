const gameBoard = document.querySelector('#gameBoard')
const context = gameBoard.getContext('2d')
const scoreText = document.querySelector('#scoreText')
const resetBtn = document.querySelector('#resetBtn')
const gameWidth = gameBoard.Width
const gameHeight = gameBoard.height
const boardBackground = 'white'
const paddle1Color = 'blue'
const paddle2Color = 'red'
const ballColor = 'black'
const ballRadius = 12.5
const paddleSpeed = 50

let intervalId
let ballSpeed = 1
let ballX = gameWidth / 2
let ballY = gameHeight / 2
let player1Score = 0
let player2Score = 0
class Paddle {
    constructor(width, height, x, y) {
        this.width = width
        this.height = height
        this.x = x
        this.y = y
    }
}

let paddle1 = new Paddle(25, 100, 0, 0)
let paddle2 = new Paddle(25, 100, gameWidth - 25, 0)