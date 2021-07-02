import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import bookService from './services/contacts'

const Notification = ({ message }) => {
  if (message == null) {
    return <div className="errorBox"></div>;
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

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

  const removeFromServer = (contact) => {
    if (window.confirm(`Delete ${contact.name}?`)) {
      bookService
        .remove(contact.id)
        .then((response) => {
          const updatedContacts = persons.filter(p => p.id !== contact.id)
          setPersons(updatedContacts)
        })
        .catch(error => console.log("Unable to remove from the server"))
    }
  }

  const updateToServer = (person) => {
    const response = window.confirm(`${newName} is already added to phonebook, ` +
      "replace the old number with a new one?")

    if (response) {
      const newContact = { ...person, number: newNumber }
      bookService
        .update(newContact)
        .then((responseContact) => {
          const personsList = persons.map(p => p.id !== person.id ? p : newContact)
          setPersons(personsList)
          setNewName('')
          setNewNumber('')
        })
        .catch(error => console.log("Unable to update contact"))
    }

  }

  const addToServer = () => {
    const newContact = { name: newName, number: newNumber }

    bookService
      .create(newContact)
      .then(createdContact => {
        setPersons(persons.concat(createdContact))
        setErrorMessage(`${newName} contact created`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
        setNewName('')
        setNewNumber('')
      })
      .catch(error => console.log("Unable to save on the server"))
  }

  const nameAlreadyExist = () => {
    return persons.map((person) => person.name.toLowerCase())
      .includes(newName.toLowerCase())
  }

  const isInputValid = () => {
    if (!newName || !newNumber) {
      alert("You need to provide name and number!")
    } else if (nameAlreadyExist()) {
      const person = persons.find((person) => {
        return person.name.toLowerCase() === newName.toLowerCase()
      })
      updateToServer(person);
    } else {
      return true
    }
    return false
  }

  const addName = (event) => {
    event.preventDefault()

    if (isInputValid(newName, newNumber)) {
      addToServer();
    }
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

      <Notification message={errorMessage} />

      <h2>Numbers</h2>

      <Persons
        persons={persons}
        newFilter={newFilter}
        remove={removeFromServer}
      />

    </div>
  );
}

export default App;
