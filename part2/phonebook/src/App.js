import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import bookService from './services/contacts'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
      .then(response => setPersons(response.data))
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setNewFilter(event.target.value)
  }

  const addToServer = (newContact) => {
    bookService
      .create(newContact)
      .then(createdContact => setPersons(persons.concat(createdContact)))
      .catch(error => console.log("Unable to save on the server"))
  }

  const isInputValid = () => {
    if (!newName || !newNumber) {
      alert("You need to provide name and number!")
    } else if (
      persons.map((person) => person.name.toLowerCase())
        .includes(newName.toLowerCase())
    ) {
      alert(`${newName} is already added to phonebook`)
    } else {
      return true
    }
    return false
  }

  const addName = (event) => {
    event.preventDefault()
    if (isInputValid(newName, newNumber)) {
      const newContact = { name: newName, number: newNumber }
      addToServer(newContact);
      setPersons(persons.concat(newContact))
    }

    setNewName('')
    setNewNumber('')
  }

  return (
    <div className="wrapper">

      <h1>Phonebook</h1>

      <Filter
        newFilter={newFilter}
        handleSearchChange={handleSearchChange}
      />

      <h2>Add a new</h2>

      <PersonForm
        addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>

      <Persons
        persons={persons}
        newFilter={newFilter}
      />

    </div>
  );
}

export default App;
