import React, { useState } from 'react'
import Person from './components/Person'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Martti Tienari', number: '040-123456' },
    { name: 'Arto Järvinen', number: '040-123456' },
    { name: 'Lea Kutvonen', number: '040-123456' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')

  const filteredNames =  persons.filter(p => p.name.toLowerCase().includes(nameFilter.toLowerCase()))

  const rows = () => 
    filteredNames.map(p =>
    <Person
      key={p.name}
      person={p}
    />
    )
  
  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if(persons.map(e => e.name).indexOf(newName) === -1)
      setPersons(persons.concat(personObject))
    else 
      alert(`${newName} on jo luettelossa`)
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const filterNames = (event) => {
    setNameFilter(event.target.value)
  }


  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <Filter value={nameFilter} onChange={filterNames} />
      <h3>Lisää uusi</h3>
      <PersonForm onSubmit={addPerson}
         onChangeName={handleNameChange} newName={newName}
         onChangeNumber={handleNumberChange} newNumber={newNumber}></PersonForm>
    
      <h3>Numerot</h3>
      <ul>
        {rows()}
      </ul>
    </div>
  )

}

export default App