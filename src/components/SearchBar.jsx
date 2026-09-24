import React, { useState } from 'react'
import '../styles/searchBar.css'

function SearchBar({ onOpenSettings, onSearch, searchTerm }) {
  const [inputValue, setInputValue] = useState(searchTerm || '')

  const handleSearch = (value) => {
    setInputValue(value)
    if (onSearch) {
      onSearch(value)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e.target.value)
    }
  }

  return (
    <div className="search-container">
      <div className="search-wrapper">
        
        <input 
          type="search" 
          id="searchInput" 
          placeholder="Painting title" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        
      </div>
      <button type="button" id="setting" onClick={onOpenSettings}>
        <img src="./img/настройки Б.svg" alt="settings" />
      </button>
    </div>
  )
}

export default SearchBar