import React, { useState, useEffect } from 'react'
import Person from './components/Person'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/persons'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')

  const filteredNames =  persons.filter(p => p.name.toLowerCase().includes(nameFilter.toLowerCase()))

  useEffect(() => {
    personService.getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const delPersonId = (id, name) => {
    if (window.confirm(`Poistetaanko '${name}'?`)) { 
    personService
    .deletePerson(id)
    .then(
      setPersons(persons.filter(n => n.id !== id))
    )
    .catch(error => {
      alert(`henkilö '${name}' on jo valitettavasti poistettu palvelimelta`)
    })
    }
  }

  const rows = () => 
    filteredNames.map(p =>
    <Person
      key={p.name}
      person={p}
      delPerson={() => delPersonId(p.id, p.name)}
    />
    )
  
  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if(persons.map(e => e.name).indexOf(newName) === -1) {
      personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
    }
    else {
      if (window.confirm(`Korvataanko '${newName}' numero uudella?`)) {
      const changedPerson = persons.filter(p => p.name === newName)
      personService
      .update(changedPerson[0].id, personObject)
      .then(returnedPerson => {
        setPersons(persons.map(p => p.id !== changedPerson[0].id ? p : returnedPerson))
        setNewName('')
        setNewNumber('')
      })
    }
    }
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