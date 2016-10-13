/*jslint esversion:6*/ /* es para eliminar el error de las constantes*/
/*
Definicion del objeto del juego
*/
const gamer1 = 'X';
const gamer2 = 'O';
var game = {}; // nuevo objeto
game.turn = gamer1; //define de quien es el turno
game.over = false; //finaliza el juego
game.winner= null;
game.winner  = null; // ganador del juego
game.board = [
  [null,null,null],
  [null,null,null],
  [null,null,null],
];
game.board.dom_ready = false;
game.nextTurn = function(){
  if(game.turn === gamer1){
    game.turn = gamer2;
  } else{
    game.turn = gamer1;
  }
  return game.turn;
};
game.checkWinner = function(){
  if(game.board.dom_ready !== true){
    return null;
  }
  //check row
  game.board.forEach(function(row){
    var prev_value=null;
    var current_value = null;
    if(row[0].textContent==row[1].textContent &&
      row[1].textContent===row[2].textContent &&
      row[0].textContent!==''){
        game.winner = row[0].textContent;
      }
    });
    //check columns
    var i=0;
    for(i=0;i<game.board.length;i++){
      if(game.board[0][i].textContent === game.board[1][i].textContent &&
        game.board[1][i].textContent === game.board[2][i].textContent &&
        game.board[0][i].textContent !== ''){
          game.winner = game.board[0][i].textContent;
        }
      }
      //check diagonals
      if(game.board[0][0].textContent ===  game.board[1][1].textContent &&
        game.board[1][1].textContent ===  game.board[2][2].textContent &&
        game.board[0][0].textContent !== ''){
          game.winner = game.board[0][0].textContent;
        }
        if(game.board[0][2].textContent ===  game.board[1][1].textContent &&
          game.board[1][1].textContent ===  game.board[2][0].textContent &&
          game.board[0][2].textContent !== ''){
            game.winner = game.board[0][2].textContent;
          }
          if(game.winner !== null){
            console.log(game.winner);
          }
          //return the winner if there is one else return null
        };
        game.clearBoard = function(){
          if(game.board.dom_ready === false){return;}
          game.board.forEach(function(row){
            row.forEach(function(cell){
              cell.textContent = "";
            });
          });
        };
        document.addEventListener("DOMContentLoaded",function(){
          // lo siguinte despues de la instruccion DOMContentLoaded agregamos los elementos que se encuentran en el html


          var row0 = document.querySelectorAll("#boardgame li[data-y='0']");
          var row1 = document.querySelectorAll("#boardgame li[data-y='1']");
          var row2 = document.querySelectorAll("#boardgame li[data-y='2']");
          var playing_info = document.querySelectorAll("#game-info .player");
          playing_info = Array.from(playing_info);
          game.board[0] = Array.from(row0);
          game.board[1] = Array.from(row1);
          game.board[2] = Array.from(row2);
          game.board.dom_ready = true;
          //board ready

          game.board.forEach(function(row, index, board){//elementos, indice, arreglos
            //add click behavior per cell
            row.forEach(function(cell, index, row){
              cell.addEventListener("click",function(){
                if(cell.textContent !== "" || game.winner !== null){
                  return;//exit condicion
                }
                cell.textContent = game.turn;
                game.checkWinner();
                if(game.nextTurn() === gamer1){
                  playing_info[0].querySelector(".status").textContent = "Juega";
                  playing_info[1].querySelector(".status").textContent = "Espera";
                }else{
                  playing_info[0].querySelector(".status").textContent = "Espera";
                  playing_info[1].querySelector(".status").textContent = "Juega";
                }
              });


            });
          });

          console.log(game.board);
        });
