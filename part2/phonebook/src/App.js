import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' }
  ])
  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    if (persons.map((person) => person.name).includes(newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const newPerson = { name: newName, number: newNumber }
      setPersons(persons.concat(newPerson))
    }
    setNewName('')
    setNewNumber('')
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div className="formInput">
          <label htmlFor="name">name:</label>
          <input id="name" value={newName} onChange={handleNameChange} />
        </div>
        <div className="formInput">
          <label htmlFor="">number:</label>
          <input id="number" value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div className='list'>
        {persons.map((person) => {
          return (
            <p key={person.name}>
              <span>{person.name}</span>
              <span>{person.number}</span>
            </p>
          )
        })}
      </div>
    </div >
  );
}

export default App;
