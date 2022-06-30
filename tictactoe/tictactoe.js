const cells = document.querySelectorAll('.cell')
const status = document.querySelector('#status')
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
    status.textContent = `Click a tile to play`
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

    if (running) {
        changePlayer()
        computerPlay()
        checkWinner()
        changePlayer()
    }
}

function updateCell(cell, index) {
    options[index] = currentPlayer
    cell.textContent = currentPlayer
    currentPlayer == 'X' ? xList.push(index) : oList.push(index)
}

function changePlayer() {
    if (running) {
        currentPlayer = (currentPlayer == 'X') ? "O" : "X"
        status.textContent = `Click a tile to play`
    }

}

function computerPlay() {
    if (currentPlayer = 'X') {
        let num
        do {
            num = String(Math.floor(Math.random() * 8))
            if (!xList.includes(num) && !oList.includes(num)) {
                cells[num].textContent = currentPlayer
                xList.push(num)
                options[Number(num)] = 'X'
                break
            }
        } while (xList.includes(num) || oList.includes(num))
    }
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
        status.textContent = currentPlayer == "O" ? `You win!` : `Computer wins!`
        running = false
    } else if (!options.includes("")) {
        status.textContent = `Draw!`
        running = false
    }
}

function restartGame() {
    options = ['', '', '', '', '', '', '', '', '']
    cells.forEach(cell => cell.textContent = '')
    xList.length = 0
    oList.length = 0
    currentPlayer = 'O'
    status.textContent = `Click a tile to play`
    running = true
}