import React from 'react'
import Data from '../Data/Data';

const CanchaContainer = ({cancha}) => {
  return (
    <div className="container">
    <div className="cancha-list">
      {cancha?.map((cancha) => (
        <Data cancha={cancha} key={cancha.id} />
      ))}
    </div>
  </div>
  );
}

export default CanchaContainer
