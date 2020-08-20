import React, { useState, useEffect } from 'react';
import Board from './components/Board';
import History from './components/History';

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [logs, setLogs] = useState([]);
  const [winner, setWinner] = useState(null);
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(false);
  // Resume game if token exists
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setLoading(true);
      fetch('http://localhost:3500/load-game', {
        method: 'GET',
        headers: new Headers({
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        }),
      })
        .then(async (res) => {
          if (res.ok) {
            return res.json();
          }
          const text = await res.text();
          throw new Error(JSON.parse(text).message);
        })
        .then((data) => {
          setLoading(false);
          setWinner(data.winner);
          setPlayer(data.lastMove === 'X' ? 'O' : 'X');
          setBoard(data.board);
          setLogs(data.logs);
        })
        .catch((error) => {
          alert(error.message);
          resetGame();
        });
    } else {
      resetGame();
    }
  }, []);

  function resetGame() {
    setLoading(true);
    setBoard(Array(9).fill(null));
    setLogs([]);
    setPlayer(null);
    setWinner(null);
    // Start new game
    fetch('http://localhost:3500/start-game')
      .then(async (res) => {
        console.log(res);
        if (res.ok) {
          return res.json();
        }
        const text = await res.text();
        throw new Error(JSON.parse(text).message);
      })
      .then((data) => {
        localStorage.setItem('token', data.token);
        setPlayer(data.startingPlayer);
        setLoading(false);
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  function makeMoveHandler(position) {
    const token = localStorage.getItem('token');
    fetch('http://localhost:3500/makemove', {
      method: 'POST',
      headers: new Headers({
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({ position, player }),
    })
      .then(async (res) => {
        if (res.ok) {
          return res.json();
        }
        const text = await res.text();
        throw new Error(JSON.parse(text).message);
      })
      .then((data) => {
        setWinner(data.winner);
        setPlayer(data.lastMove === 'X' ? 'O' : 'X');
        setBoard(data.board);
        setLogs(data.logs);
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  return (
    <>
      {loading ? (
        <h1 style={{ textAlign: 'center' }}>Loading....</h1>
      ) : (
        <>
          <h1 style={{ textAlign: 'center' }}>Tick Tack Toe Game</h1>
          {!winner ? (
            <>
              <Board board={board} player={player} makeMoveHandler={makeMoveHandler} />
              <History logs={logs} />
            </>
          ) : (
            <>
              <h1>{winner === 'Draw' ? 'Game is Draw!!!' : `Winner is player ${winner}`}</h1>
              <button onClick={() => resetGame()}>Start New game</button>
            </>
          )}
        </>
      )}
    </>
  );
}

export default App;
