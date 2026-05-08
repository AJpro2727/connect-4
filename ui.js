const gameContainerEl = document.querySelector(".grid-4")
const btnStartEl = document.querySelector(".start")
const statusEl = document.querySelector(".status-box")

btnStartEl.addEventListener("click", function () {
    renderBoard()
    renderStatus()
})


function renderBoard(){
    gameContainerEl.innerHTML = ""

    for (let row = 0; row < board.length; row++){

        for (let col = 0; col < board[row].length; col++){

            const cellEl = document.createElement("div")
            cellEl.classList.add("cell")

            if (board[row][col]=== 1){
                cellEl.classList.add("player-1")
            }

            else if (board[row][col]=== 2){
                cellEl.classList.add("player-2")
            }

            cellEl.addEventListener("click",function(){
                const placed = placePiece(col)

                if (placed) {
                    const didWin = checkWin()
                    const didDraw = checkDraw()

                    if (!didWin && !didDraw) {
                        changeCurrentPlayer()
                    }

                    renderBoard()
                    renderStatus()

                    if (didDraw){
                        
                        alert("Uavgjort!")
                    }
                }
              
            })
            gameContainerEl.appendChild(cellEl)
        }
    }
}

function renderStatus() {
    if (gameOver === true && winner !== null && winner !== "uavgjort") {
        statusEl.textContent = `Spiller ${winner} vant!`
    }
    else if (gameOver === true && winner === "uavgjort"){
        statusEl.textContent = `Ingen vant. Spillet er uavgjort!`
    }
    else {
        statusEl.textContent = `Spiller ${currentPlayer} sin tur`
    }
}