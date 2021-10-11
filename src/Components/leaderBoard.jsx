import React from 'react';

const LeaderBoard = (props) => {
  console.log('accessing props', props.one)
;  return (
    <div>
      LeaderBoard
      {props.one.map((item)=>{
        return (<div>{item.user_name} Wins: {item.wins}</div>);
      })}
    </div>
  );
}


export default LeaderBoard;