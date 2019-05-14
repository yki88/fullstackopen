import React from 'react'

const CountrySpec = ({ country }) => {
  return (
    <>
    <h2>{country.name}</h2>
    <div>Capital: {country.capital}</div>
    <div>Population: {country.population}</div>
    <h3>Languages</h3>
    <ul>
      {country.languages.map(l => 
        <li key={l.name}>{l.name}</li>
        )}
    </ul>
    <div><img src={country.flag} width='62' alt='flag'/></div>
    
    </>
  )
}

export default CountrySpec