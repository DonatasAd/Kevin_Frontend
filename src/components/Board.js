import React from 'react';

const Board = ({ board, player, makeMoveHandler }) => {
  return (
    <>
      <h2 style={{ textAlign: 'center' }}>Next move for player {player}</h2>
      <ul style={{ display: 'flex', flexWrap: 'wrap', height: '600px', width: '600px' }}>
        {board.map((value, key) => {
          return (
            <li key={key} style={{ listStyle: 'none', flex: '0 0 33.333333%' }}>
              <button style={{ width: '200px', height: '200px', fontSize: '5rem' }} onClick={() => makeMoveHandler(key)}>
                {value}
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Board;
