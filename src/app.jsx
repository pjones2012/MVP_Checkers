import React, { useState }from 'react';
import Board from './Components/board.jsx';
import { io } from 'socket.io-client';
const App = (props) => {
  const [socket, setSocket] = useState(io.connect('http://localhost:3000'));
  const [currentTurn, setTurn] = useState('r');
  return (
    <div> Welcome to Checkers! <br/>
      <Board player={currentTurn} updatePlayer={setTurn}/>
    </div>
  );
}

export default App;