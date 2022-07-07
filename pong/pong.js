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
const ballBorderColor = 'black'
const ballColor = 'black'
const ballRadius = 12.5
const paddleSpeed = 40.625

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

function gameStart() {
    createBall()
    nextTick()
}

function nextTick() {
    intervalId = setTimeout(() => {
        clearBoard()
        drawPaddles()
        moveBall()
        drawBall(ballX, ballY)
        checkCollision()
        nextTick()
    }, 10)
}

function clearBoard() {
    context.fillStyle = boardBackground
    context.fillRect(0, 0, gameWidth, gameHeight)
}

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

function createBall() {
    ballSpeed = 1
    if (Math.round(Math.random()) == 1) {
        ballXDirection = 1
    } else {
        ballXDirection = -1
    }
    if (Math.round(Math.random()) == 1) {
        ballYDirection = 1
    } else {
        ballYDirection = -1
    }
    ballX = gameWidth / 2
    ballY = gameHeight / 2
    drawBall()
}

function moveBall() {
    ballX += ballSpeed * ballXDirection
    ballY += ballSpeed * ballYDirection
}

function drawBall(ballX, ballY) {
    context.fillStyle = ballColor
    context.strokeStyle = ballBorderColor
    context.lineWidth = 2
    context.beginPath()
    context.arc(ballX, ballY, ballRadius, 0, 2 * Math.PI)
    context.stroke()
    context.fill()
}

function checkCollision() {
    // hits the top or bottom
    if (ballY <= 0 + ballRadius || ballY >= gameHeight - ballRadius) {
        ballYDirection *= -1
    }

    // if it hits the wall score given to players
    if (ballX <= 0 + ballRadius) {
        player2Score++
        updateScore()
        createBall()
        return
    } else if (ballX >= gameWidth - ballRadius) {
        player1Score++
        updateScore()
        createBall()
        return
    }

    // ball hits the paddle
    if (ballX <= (paddle1.x + paddle1.width + ballRadius) && ballY > paddle1.y && ballY < paddle1.y + paddle1.height) {
        ballX = paddle1.x + paddle1.width + ballRadius // if ball gets stuck in the corner
        ballXDirection *= -1
        ballSpeed += 0.3
    }
    if (ballX >= (paddle2.x - ballRadius) && ballY > paddle2.y && ballY < paddle2.y + paddle1.height) {
        ballX = paddle2.x + paddle2.width + ballRadius // if ball gets stuck in the corner
        ballXDirection *= -1
        ballSpeed += 0.3
    }
}

function changeDirection(event) {
    const keyPressed = event.keyCode

    // paddle 1 is w/s
    const paddle1up = 87
    const paddle1down = 83

    // paddle 2 is up/down 
    const paddle2up = 38
    const paddle2down = 40

    switch (keyPressed) {
        case (paddle1up):
            if (paddle1.y > 0) {
                paddle1.y -= paddleSpeed
            }
            break
        case (paddle1down):
            if (paddle1.y < gameHeight - paddle1.height) {
                paddle1.y += paddleSpeed
            }
            break
        case (paddle2up):
            if (paddle2.y > 0) {
                paddle2.y -= paddleSpeed
            }
            break
        case (paddle2down):
            if (paddle2.y < gameHeight - paddle2.height) {
                paddle2.y += paddleSpeed
            }
            break
    }
}

function updateScore() {
    scoreText.textContent = `${player1Score} : ${player2Score}`
}

function resetGame() {
    player1Score = 0
    player2Score = 0
    paddle1 = new Paddle(25, 100, 0, 0)
    paddle2 = new Paddle(25, 100, gameWidth - 25, gameHeight - 100)
    ballSpeed = 1
    ballX = 0
    ballY = 0
    ballXDirection = 0
    ballYDirection = 0
    updateScore()
    clearInterval(intervalId)
    gameStart()
}