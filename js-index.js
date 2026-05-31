/* reveal "how it works" section*/

const cardEls = document.querySelectorAll(".card")

const observer = new IntersectionObserver(function(entries){
   for (const entry of entries){
     if (entry.isIntersecting){
        entry.target.classList.add("card-active")
        const cardNrEl = entry.target.querySelector(".card-nr")
        cardNrEl.classList.add("card-nr-active")
        observer.unobserve(entry.target)
    }
   }
}, {threshold: 1
})

for (const cardEl of cardEls){
    observer.observe(cardEl)
}

/* plasserer brikker i trejde seksjon */

const pieceEls = document.querySelectorAll(".piece")

const observer2 = new IntersectionObserver(function(entries){
    for (const entry of entries){

        if (entry.isIntersecting){
            entry.target.classList.add("pieceActive")
            observer2.unobserve(entry.target)
        }
    }
})

for (const pieceEl of pieceEls){
    pieceEl.style.animationDelay = `${pieceEl.dataset.drop * 0.10}s`
    observer2.observe(pieceEl)
}



/* stats seksjon */
const gameHistory =   JSON.parse(localStorage.getItem("history")) || []
/* teller opp hvor mange spilte spil */


const gamesPlayed = document.querySelector("#gameAmount")
let target = gameHistory.length 
let nr = 0
gamesPlayed.textContent = nr
let speed = 100

function tellOpp(){
    if (target === 0){
        clearInterval(tell)
        return
    }
    nr += 1
    gamesPlayed.textContent = nr
    if (nr === target){
        clearInterval(tell)
    }

}

/* finner ut av hvem som har funnet mest (navnvbasert) */
let winners = []
let uniqueWinners = []
const bestPlayer = document.querySelector("#playerMostWon")
const amountWinsPlayer = document.querySelector("#amountWon")

function renderBestPlayer(){


for (const game of gameHistory){
    winners.push(game.winner)
}

uniqueWinners = [...new Set(winners)]

let bestName = null
let highestCount = 0

for (const uniqueWinner of uniqueWinners){
    let count = winners.filter(function(name){
        return name === uniqueWinner
    }).length

    if (count > highestCount){
        highestCount = count
        bestName = uniqueWinner
    }
}
bestPlayer.textContent = bestName
amountWinsPlayer.textContent = highestCount

    console.log(winners)
    console.log(uniqueWinners)
    console.log(bestName)

}

/* Sjekker hvilken farge som har vunnet mest */

const MostWonColor = document.querySelector("#colorMostWin")
const amountWonColor = document.querySelector("#colorAmountWon")

let highestColorCount = 0
let bestColor = null
let winnerColors = []

function renderBestColor(){

    for (const game of gameHistory){
    winnerColors.push(game.color)
}
console.log(winnerColors)

for (const winnerColor of winnerColors){
    let count = winnerColors.filter(function(color){
        return color === winnerColor
    }).length

    if (count > highestColorCount){
        highestColorCount = count
        bestColor = winnerColor
    }
}
if(bestColor === "red"){
    MostWonColor.classList.add("player-1")
    MostWonColor.classList.remove("player-2")
}
else if(bestColor === "yellow"){
    MostWonColor.classList.remove("player-1")
    MostWonColor.classList.add("player-2")
}
else{
    MostWonColor.classList.remove("player-1")
    MostWonColor.classList.remove("player-2")
}

amountWonColor.textContent = highestColorCount

}


/* Historie delen */
const historyContainer = document.querySelector(".game-history-container")
const seeMoreBtn = document.querySelector("#seeMore")
let gameHistoryOrdered = [...gameHistory].reverse()
let styleName = null
let historyCount = 0
let visibleCount = 3


seeMoreBtn.addEventListener("click", function(){
    visibleCount += 3
    renderHistory()
})

function renderHistory(){

historyContainer.innerHTML = ``
historyCount = 0

if (gameHistoryOrdered.length === 0){
    seeMoreBtn.classList.add("unactive")
    clearHistoryBtn.classList.add("unactive")
}
for (const game of gameHistoryOrdered){
    if(historyCount >= visibleCount){
        break
    }
    historyCount++

    if(visibleCount >= gameHistoryOrdered.length){
        seeMoreBtn.classList.add("unactive")
    }
    const gameHistoryCard = document.createElement("div")
    if (game.color === "red"){
        styleName = "player-1"
    }
    else if (game.color === "yellow"){
        styleName = "player-2"
    }
    else{
        styleName = ""
    }
    gameHistoryCard.classList.add("game-card")
    gameHistoryCard.innerHTML = `

     <div class="cell">
                    <div class="piece ${styleName}"></div>
    </div>
    <div class="game-card-text">
        <h4>${game.playerRed} vs ${game.playerYellow}</h4>
        <p>Winner: ${game.winner}</p>
        <p>Date: ${game.date}</p>
    </div>

    <div class="history-board"></div>
    `
    const HistoryBoard = gameHistoryCard.querySelector(".history-board")

    let board = game.board

        for (let row = 0; row < board.length; row++){

            for (let col = 0; col < board[row].length; col++){

                const historySlot = document.createElement("div")
                let pieceEl
                historySlot.classList.add("history-slot")

                if (board[row][col]=== 1){
                    pieceEl = document.createElement("div")
                    pieceEl.classList.add("piece")
                    pieceEl.classList.add("player-1")
                    historySlot.appendChild(pieceEl)
                }

                else if (board[row][col]=== 2){
                    pieceEl = document.createElement("div")
                    pieceEl.classList.add("piece")
                    pieceEl.classList.add("player-2")
                    historySlot.appendChild(pieceEl)
                }

            HistoryBoard.appendChild(historySlot)
        }
    }
    
    historyContainer.appendChild(gameHistoryCard)

    
}
}


/* reset history */
const cancelBtn = document.querySelector("#cancelDelete")
const clearHistoryBtn = document.querySelector("#clearHistory")
const deleteHistoryBtn = document.querySelector("#deleteHistory")
const confirmDeletePopup = document.querySelector("#confirmDelete")

const historyDeleteInput = document.querySelector("#clearHistoryPassword")
let password = "Potet123"

clearHistoryBtn.addEventListener("click", function(){
    confirmDeletePopup.classList.remove("hidden")
})

cancelBtn.addEventListener("click", function(){
    confirmDeletePopup.classList.add("hidden")
})

deleteHistoryBtn.addEventListener("click", function(){
    historyDeleteInput.classList.remove("invalid")

    if(historyDeleteInput.value === password){
        deleteHistory()
    }
    else{
        historyDeleteInput.value = ""
        historyDeleteInput.classList.add("invalid")
        historyDeleteInput.placeholder = "Wrong password"
    }
})

function deleteHistory(){
    localStorage.removeItem("history")
    location.reload()
}





const tell = setInterval(tellOpp, speed)
renderBestPlayer()
renderBestColor()
renderHistory()