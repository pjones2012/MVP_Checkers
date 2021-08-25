import React, { useState, useEffect}from 'react';
import Board from './Components/board.jsx';
//import { io } from 'socket.io-client';


const App = (props) => {

  const [currentTurn, setTurn] = useState('r');
  const [user, setUser] = useState(null);

  props.port.on('PlayerAssign', (data) => {
    //console.log('are we getting any assignments here?', data.assign);
    if (data.assign === 'Player 1'){
      setUser('r');
    } else if (data.assign === 'Player 2'){
      setUser('b');
    }
  });

  useEffect(()=> {
    props.port.emit('PlayerAssign', {});
  })

  return (
    <div> Welcome to Checkers! You are {`${user === 'r'? 'Player 1' : 'Player 2'}`}<br/>
      <Board player={currentTurn} updatePlayer={setTurn} usePort={props.port} user={user}/>
    </div>
  );
}

export default App;