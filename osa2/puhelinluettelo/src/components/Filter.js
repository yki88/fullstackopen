import React from 'react'

const Filter = ({ value, onChange }) => {
  return (
    <div>Rajaa näytettäviä  
      <input value={value} onChange={onChange}></input>
    </div>
  )
}

export default Filter