import React from 'react'

const PersonForm = ({ onSubmit, onChangeName, newName, onChangeNumber, newNumber }) => {
  return (
    <form onSubmit={onSubmit}>
    <div>
      nimi: <input value={newName}
        onChange={onChangeName} />
    </div>
    <div>
      numero: <input value={newNumber}
      onChange={onChangeNumber} /> 
    </div>
    <div>
      <button type="submit">lisää</button>
    </div>
  </form>

  )
}

export default PersonForm