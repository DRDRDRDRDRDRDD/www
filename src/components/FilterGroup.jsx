import React, { useState } from 'react'

function FilterGroup({ title, type, options = [], onApply, placeholder }) {
  const [isOpen, setIsOpen] = useState(type === 'years' ? true : false)
  const [value, setValue] = useState('')

  const handleChange = (e) => {
    setValue(e.target.value)
    if (onApply) onApply(e.target.value)
  }

  return (
    <div className="filter-group">
      <div className="lab" onClick={() => setIsOpen(!isOpen)}>
        <label style={{ fontWeight: '100' }}>{title}</label>
        <div className="icon">{isOpen ? '-' : '+'}</div>
      </div>
      
      {isOpen && (
        <div className="filter-content">
          {type === 'select' ? (
            <select className="artistFilter" value={value} onChange={handleChange}>
              <option value="">select the {title.toLowerCase()}</option>
              {options.map((opt, idx) => (
                <option key={idx} value={opt}>{opt}</option>
              ))}
            </select>
          ) : type === 'years' ? (
            <div className="years-group">
              <input 
                type="number" 
                className="artistFilter" 
                placeholder={placeholder?.from || "From"} 
                min="0" 
                max="2026"
                onChange={(e) => onApply?.('from', e.target.value)}
              />
              <img src="./img/years.svg" alt="years" />
              <input 
                type="number" 
                className="artistFilter" 
                placeholder={placeholder?.to || "To"} 
                min="0" 
                max="2026"
                onChange={(e) => onApply?.('to', e.target.value)}
              />
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
}

export default FilterGroup