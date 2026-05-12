const gameContainerEl = document.querySelector(".grid-4")
const turnBoxEl = document.querySelector(".turn-box")
const turnBoxCellEl = turnBoxEl.querySelector(".cell")
const turnNameEl = turnBoxEl.querySelector("#turnName")
const redCardEl = document.querySelector("#red")
const redNameEl = redCardEl.querySelector("#playerName")
const yellowcardEl = document.querySelector("#yellow")
const yellowNameEl = yellowcardEl.querySelector("#playerName")
const statusPillEl = document.querySelector(".status-pill")
const statusDotEl = statusPillEl.querySelector(".dot")
const statusEl = statusPillEl.querySelector("p")
const nameChangeBtnEls = document.querySelectorAll("#changeName")
const btnRestartEls = document.querySelectorAll(".restart")


const hideStartBtn = document.querySelector("#hideStart")

const namePopupEl = document.querySelector("#changeNamePopup")
const hideNameBtn = document.querySelector("#hideName")
const player1Name = document.querySelector("#player-red")
const player2Name = document.querySelector("#player-yellow")

const winnerTitleEls = document.querySelectorAll(".winner-title")


const redWonPopup = document.querySelector("#winnerRed")
const yellowWonPopup = document.querySelector("#winnerYellow")

hideStartBtn.addEventListener("click", function(){
    hideAllPopups()
    namePopupEl.classList.remove("hidden")
})

hideNameBtn.addEventListener("click", function(){
    namePopupEl.classList.add("hidden")
    restartGame()
    redPlayer = player1Name.value
    yellowPlayer = player2Name.value
    turnBoxCellEl.classList.toggle("player-1")
    turnBoxCellEl.classList.remove("player-2")
    renderBoard()
    renderStatus()
})
for (const nameChangeBtnEl of nameChangeBtnEls){
    nameChangeBtnEl.addEventListener("click", function(){
    hideAllPopups()
    namePopupEl.classList.remove("hidden")
})
}

for (const btnRestartEl of btnRestartEls){
    btnRestartEl.addEventListener("click",function(){
        restartGame()
        turnNameEl.textContent = redPlayer
        statusEl.textContent = `${redPlayer}'s turn`
        statusDotEl.classList.toggle("player-1")
        statusDotEl.classList.remove("player-2")
        turnBoxCellEl.classList.toggle("player-1")
        turnBoxCellEl.classList.remove("player-2")
        hideAllPopups()
        renderBoard()
        renderStatus()
    })
}

function hideAllPopups() {
  const popups = document.querySelectorAll(".popup-container")

  for (const popup of popups) {
    popup.classList.add("hidden")
  }
}





renderBoard()
renderStatus()


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
    redNameEl.textContent = redPlayer
    yellowNameEl.textContent = yellowPlayer

    if (gameOver === true && winner !== null && winner !== "uavgjort") {
        statusEl.textContent = `${winnerName} vant!`
        for (const winnerTitle of winnerTitleEls){
            winnerTitle.textContent = `${winnerName} won this time!`
        }
        if (winner === 1){
            hideAllPopups()
            redWonPopup.classList.remove("hidden")
        }
        else{
            hideAllPopups()
            yellowWonPopup.classList.remove("hidden")
        }

    }
    else if (gameOver === true && winner === "uavgjort"){
        statusEl.textContent = `Ingen vant. Spillet er uavgjort!`
        statusDotEl.classList.remove("player-1")
        statusDotEl.classList.remove("player-2")
    }
    else {

        if (currentPlayer === 1){
            turnNameEl.textContent = redPlayer
            statusEl.textContent = `${redPlayer}'s turn`
            statusDotEl.classList.toggle("player-1")
            statusDotEl.classList.remove("player-2")
            turnBoxCellEl.classList.toggle("player-1")
            turnBoxCellEl.classList.remove("player-2")
        }
        else{
            turnNameEl.textContent = yellowPlayer
            statusEl.textContent = `${yellowPlayer}'s turn`
            statusDotEl.classList.toggle("player-2")
            statusDotEl.classList.remove("player-1")
            turnBoxCellEl.classList.toggle("player-2")
            turnBoxCellEl.classList.remove("player-1")
        }
    }
}
