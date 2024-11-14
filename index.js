// JavaScript 
const gameBorad = document.getElementById("game-board")
const gameInfo = document.getElementById("game-info")
const newGame = document.getElementById("new-game")

const gameCells = ["", "", "", "", "", "", "", "", ""]

let go = "circle"

function createGameBoard() {
    gameCells.forEach((cells, index) => {
        const cellEl = document.createElement('div')
        cellEl.classList.add('square')
        cellEl.addEventListener('click', addGo)
        gameBorad.append(cellEl)
    })
}

createGameBoard()

function addGo(e) {
    const goDisplay = document.createElement('div')
    goDisplay.classList.add(go)
    e.target.append(goDisplay)
    go = go === "circle" ? "cross" : "circle"

    gameInfo.textContent = `Now ${go}'s turn`
    e.target.removeEventListener("click", addGo)

    checkScore()
}

function checkScore() {
    const allSquares = document.querySelectorAll('.square')
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ]

    let gameWon = false

    winningCombos.forEach(array => {
        const circleWins = array.every(cell => allSquares[cell].firstChild?.classList.contains("circle"))
        if (circleWins) {
            gameInfo.textContent = "Circle Wins"
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
            gameWon = true
        }
    })

    winningCombos.forEach(array => {
        const crossWins = array.every(cell => allSquares[cell].firstChild?.classList.contains("cross"))
        if (crossWins) {
            gameInfo.textContent = "Cross Wins"
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
            gameWon = true
        }
    })

    const allFilled = Array.from(allSquares).every(square => square.firstChild)
    if (!gameWon && allFilled) {
        gameInfo.textContent = "It's a Draw"
    }


}

newGame.addEventListener('click', reloadPage)

function reloadPage() {
    location.reload()
}

