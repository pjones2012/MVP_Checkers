import React from 'react';

const LeaderBoard = (props) => {
;  return (
    <div>
      LeaderBoard
      {props.info.map((item)=>{
        return (<div>{item.user_name} Wins: {item.wins}</div>);
      })}
    </div>
  );
}


export default LeaderBoard;