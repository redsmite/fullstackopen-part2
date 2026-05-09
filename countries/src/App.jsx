import data from './data'
import { useState, useEffect } from 'react'

const App = () => {
  const [country, setCountry] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    data.getAll().then(returnedObject => {
      setCountry(returnedObject)
    })
  }, [])

  const handleInputChange = e => {
    setSearch(e.target.value)
  }

  const countriesToShow = country.filter(c =>
    c.name.common.toLowerCase().includes(search.toLowerCase())
  )

  // Logic to determine what to display
  const renderContent = () => {
    if (search === '') return null
    
    if (countriesToShow.length > 10) {
      return <p>Too many matches, specify another filter</p>
    }

    if (countriesToShow.length === 1) {
      const c = countriesToShow[0]
      return (
        <div>
          <h1>{c.name.common}</h1>
          <p>capital {c.capital}</p>
          <p>area {c.area}</p>
          
          <h3>languages:</h3>
          <ul>
            {Object.values(c.languages).map(lang => (
              <li key={lang}>{lang}</li>
            ))}
          </ul>
          <img 
            src={c.flags.png} 
            alt={`Flag of ${c.name.common}`} 
            style={{ width: '150px' }} 
          />
        </div>
      )
    }

    return countriesToShow.map(c => (
      <p key={c.cca3 || c.name.common}>{c.name.common}</p>
    ))
  }

  return (
    <div>
      <p>
        find country <input onChange={handleInputChange} value={search} />
      </p>
      {renderContent()}
    </div>
  )
}

export default App