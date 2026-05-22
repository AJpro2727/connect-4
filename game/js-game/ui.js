const gameContainerEl = document.querySelector(".grid-4")
const turnBoxEl = document.querySelector(".turn-box")
const turnBoxCellEl = turnBoxEl.querySelector(".cell")


const statusPillEl = document.querySelector(".status-pill")
const statusDotEl = statusPillEl.querySelector(".dot")
const statusEl = statusPillEl.querySelector("p")

const turnNameEl = turnBoxEl.querySelector("#turnName")
const redCardEl = document.querySelector("#red")
const redNameEl = redCardEl.querySelector("#playerName")
const yellowcardEl = document.querySelector("#yellow")
const yellowNameEl = yellowcardEl.querySelector("#playerName")
const player1Name = document.querySelector("#player-red")
const player2Name = document.querySelector("#player-yellow")

const winnerTitleEls = document.querySelectorAll(".winner-title")

const nameChangeBtnEls = document.querySelectorAll("#changeName")
const btnRestartEls = document.querySelectorAll(".restart")
const btnCancelEl = document.querySelector("#cancelExit")
const hideStartBtn = document.querySelector("#hideStart")
const hideNameBtn = document.querySelector("#hideName")

const popups = document.querySelectorAll(".popup-container")

const namePopupEl = document.querySelector("#changeNamePopup")
const redWonPopup = document.querySelector("#winnerRed")
const yellowWonPopup = document.querySelector("#winnerYellow")
const drawpopup = document.querySelector("#draw")
const exitPopup = document.querySelector("#exit")



for (const nameChangeBtnEl of nameChangeBtnEls){
    nameChangeBtnEl.addEventListener("click", function(){
    hideAllPopups()
    player1Name.classList.remove("invalid")
    player2Name.classList.remove("invalid")
    namePopupEl.classList.remove("hidden")
})
}

for (const btnRestartEl of btnRestartEls){
    btnRestartEl.addEventListener("click",function(){
        restartGame()
        hideAllPopups()
        renderBoard()
        renderStatus()
    })
}

for (const popup of popups){
    popup.addEventListener("click", function(event){
        if (event.target === popup && validateInputs()){
            popup.classList.add("hidden")
        }
    })
}

hideStartBtn.addEventListener("click", function(){
    hideAllPopups()
    namePopupEl.classList.remove("hidden")
})

hideNameBtn.addEventListener("click", function(){
    if (!validateInputs()){
        return
    }

    namePopupEl.classList.add("hidden")
    restartGame()
    redPlayer = player1Name.value
    yellowPlayer = player2Name.value
    turnBoxCellEl.classList.add("player-1")
    turnBoxCellEl.classList.remove("player-2")
    renderBoard()
    renderStatus()
})

btnCancelEl.addEventListener("click", function(){
    hideAllPopups()
})

document.addEventListener("keydown", function(event){
    let amount = 0
    let amountNeeded = popups.length
    for(const popup of popups){
        if(popup.classList.contains("hidden"))
            amount += 1
    }
    if (event.key === "Escape" && amount === amountNeeded){
        console.log("det funker")
        exitPopup.classList.remove("hidden")

    }
    else if (event.key === "Escape"){
        hideAllPopups()
    }
})

function validateInputs(){
    let isValid = true
    const nameInputs = [player1Name, player2Name]

    for (const input of nameInputs){
        input.classList.remove("invalid")

        if (input.value === ""){
            input.classList.add("invalid")
            isValid = false
        }
    }

    return isValid
}
function hideAllPopups() {
  for (const popup of popups) {
    popup.classList.add("hidden")
  }
}

function renderBoard(){
    gameContainerEl.innerHTML = ""

    for (let row = 0; row < board.length; row++){

        for (let col = 0; col < board[row].length; col++){

            const cellEl = document.createElement("div")
            let pieceEl
            cellEl.classList.add("cell")

            if (board[row][col]=== 1){
                pieceEl = document.createElement("div")
                pieceEl.classList.add("piece")
                pieceEl.classList.add("player-1")
                cellEl.appendChild(pieceEl)
            }

            else if (board[row][col]=== 2){
                pieceEl = document.createElement("div")
                pieceEl.classList.add("piece")
                pieceEl.classList.add("player-2")
                cellEl.appendChild(pieceEl)
            }

            if (pieceEl && lastMove !== null && row === lastMove[0] && col === lastMove[1]){
                pieceEl.classList.add("cell-animation")
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
                        hideAllPopups()
                        drawpopup.classList.remove("hidden")
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
        turnBoxCellEl.classList.remove("player-1")
        turnBoxCellEl.classList.remove("player-2")
    }
    else {

        if (currentPlayer === 1){
            turnNameEl.textContent = redPlayer
            statusEl.textContent = `${redPlayer}'s turn`
            statusDotEl.classList.add("player-1")
            statusDotEl.classList.remove("player-2")
            turnBoxCellEl.classList.add("player-1")
            turnBoxCellEl.classList.remove("player-2")
        }
        else{
            turnNameEl.textContent = yellowPlayer
            statusEl.textContent = `${yellowPlayer}'s turn`
            statusDotEl.classList.add("player-2")
            statusDotEl.classList.remove("player-1")
            turnBoxCellEl.classList.add("player-2")
            turnBoxCellEl.classList.remove("player-1")
        }
    }
}


renderBoard()
renderStatus()