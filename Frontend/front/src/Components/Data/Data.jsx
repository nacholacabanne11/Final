import React from 'react'
import './data.css'

const Data = ({cancha}) => {
    const {nombre,id,techada} = cancha;
    const statusText = techada ? "techada" : "no techada";
  return (
    
    <div  className="product-card" key={id}>
       <span>{nombre}</span>
       <p>{statusText}</p>
       <p>id de la cancha:{id}</p>
    </div>
  )
}

export default Data
