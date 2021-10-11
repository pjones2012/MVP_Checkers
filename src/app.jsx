import React, { useState, useEffect}from 'react';
import Board from './Components/board.jsx';
import LeaderBoard from './Components/leaderBoard.jsx';
import { AppBar, Box, Button , Typography, Toolbar} from '@mui/material';
//import { io } from 'socket.io-client';


const App = (props) => {

  const [currentTurn, setTurn] = useState('r');
  const [user, setUser] = useState(null);
  const [leaders, setLeaders] = useState([{user_name: null, wins: 0}]);
  props.port.on('PlayerAssign', (data) => {
    //console.log('are we getting any assignments here?', data.assign);
    if (data.assign === 'Player 1'){
      setUser('r');
    } else if (data.assign === 'Player 2'){
      setUser('b');
    }
    setLeaders(data.leaders.rows);
    console.log(data.leaders.rows);
  });

  useEffect(()=> {
    props.port.emit('PlayerAssign', {});
  }, [props.port])
  //BackEnd API not made for this. want leaders sorted
  props.port.on('GameComplete', (data) => {
    setLeaders(data.leaders)
  });
//BackEnd API not made for this. what do i send with game complete
  useEffect(()=> {
    props.port.emit('GameComplete', {});
  }, ['Win']);

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
      <Box>
        <LeaderBoard one={leaders}/>
      </Box>
    </div>
  );
}

export default App;