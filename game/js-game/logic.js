let board = [
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0]
]

console.log(board[0][0])

let currentPlayer = 1
let gameOver = false
let winner = null
let winnerName = null
let lastMove = null
let moveCount = 0
let redPlayer = ""
let yellowPlayer = ""


function restartGame(){
     board = [
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0]
    
     ]
    currentPlayer = 1
    gameOver = false
    winner = null
    winnerName = null
    lastMove = null
    moveCount = 0
}

function placePiece(column){
    if (gameOver === true){
        alert(`Spiller ${winner} har allerede vunnet!`)
        return
    }
    
    for (let row = 5;row >= 0; row--){
        if (board[row][column] === 0){
            board[row][column] = currentPlayer
            moveCount++
            return lastMove = [row,column]
        }
        }
    
    statusEl.textContent = "This column is already full!"
    return
    
}
function checkWin(){
   
    if (lastMove === null){
        return false
    }
    
    let [row, column] = lastMove
    let player = board[row][column]

    let horizontalCount = 1
    let leftDiagonalCount = 1
    let rightDiagonalCount = 1
    let verticalCount = 1

    let r = row
    let c = column

    while (c + 1 < 7 && board[r][c + 1] === player) { /* vannrett sjekk mot høyre */
        c += 1
        horizontalCount += 1
    }

    r = row
    c = column

    while (c - 1 >= 0 && board[r][c - 1] === player) { /* vannrett sjekk mot venstre */
        c -= 1
        horizontalCount += 1
    }

    r = row
    c = column

    while (r-1 >= 0 && board[r-1][c]== player){ /* vertikal sjekk oppover */
        r -= 1
        verticalCount += 1
    }

    r = row
    c = column

    while (r+1 < 6 && board[r+1][c] === player){ /* vertikal sjekk nedover */
        r += 1
        verticalCount += 1
    }

    r = row
    c = column

    while (c-1 >= 0 && r-1 >= 0 && board[r-1][c-1] === player){ /* \ diagonal sjekk mot venstre topp.  */
        r -= 1
        c -= 1
        leftDiagonalCount += 1
    }

    r = row
    c = column

    while (c+1 < 7 && r+1 < 6 && board[r+1][c+1]== player){ /* \ diaganol sjekk mot høyre bunn */
        r += 1
        c += 1
        leftDiagonalCount += 1
    }

    r = row
    c = column

    while (c+1 < 7 && r-1 >=0 && board[r-1][c+1]== player){ /* / diagonal sjekk mot høyre topp */
        c += 1
        r -= 1
        rightDiagonalCount += 1
    }

    r = row
    c = column

    while (c-1 >=0 && r+1 < 6 && board[r+1][c-1]== player){ /* / diagonal sjekk mot venstre bunn */
        c -= 1
        r += 1
        rightDiagonalCount += 1
    }



     if (horizontalCount >= 4 || leftDiagonalCount >= 4 || rightDiagonalCount >= 4  || verticalCount >= 4) {
        winner = player
        if (winner === 1){
            winnerName = redPlayer
        }
        else{
            winnerName = yellowPlayer
        }
        gameOver = true
        return true
    }


    return false
}


function checkDraw(){
    if (moveCount === 42){
        gameOver = true
        winner = "uavgjort"
        return true
    }
    return false
}

function changeCurrentPlayer(){
    if (currentPlayer === 1){
        currentPlayer = 2
    }
    else{
        currentPlayer = 1
    }
}
