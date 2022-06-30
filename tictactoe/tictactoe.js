const cells = document.querySelectorAll('.cell')
const turn = document.querySelector('#turn')
const restartBtn = document.querySelector('#restartBtn')
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
]

let options = ['', '', '', '', '', '', '', '', '']

let currentPlayer = 'O'
const xList = []
const oList = []

let running = false

initialiseGame()

function initialiseGame() {
    cells.forEach(cell => cell.addEventListener('click', cellClicked))
    restartBtn.addEventListener('click', restartGame)
    turn.textContent = `${currentPlayer}'s turn`
    running = true
    currentPlayer = 'O'
}

function cellClicked() {
    const cellIndex = this.getAttribute("cellIndex")

    if (options[cellIndex] != '' || !running) {
        return
    }
    updateCell(this, cellIndex)
    checkWinner()
}

function updateCell(cell, index) {
    options[index] = currentPlayer
    cell.textContent = currentPlayer
    currentPlayer == 'X' ? xList.push(index) : oList.push(index)
}

function changePlayer() {
    currentPlayer = (currentPlayer == 'X') ? "O" : "X"
    turn.textContent = `${currentPlayer}'s turn`
}

function checkWinner() {
    let finished = false

    winConditions.forEach(winCondition => {
        if (winCondition.every(index => oList.includes(String(index)))) {
            finished = true
        }
    })
    winConditions.forEach(winCondition => {
        if (winCondition.every(index => xList.includes(String(index)))) {
            finished = true
        }
    })

    if (finished) {
        turn.textContent = `${currentPlayer} wins!`
        running = false
    } else if (!options.includes("")) {
        turn.textContent = `Draw!`
        running = false
    } else {
        changePlayer()
    }
}

function restartGame() {
    options = ['', '', '', '', '', '', '', '', '']
    cells.forEach(cell => cell.textContent = '')
    xList.length = 0
    oList.length = 0
    currentPlayer = 'O'
    turn.textContent = `${currentPlayer}'s turn`
    running = true
}