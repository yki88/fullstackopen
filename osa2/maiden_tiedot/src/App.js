import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CountrySpec from './components/CountrySpec'

const App = () => {
  const [allCountries, setAllCountries] = useState([])
  const [newCountry, setNewCountry] = useState([])
  const filteredCountries = allCountries.filter(p => p.name.includes(newCountry))
  const [weatherData, setWeatherData] = useState([]) 

  const handleCountryChange = (event) => (
    setNewCountry(event.target.value)
  )

  const rows = () => {
    if (filteredCountries.length < 11 && filteredCountries.length > 1) {
      return (
        filteredCountries.map(p =>
          <li key={p.name}>{p.name}
            <button onClick={() => setNewCountry(p.name)}>show</button>
          </li>
        )
      )
    }
    if(filteredCountries.length > 10) {
      return (
        <div>Too many matches, specify another filter</div>
      )
    }
    if(filteredCountries.length === 1) {
      return (
        <CountrySpec
          country={filteredCountries[0]} />
      )
    }
      
    }
  

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setAllCountries(response.data)
      })
  }, [])

/*
  useEffect(() => {
    let url = 'https://api.openweathermap.org/data/2.5/weather?q=' 
    + filteredCountries[0] + '&appid=63f61db89a40ba41aae5fab7bedf2083'
    console.log(url)
    axios
    .get(url)
    .then(response => {
      console.log(response.data)
      setWeatherData(response.data)
    })
  }, [filteredCountries[0]])
*/
  return (
    <div>
      find countries: <input value={newCountry}
        onChange={handleCountryChange} />
      <ul>
        {rows()}
      </ul>
    </div>
  )

}
export default App;
