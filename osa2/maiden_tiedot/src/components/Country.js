import React from 'react'

const Country = ({ country }) => {
  return (
    <li>{country.name}
      <button>show</button>
    </li>
  )
}

export default Country