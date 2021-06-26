import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = (props) => {
  return (
    <div className="searchFilter flexItem">
      <label htmlFor="search">Search for a name:</label>
      <input
        id="search"
        value={props.newFilter}
        onChange={props.handleSearchChange} />
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addName}>
      <div className="formInput flexItem">
        <label htmlFor="name">name:</label>
        <input
          id="name"
          value={props.newName}
          onChange={props.handleNameChange} />
      </div>
      <div className="formInput flexItem">
        <label htmlFor="">number:</label>
        <input
          id="number"
          value={props.newNumber}
          onChange={props.handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
}

const Person = (props) => {
  return (
    <p className="flexItem">
      <span>{props.person.name}</span>
      <span>{props.person.number}</span>
    </p>
  )
}

const Persons = (props) => {
  const filteredList = props.persons.filter(
    (person) =>
      person.name.toLowerCase()
        .includes(props.newFilter.toLowerCase())
  );

  const personList = filteredList.map(
    (person) => <Person key={person.name} person={person} />)

  return (
    <div className='list'>
      {filteredList.length ? personList
        : "There's no match for the query search"}
    </div>
  );
}


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

  const addName = (event) => {
    event.preventDefault()

    if (!newName || !newNumber) {
      alert("You need to provide name and number!")
      return
    }

    if (
      persons.map((person) => person.name.toLowerCase())
        .includes(newName.toLowerCase())
    ) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const newPerson = { name: newName, number: newNumber }
      setPersons(persons.concat(newPerson))
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
