import React from 'react'
import '../styles/pagination.css'

function Pagination({ currentPage, totalPages, onPageChange }) {
  const getPageNumbers = () => {
    const pages = []
    
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1)
      if (currentPage > 3) pages.push('...')
      
      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)
      
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
      
      if (currentPage < totalPages - 2) pages.push('...')
      pages.push(totalPages)
    }
    
    return pages
  }

  return (
    <div className="nav">
      <button 
        className="nav-button"
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
      >
        <img src="./img/стрелка ЛБ.svg" alt="previous" />
      </button>
      
      {getPageNumbers().map((page, index) => (
        <button 
          key={index}
          className={`page-button ${currentPage === page ? 'active' : ''}`}
          onClick={() => typeof page === 'number' && onPageChange(page)}
          disabled={typeof page !== 'number'}
        >
          {page}
        </button>
      ))}
      
      <button 
        className="nav-button"
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
      >
        <img src="./img/стрелка ПБ.svg" alt="next" />
      </button>
    </div>
  )
}

export default Pagination