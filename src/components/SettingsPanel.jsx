import React, { useState } from 'react'
import '../styles/settingsPanel.css'

function SettingsPanel({ isOpen, onClose, filters, onFilterChange, onApplyFilters, onClearFilters }) {
  const [artist, setArtist] = useState(filters.artist || '')
  const [location, setLocation] = useState(filters.location || '')
  const [yearFrom, setYearFrom] = useState(filters.yearFrom || '')
  const [yearTo, setYearTo] = useState(filters.yearTo || '')
  
  const [isArtistOpen, setIsArtistOpen] = useState(true)
  const [isLocationOpen, setIsLocationOpen] = useState(true)
  const [isYearOpen, setIsYearOpen] = useState(true)

  if (!isOpen) return null

  const handleApply = () => {
    onApplyFilters({ artist, location, yearFrom, yearTo })
  }

  const handleClear = () => {
    setArtist('')
    setLocation('')
    setYearFrom('')
    setYearTo('')
    onClearFilters()
  }

  return (
    <div className="sett">
      <div className="sett-header">
        <button className="close-sett" onClick={onClose}>
          <img src="./img/крест Б.svg" alt="close" />
        </button>
      </div>

      <div className="filter-group">
        <label className="lab" onClick={() => setIsArtistOpen(!isArtistOpen)}>
          <span>ARTIST</span>
          <span className="icon">{isArtistOpen ? '−' : '+'}</span>
        </label>
        {isArtistOpen && (
          <div className="filter-content">
            <input
              type="text"
              className="artistFilter"
              placeholder="Select the artist"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
            />
          </div>
        )}
      </div>

      <div className="filter-group">
        <label className="lab" onClick={() => setIsLocationOpen(!isLocationOpen)}>
          <span>LOCTION</span>
          <span className="icon">{isLocationOpen ? '−' : '+'}</span>
        </label>
        {isLocationOpen && (
          <div className="filter-content">
            <input
              type="text"
              className="locationFilter"
              placeholder="Select the location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        )}
      </div>

      <div className="filter-group">
        <label className="lab" onClick={() => setIsYearOpen(!isYearOpen)}>
          <span>YEAR</span>
          <span className="icon">{isYearOpen ? '−' : '+'}</span>
        </label>
        {isYearOpen && (
          <div className="filter-content">
            <div className="years-group">
              <input
                type="text"
                placeholder="From"
                value={yearFrom}
                onChange={(e) => setYearFrom(e.target.value)}
              />
              <span>—</span>
              <input
                type="text"
                placeholder="To"
                value={yearTo}
                onChange={(e) => setYearTo(e.target.value)}
              />
            </div>
          </div>
        )}
      </div>

      <div className="filter-actions">
        <button className="btn-show" onClick={handleApply}>Show results</button>
        <button className="btn-clear" onClick={handleClear}>Clear all</button>
      </div>
    </div>
  )
}

export default SettingsPanel