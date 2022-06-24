const audio = document.querySelector("#audio-loss")
const button = document.querySelector('#button')

// audio plays when you lose
button.addEventListener("click", () => {
    audio.currentTime = 0
    audio.play()
})