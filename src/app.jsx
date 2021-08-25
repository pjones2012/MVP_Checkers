import React, { useState }from 'react';
import Board from './Components/board.jsx';

const App = (props) => {
  const [currentTurn, setTurn] = useState('r');
  return (
    <div> Welcome to Checkers! <br/>
      <Board player={currentTurn} updatePlayer={setTurn}/>
    </div>
  );
}

export default App;