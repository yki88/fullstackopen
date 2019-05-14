import React, { useState, useEffect } from 'react'
import Person from './components/Person'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import personService from './services/persons'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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
    .then(msg => {
      setPersons(persons.filter(n => n.id !== id))
      setSuccessMessage(
        `henkilö '${name}' poistettu`
      )
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)

    }
    )
    .catch(error => {
        setErrorMessage(
          `henkilö '${name}' on jo valitettavasti poistettu palvelimelta`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
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
        setSuccessMessage(
          `henkilö '${returnedPerson.name}' lisätty`
        )
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
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
        setSuccessMessage(
          `henkilön '${returnedPerson.name}' numero päivitetty`
        )
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
      .catch(error => {
        setErrorMessage(
          `henkilö '${newName}' on jo valitettavasti poistettu palvelimelta`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
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
      <Notification message={successMessage} classN={"success"} />
      <Notification message={errorMessage} classN={"error"}/>

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