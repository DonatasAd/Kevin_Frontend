import React from 'react';

export default function history({ logs }) {
  return (
    <>
      <h3>Moves History</h3>
      <ul>{logs ? logs.map((el, key) => <li key={key}>{el}</li>) : null}</ul>
    </>
  );
}
