import React, { useState, useEffect } from 'react'
import SearchBar from './components/SearchBar'
import SettingsPanel from './components/SettingsPanel'
import PaintCard from './components/PaintCard'
import Pagination from './components/Pagination'
import './styles/index.css'

const ITEMS_PER_PAGE = 6

function App() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [theme, setTheme] = useState('dark')
  const [paintings, setPaintings] = useState([])
  const [filteredPaintings, setFilteredPaintings] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({ artist: '', yearFrom: '', yearTo: '' })
  const [noResultsMessage, setNoResultsMessage] = useState(null)

  useEffect(() => {
    fetch('https://registry.scalar.com/@mail-ufgwz/apis/gallery-api@1.0')
      .then(res => res.json())
      .then(spec => {
        const data = spec.paths['/paintings'].get.responses['200'].content['application/json'].example
        setPaintings(data)
        setFilteredPaintings(data)
        setLoading(false)
      })
      .catch(console.error)
  }, [])

  useEffect(() => {
    document.body.className = `theme-${theme}`
  }, [theme])

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark')

  // Apply search and filters
  const applyFiltersAndSearch = (search, filterParams) => {
    let results = [...paintings]

    // Apply search by painting title
    if (search.trim()) {
      const searchLower = search.toLowerCase()
      results = results.filter(painting => 
        painting.title?.toLowerCase().includes(searchLower)
      )
    }

    // Apply artist filter
    if (filterParams.artist?.trim()) {
      const artistLower = filterParams.artist.toLowerCase()
      results = results.filter(painting => 
        painting.artist?.toLowerCase().includes(artistLower)
      )
    }

    // Apply year range filter
    if (filterParams.yearFrom?.trim()) {
      const yearFromNum = parseInt(filterParams.yearFrom, 10)
      if (!isNaN(yearFromNum)) {
        results = results.filter(painting => {
          const paintingYear = painting.year || painting.date
          return paintingYear && parseInt(paintingYear, 10) >= yearFromNum
        })
      }
    }

    if (filterParams.yearTo?.trim()) {
      const yearToNum = parseInt(filterParams.yearTo, 10)
      if (!isNaN(yearToNum)) {
        results = results.filter(painting => {
          const paintingYear = painting.year || painting.date
          return paintingYear && parseInt(paintingYear, 10) <= yearToNum
        })
      }
    }

    setFilteredPaintings(results)
    setCurrentPage(1)

    // Set no results message
    if (results.length === 0 && paintings.length > 0) {
      let query = search.trim()
      if (!query && filterParams.artist?.trim()) {
        query = filterParams.artist.trim()
      }
      setNoResultsMessage(query || 'your query')
    } else {
      setNoResultsMessage(null)
    }
  }

  const handleSearch = (term) => {
    setSearchTerm(term)
    applyFiltersAndSearch(term, filters)
  }

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters)
    applyFiltersAndSearch(searchTerm, newFilters)
  }

  const handleClearFilters = () => {
    const emptyFilters = { artist: '', yearFrom: '', yearTo: '' }
    setFilters(emptyFilters)
    setSearchTerm('')
    applyFiltersAndSearch('', emptyFilters)
  }

  const totalPages = Math.ceil(filteredPaintings.length / ITEMS_PER_PAGE)
  const currentPaintings = filteredPaintings.slice(
    (currentPage - 1) * ITEMS_PER_PAGE, 
    currentPage * ITEMS_PER_PAGE
  )

  if (loading) return null

  return (
    <>
      <header>
        <button className="theme-toggle" onClick={toggleTheme}>
          <img src={theme === 'dark' ? './img/солнце.svg' : './img/луна.svg'} alt="theme" />
        </button>
      </header>
      
      <main>
        <SearchBar 
          onOpenSettings={() => setIsSettingsOpen(true)} 
          onSearch={handleSearch}
          searchTerm={searchTerm}
        />
        <SettingsPanel 
          isOpen={isSettingsOpen} 
          onClose={() => setIsSettingsOpen(false)}
          filters={filters}
          onApplyFilters={handleApplyFilters}
          onClearFilters={handleClearFilters}
        />
        
        {noResultsMessage && (
          <div className="no-results">
            <p className="no-results-message">
              No matches for <strong>{noResultsMessage}</strong>
            </p>
            <p className="no-results-hint" >
              Please try again with a different spelling or keywords.
            </p>
          </div>
        )}

        <div className="img-container">
          {currentPaintings.map((p, idx) => (
            <PaintCard key={idx} {...p} image={p.imageUrl} />
          ))}
        </div>
      </main>

      {filteredPaintings.length > 0 && (
        <footer>
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => {
              setCurrentPage(page)
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          />
        </footer>
      )}
    </>
  )
}

export default App