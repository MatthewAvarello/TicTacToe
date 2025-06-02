const gameboard = (function(){
  let board = [
  ["0","0","0",],
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
    board[positiony].splice(positionx,1,marker)
  }
  let Log = function Log(){
    console.log(board)
  }
  let GetBoardStateCopy = function GetBoardStateCopy(){
    return board.map(row => [...row])
  }
  return{Reset,Mark,Log,GetBoardStateCopy}
})();

function CreateUser(name,number,marker){
  return{name,number,marker}
}

const gamecontroller = (function(){
  let checkwin = function checkwin(){
    let boardcopy = gameboard.GetBoardStateCopy()
    if (boardcopy[0].every((value) => value == boardcopy[0][0]) == true && boardcopy[0].every((value) => value != "")){
      console.log("First row is all the same")
    } else if ((boardcopy[1].every((value) => value == boardcopy[1][0]) == true && boardcopy[1].every((value) => value != ""))){
      console.log("Secondrow")
    } else if((boardcopy[2].every((value) => value == boardcopy[2][0]) == true && boardcopy[2].every((value) => value != ""))){
      console.log("Thirdrow")
    } else{
      console.log("")
    }
  }

  return{checkwin}
})();

console.log(gamecontroller.checkwin())
let player1 = CreateUser("Matthew",1,"X")
console.log(player1)