import React, { useState }  from 'react';
import Square from './square.jsx';


const Board = (props) => {
  const seedArray = new Array(8).fill(0);
  const [availableMoves, setAvailableMoves] = useState([]);
  const [turnStatus, setTurnStatus] = useState('whichPiece');
  const [currentPeice, setCurrentPeice] = useState(null);
  const [boardStatus, setBoardStatus] = useState([
    [null,'r',null,'r',null,'r',null,'r'],
    ['r',null,'r',null,'r',null,'r',null],
    [null,'r',null,'r',null,'r',null,'r'],
    [null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null],
    ['b',null,'b',null,'b',null,'b',null],
    [null,'b',null,'b',null,'b',null,'b'],
    ['b',null,'b',null,'b',null,'b',null]
  ]);

  var findAvailableMoves = (thisRow, thisCol) => {
    //function that defines available moves
    var moves = [];
    //move 1 space moves
    var move1space = [[thisRow-1,thisCol-1],[thisRow-1,thisCol+1],[thisRow+1,thisCol-1],[thisRow+1,thisCol+1]];
    for (var spot of move1space){
      if (boardStatus[spot[0]][spot[1]] === null){
        moves.push(spot);
      }
    }
    //implement that we cannot go backwards!
    //jump moves
    var moveJumpspace = move1space.filter((spot) => {
      var opponent = props.player === 'r'? 'b':'r';
      return boardStatus[spot[0]][spot[1]] === opponent;
    }).map((spot)=>{
      return [2*(spot[0]-thisRow) + thisRow, 2*(spot[1]-thisCol) + thisCol];
    })
    console.log('moveJump Space', moveJumpspace);
    for (var spot of moveJumpspace){
      if (boardStatus[spot[0]][spot[1]] === null){
        moves.push(spot);
      }
    }
    //implement if we jump we need to remove the opponent peice!
    console.log('these are availableMoves' , moves);
    setAvailableMoves(moves);

    //implement queen moves
  }

  var clickSquare = (row,col) => {
    if (turnStatus === 'whichPiece' && boardStatus[row][col] === props.player){
      //console.log('I see you row ', row , 'and col ', col );
      findAvailableMoves(row, col);
      setCurrentPeice( [row, col] );
      setTurnStatus( 'movePiece' );
      //console.log('why is this info lost ', availableMoves);
    } else if (turnStatus === 'movePiece') {
      //move peice
      console.log('I see you row ', row , 'and col ', col );
      console.log('can i move? ', availableMoves);
      for (var [one, two] of availableMoves){
        if ( one === row && two === col){
          //console.log('okay so did we make it?!');
          var newBoard = boardStatus.slice();
          //console.log('okay so did we make it?!');
          newBoard[currentPeice[0]][currentPeice[1]] = null;
          newBoard[row][col] = props.player;
          console.log('did we update the damn board? ', newBoard);
          setBoardStatus(newBoard);
          setTurnStatus( 'whichPiece');
          props.updatePlayer(props.player === 'r'? 'b':'r');
        }
      }
    } else {
      console.log('do nothing!');
    }
  }
  var currentBoard = (board) => {
    return seedArray.map( (a, j) => {
      return  (
        <div key={`row${j}`}
             style={{position: 'relative',
                     display: 'inline-block',
                     margin: '0px 10vw 0px',
                     width: '80%'}}>
          {seedArray.map( (b, i) => {
            if ((j + i) % 2 === 1) {
              return <Square key={`${i}and${j}`}
                             row={j} col={i}
                             clickHandler={clickSquare}
                             turn={turnStatus}
                             color='black'
                             playerFill={boardStatus[j][i]?boardStatus[j][i]:null}/>;
            } else if ( (j + i) % 2 === 0) {
              return <Square key={`${i}and${j}`}
                             row={j} col={i}
                             clickHandler={clickSquare}
                             turn={turnStatus}
                             color='white'
                             playerFill={boardStatus[j][i]?boardStatus[j][i]:null}/>;
            }
          })}
        </div>
      );
    })
  };

  return (
    <div>
      {currentBoard(boardStatus)}
    </div>
  );
}

export default Board;