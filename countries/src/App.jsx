import {useState, useEffect} from 'react'
import data from './data'

const App = () =>{
  const [countryAll, setCountryAll] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(()=>{
    data
      .getAll()
      .then(returnedObject=>
        setCountryAll(returnedObject)
      )
  },[])

  const renderedOutput = () => {
    const filteredCountries = countryAll.filter(c=>
      c.name.common.toLowerCase().includes(filter.toLowerCase())
    )

    if(!filter){
      return null
    }

    if(filteredCountries.length > 10){
      return <p>Too many matches, specify another filter</p>
    }

    if(filteredCountries.length > 1) {
      return filteredCountries.map(c=>
        <p key={c.ccn3}>{c.name.common}</p>
      )
    }

    if(filteredCountries.length===1){
      const c = filteredCountries[0]
      return (
        <>
          <h1>{c.name.common}</h1>
          <p>Capital {c.capital}</p>
          <p>Area {c.area}</p>
          <h3>Languages</h3>
          <ul>
            {Object.values(c.languages).map(c=>
              <li key={c}>{c}</li>
            )}
          </ul>
          <img src={c.flags.png}
          style={{width:"150px"}} />
        </>
      )
    }
  }

  return(
    <div>
      <p>find countries <input value={filter} onChange={e=>setFilter(e.target.value)} /></p>
      <div>
        {renderedOutput()}
      </div>
    </div>
  )
}

export default App