let playerText= document.getElementById('playerText')
let restartBtn= document.getElementById('restart')
let boxes= Array.from(document.getElementsByClassName('box'))

let winner = getComputedStyle(document.body).getPropertyValue('--winning-blocks')

const O_txt = "O"
const X_txt = "X"

let currentPlayer = X_txt
let spaces = Array(9).fill(null)//array with 9 null spaces intitally

const startGame = () =>{
    boxes.forEach(box=>box.addEventListener('click',boxClicked))
}

function boxClicked(e){
    const id = e.target.id

    if(!spaces[id]){//if a box has not been selected yet
        spaces[id] = currentPlayer//mark that box with "X"
        e.target.innerText = currentPlayer//display "X" inside the div tag
    }

    if(playerHasWon() != false){
        playerText.innerHTML = `${currentPlayer} has won!`
        let winning_blocks = playerHasWon();

        winning_blocks.map(box => boxes[box].style.backgroundColor=winner)
        return
    }

    currentPlayer = currentPlayer == X_txt ? O_txt : X_txt
}

const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

function playerHasWon(){
    for (const condition of winningCombos) {
        let [a,b,c] = condition

        if(spaces[a] && (spaces[a]==spaces[b]) && (spaces[a] == spaces[c])){//only if the sign in all three boxes is same
            return[a,b,c]
        }
    }   
    return false
}

restartBtn.addEventListener('click',restart)

function restart(){
    spaces.fill(null)

    boxes.forEach(box => {
        box.innerText = ""
        box.style.backgroundColor=""
    })

    playerText.innerHTML="Tic Tac Toe"
    currentPlayer=X_txt
}

startGame()