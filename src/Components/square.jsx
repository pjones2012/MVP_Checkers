import React, { useState } from 'react';

const Square = (props) => {
  const [isHighlighted, setHighlight] = useState(false);
  var fillStatus = () => {
    if (props.playerFill === 'r'){
      return <img height='100%' width='100%' src = './RedPiece.png'/>;
    } else if (props.playerFill === 'b'){
      return <img height='100%' width='100%' src = './BlackPiece.png'/>;
    } else {
      return null;
    }
  };

  var iWasClicked = (e) => {
    e.preventDefault();
    props.clickHandler(props.row, props.col);
  }

  return (
    <span className='square'
          onClick={iWasClicked}
          style={{backgroundColor: props.color, display: 'inline-block', width: '9vw', height: '9vw', borderStyle: props.selected?'solid':'none', borderColor: 'yellow'}}>
      {fillStatus()}
    </span>
  );
}

export default Square;
