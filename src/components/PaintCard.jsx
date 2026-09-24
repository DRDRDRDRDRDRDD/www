import React from 'react'
import '../styles/paintCard.css'

function PaintCard({ image, title, artist, location, year }) {
  return (
    <div className="img-card">
      <img src={image} alt={title} />
      <div className="img-info-container">
        <div className="img-info">
          <div className="img-info-name">
            <p>{title}</p>
            <p className="num">{location}</p>
          </div>
          <div className="img-info-location">
            <p>{artist}</p>
            <p className="num">{year}</p>
          </div>
        </div>
        <div className="subtitle">
          <img src="./img/стрелка Б.svg" alt="arrow" />
        </div>
      </div>
    </div>
  )
}

export default PaintCard