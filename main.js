function test(x,y){
    console.log(x)
    console.log(y)
}

const gameboard = (function(){
  let board = [
  ["","","",],
  ["","","",],
  ["","","",]
  ]
  let Reset = function Reset(){
    board = [
      ["","","",],
      ["","","",],
      ["","","",]
      ]
  }
  let Mark = function Mark(marker,positionx,positiony){
    if (board[positiony][positionx] != ""){
        console.log("Invalid Input")
        return "Invalid"
    }
    board[positiony].splice(positionx,1,marker)
    DisplayController.updatedisplay()
  }
  let Log = function Log(){
    console.log(board)
  }
  let GetBoardStateCopy = function GetBoardStateCopy(){
    return board.map(row => [...row])
  }
  return{Reset,Mark,Log,GetBoardStateCopy}
})();
const DisplayController = (function(){
    //Dom Elements that display controller needs
    let player1input = document.querySelector("#playeronename")
    let player2input = document.querySelector("#playertwoname")
    let playernameform = document.querySelector("#nameform")
    let PlayAgainButton = document.querySelector("#PlayAgain")
    let winnertext = document.querySelector("#WinnerText")
    let winnercontainer = document.querySelector("#Winner")
    let maincontainer = document.querySelector("#Main")
    let tictactoecontainer = document.querySelector("#tictactoecont")
    let turndisplay = document.querySelector("#turndisplay")
    let Formsubmit = function Formsubmit(event){
      event.preventDefault()
      let player1inputvalue = player1input.value
      let player2inputvalue = player2input.value
      let player1 = CreateUser(player1inputvalue,1,undefined,false)
      let player2 = CreateUser(player2inputvalue,2,undefined,false)
      playernameform.style.display = "none"
      maincontainer.style.display = "block"
      DisplayController.initializeDisplay()
      gamecontroller.setplayers(player1,player2)
    }
    playernameform.addEventListener("submit",Formsubmit)
    let winScreen = function winScreen(winner){
        winnercontainer.style.display = "block"
        winnertext.textContent = winner + " Won!"
    }
    let tiescreen = function tiescreen(){
        winnercontainer.style.display = "block"
        winnertext.textContent = "Tie!"
    }
    let playagain = function playagain(){
        winnercontainer.style.display = "none"
        gamecontroller.initializegame()
        DisplayController.updatedisplay()
    }
    let initializeDisplay = function initializeDisplay(){
        let boardcopy = gameboard.GetBoardStateCopy()
        let childelements = tictactoecontainer.children;
        function conditions(num){
            if ((num + 1) % 3 == 0){
                return 2
            } else if ((num - 1) % 3 == 0){
                return 1
            } else{
                return 0
            }
        }
        console.log(childelements)
        for (let i = 0; 9 > i; i++){
            console.log("Test")
            childelements[i].setAttribute('data-y',Math.floor(i/3))
        }
        for (let i = 0; 9 > i; i++){
            childelements[i].setAttribute('data-x',conditions(i))
        }
        for (let i = 0; 9 > i; i++){
            childelements[i].addEventListener('click',function(){
                let x = this.getAttribute('data-x')
                let y = this.getAttribute('data-y')
                gamecontroller.playround(x,y)
            });
        }
    }
    let updatedisplay = function updatedisplay(){
        let boardcopy = gameboard.GetBoardStateCopy()
        let childelements = tictactoecontainer.children;
        for (let i = 0; 9 > i; i++){
            let child = childelements[i]
            let x = child.getAttribute('data-x')
            let y = child.getAttribute('data-y')
            child.innerHTML = boardcopy[y][x]
        }
    }
    let displayturn = function displayturn(player_name){
        turndisplay.textContent = player_name + "'s Turn!"
    }
    PlayAgainButton.addEventListener("click",playagain)

    
    return{winScreen,tiescreen,playagain,initializeDisplay,updatedisplay,displayturn}

})();
function CreateUser(name,playernumber,marker,isitcurrentturn){
  return{name,playernumber,marker,isitcurrentturn}
}
function StackOverflowexists(arr, search) {
    return arr.some(row => row.includes(search));
}
function ExistThatDoesntworkbyme(array,item){
    return array.includes(item)
}
// the reason this does not work is you are just checking the regular arrays not whats inside them. the other one goes into each individual"row"(array)and checks if just one of them has a empty string with the some array check
const gamecontroller = (function(){
  let therewasawinnerthisround  
  let player1
  let player2
  let checkwin = function checkwin(){
    let boardcopy = gameboard.GetBoardStateCopy()
    // check if any row wins and the token
    for (let i = 0; 2 >= i; i++){
        if (boardcopy[i].every((value) => value == boardcopy[i][0]) == true && boardcopy[i].every((value) => value != "")){
            console.log("A Row Won")
            console.log(boardcopy[i][0])
            return {Win:true, Token:boardcopy[i][0]}
        } 
    }
    // check if any colums wins and the token
    for (let i = 0; 2 >= i; i++){
        let history = []
        for(let j = 0; 2>= j; j++){
            history.push(boardcopy[j][i])
        }
        if (history.every((value) => value == history[0]) == true && history.every((value) => value != "")){
            console.log("All values the same in history array")
            return{Win:true, Token:history[0]}
        }
    }
    // check if any top left to bottom right diagonal wins
    // Putting code in curly braces so history stays in that scope
    {
        let history = []
        for(let i = 0; 2 >= i; i++){
            history.push(boardcopy[i][i])
        }
        if (history.every((value) => value == history[0]) == true && history.every((value) => value != "")){
            console.log("diaggggg")
            return{Win:true, Token:history[0]}
        }
    }
    
    // Check If any top right to bottem left diagonal wins
    {
        // 2 0   1 1  0 2
        let history = []
        for (let i = 0; 2 >= i; i++){
            history.push(boardcopy[i][2 - i])
        }
        if (history.every((value) => value == history[0]) == true && history.every((value) => value != "")){
            console.log("Other Diag")
            return{Win:true, Token:history[0]}
        }
    }
    //check ties
    if(StackOverflowexists(boardcopy,"") == false){
        console.log(boardcopy)
        console.log("Tie")
        return{Win:"Tie"}
    }
    console.log("No win")
    return{Win:false, Token:undefined}
    
    }
  let setplayers = function setplayers(p1,p2){
    console.log("TEST")
    player1 = p1
    player2 = p2
    initializegame()
  }
  let initializegame = function initializegame(){
    therewasawinnerthisround = false
    gameboard.Reset()
    let rng = Math.random()
    player1.isitcurrentturn = false
    player2.isitcurrentturn = false
    if (rng > 0.5){
      console.log("Player 1 Starts")
      player1.isitcurrentturn = true
      player1.marker = "X"
      player2.marker = "O"
      DisplayController.displayturn(player1.name)
      console.log(player1)
    } else{
      console.log("Player 2 Starts")
      player2.marker = "X"
      player1.marker = "O"
      player2.isitcurrentturn = true
      DisplayController.displayturn(player2.name)
      console.log(player2)
    }
    
  }
  let switchturn = function switchturn(){
    if(player1.isitcurrentturn == true){
      player1.isitcurrentturn = false
      player2.isitcurrentturn = true
      DisplayController.displayturn(player2.name)
    } else if (player2.isitcurrentturn == true){
      player2.isitcurrentturn = false
      player1.isitcurrentturn = true
      DisplayController.displayturn(player1.name)
    } else{
      console.warn("Error Switching Turn");
    }
    console.log(player1,player2)
  }
  let playround = function playround(x,y){
    if (therewasawinnerthisround == true){
        return
    }
    if (player1.isitcurrentturn == true){
      if (gameboard.Mark(player1.marker,x,y) == "Invalid"){
        console.log("Invalid Play Dude")
        return
      }
      let winobject = gamecontroller.checkwin()
      if (winobject.Win == true && winobject.Token == player1.marker){
        console.log("Player 1 WON!")
        DisplayController.winScreen(player1.name)
        therewasawinnerthisround = true
        return
      } else if(winobject.Win == "Tie"){
        console.log("TIE!")
        DisplayController.tiescreen()
        return
      }
      switchturn()
      return
    } else if (player2.isitcurrentturn == true){
      if (gameboard.Mark(player2.marker,x,y) == "Invalid"){
        console.log("Invalid Play Dude")
        return
      }
      let winobject = gamecontroller.checkwin()
      if (winobject.Win == true && winobject.Token == player2.marker){
        console.log("Player 2 WON!")
        DisplayController.winScreen(player2.name)
        therewasawinnerthisround = true
        return
      } else if(winobject.Win == "Tie"){
        console.log("TIE!")
        DisplayController.tiescreen()
        return
      }
      gameboard.Log()
      switchturn()
      return
    } else{
        warn("Error playing round")
    }
  }
  return{checkwin,setplayers,initializegame,switchturn,playround}

})();
