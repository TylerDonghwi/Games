const gameBoard = document.querySelector("#gameBoard")
const context = gameBoard.getContext("2d")
const scoreText = document.querySelector("#scoreText")
const resetBtn = document.querySelector("#resetBtn")
const gameWidth = gameBoard.width
const gameHeight = gameBoard.height
const boardBackground = "white"
const snakeColor = "lightgreen"
const snakeBorder = "black"
const foodColor = ["red", "blue", "orange", "yellow", "green", "purple", "navy"]
const unitSize = 25
let velocity = 75


let running = false
let xVelocity = velocity
let yVelocity = 0
let foodX
let foodY

let score = 0

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
        }, velocity)
    } else {
        displayGameOver()
        const audio = document.querySelector("#audio-loss")
        audio.currentTime = 0
        audio.play()
    }
}

function clearBoard() {
    context.fillStyle = boardBackground
    context.fillRect(0, 0, gameWidth, gameHeight)
}

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
    context.fillStyle = foodColor[Math.floor(Math.random() * (foodColor.length - 1))]
    context.fillRect(foodX, foodY, unitSize, unitSize)
}

function moveSnake() {
    const head = {
        x: snake[0].x + xVelocity,
        y: snake[0].y + yVelocity
    }
    snake.unshift(head)
        // if the snake has eaten the fruit, increase by 1 otherwise don't
    if (snake[0].x == foodX && snake[0].y == foodY) {
        score++
        velocity -= 2
        scoreText.textContent = score
        createFood()
    } else {
        snake.pop()
    }
}

function drawSnake() {
    context.fillStyle = snakeColor
    context.strokeStyle = snakeBorder
    snake.forEach(snakePart => {
        context.fillRect(snakePart.x, snakePart.y, unitSize, unitSize)
        context.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize)
    })
}

function changeDirection(event) {
    const keyPressed = event.keyCode
        // up = 38, down = 40, left = 37, right =  39
    const left = 37
    const up = 38
    const right = 39
    const down = 40

    const goingUp = (yVelocity == -unitSize)
    const goingDown = (yVelocity == unitSize)
    const goingLeft = (xVelocity == -unitSize)
    const goingRight = (xVelocity == unitSize)

    switch (true) {
        // you can't turn 180 in snake game
        case (keyPressed == left && !goingRight):
            xVelocity = -unitSize
            yVelocity = 0
            break
        case (keyPressed == right && !goingLeft):
            xVelocity = unitSize
            yVelocity = 0
            break
        case (keyPressed == up && !goingDown):
            xVelocity = 0
            yVelocity = -unitSize
            break
        case (keyPressed == down && !goingUp):
            xVelocity = 0
            yVelocity = unitSize
            break
    }
}

function checkGameOver() {
    switch (true) {
        // if the snake hits the border of the gameBoard it's game over
        case (snake[0].x < 0):
            running = false
            break
        case (snake[0].x >= gameWidth):
            running = false
            break
        case (snake[0].y < 0):
            running = false
            break
        case (snake[0].y >= gameHeight):
            running = false
            break

    }
    for (let i = 1; i < snake.length; i += 1) {
        // if the snake hits its body part its game over
        if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
            running = false
        }
    }
}

function displayGameOver() {
    context.font = '50px PressStart2P'
    context.fillStyle = 'black'
    context.textAlign = 'center'
    context.fillText("Game Over", gameWidth / 2, gameHeight / 2)
    running = false
}

function resetGame() {
    score = 0
    xVelocity = unitSize
    yVelocity = 0
        // reset snake
    snake = [
        { x: unitSize * 4, y: 0 },
        { x: unitSize * 3, y: 0 },
        { x: unitSize * 2, y: 0 },
        { x: unitSize, y: 0 },
        { x: 0, y: 0 }
    ]
    gameStart()
}