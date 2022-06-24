const playerText = document.querySelector("#playerText")
const computerText = document.querySelector("#computerText")
const resultText = document.querySelector("#result")
const choiceBtns = document.querySelectorAll(".choiceBtn")

let player
let computer
let result

choiceBtns.forEach(button => {
    button.addEventListener('click', () => {
        player = button.textContent
        computer = computerTurn();
        playerText.textContent = `Player: ${player}`
        computerText.textContent = `Computer: ${computer}`
        resultText.textContent = `Result: ${checkWinner()}`
    })
})

function computerTurn() {
    const randNum = Math.floor(Math.random() * 3) + 1

    switch (randNum) {
        case 1:
            return "ROCK"
        case 2:
            return "PAPER"
        case 3:
            return "SCISSORS"
    }
}

function checkWinner() {
    if (player == computer) {
        return "DRAW!"
    } else if (computer == "ROCK") {
        return (player == "PAPER") ? "Player Wins!" : "Computer Wins!"
    } else if (computer == "PAPER") {
        return (player == "SCISSORS") ? "Player Wins!" : "Computer Wins!"
    } else if (computer == "SCISSORS") {
        return (player == "ROCK") ? "Player Wins!" : "Computer Wins!"
    }
}