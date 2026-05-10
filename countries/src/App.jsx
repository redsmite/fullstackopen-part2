import data from './data'
import {useState, useEffect} from 'react'

const App = () =>{
  const [ countryAll, setCountryAll ] = useState([])
  const [ search, setSearch ] = useState('')

  useEffect(()=>{
    data
      .getAll()
      .then(returnedObject=>
        setCountryAll(returnedObject)
      )
  },[])

  const handleFilterChange = e => setSearch(e.target.value)

  const filteredCountry = countryAll.filter(country=>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  )

  const renderResult = () => {
    if (!search) {
      return null
    }

    if (filteredCountry.length >= 10) {
      return <p>Too many matches, specify another filter</p>
    } 
    
    if (filteredCountry.length > 1 && filteredCountry.length < 10) {
      return (
        filteredCountry.map(c=>
          <p key={c.ccn3}>{c.name.common}</p>
        )
      ) 
    }

    if (filteredCountry.length === 1){
      const c = filteredCountry[0]
      return (
        <>
          <h1>{c.name.common}</h1>
          <p>Capital: {c.capital}</p>
          <p>Area: {c.area} km^2</p>
          <p>Languages</p>
          <ul>
            {Object.values(c.languages).map(l=>
              <li key={l}>{l}</li>
            )}
          </ul>
          <img 
          src={c.flags.png}
          style={{width:"150px", border:"1px solid lightgrey"}}
           />
        </>
      )
    }
  }

  return(
    <div>
      <p>find countries <input onChange={handleFilterChange} value={search} /></p>
      <div>
        {renderResult()}
      </div>
    </div>
  )

}

export default App