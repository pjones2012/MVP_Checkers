import React, { useState, useEffect}from 'react';
import Board from './Components/board.jsx';
import { AppBar, Box, Button , Typography, Toolbar} from '@mui/material';
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
  }, props.port)

  return (
    <div>
      <Box>
        <AppBar position="fixed">
          <Toolbar>
            <Typography variant="h6" color="inherit" component="div">
            Welcome to Checkers! You are {`${user === 'r'? 'Player 1' : 'Player 2'}`}
            </Typography>
            <Button variant="contained">New Game</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Toolbar />
      <Box>
        <Board player={currentTurn} updatePlayer={setTurn} usePort={props.port} user={user}/>
      </Box>
    </div>
  );
}

export default App;