import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')

  const [filtered, setFiltered] = useState(persons)

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    const filter = event.target.value.toLowerCase()
    const filtered = persons.filter((person) => person.name.toLowerCase().includes(filter))

    setFiltered(filtered)
  }

  console.log(filtered);

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

  const personList = filtered.map((person, i) => {
    return (
      <p className="flexItem" key={i}>
        <span>{person.name}</span>
        <span>{person.number}</span>
      </p>
    )
  })

  return (
    <div className="wrapper">
      <h1>Phonebook</h1>

      <div className="search flexItem">
        <label htmlFor="search">Search for a name:</label>
        <input id="search" onChange={handleSearchChange} />
      </div>

      <h2>Add a new</h2>

      <form onSubmit={addName}>
        <div className="formInput flexItem">
          <label htmlFor="name">name:</label>
          <input id="name" value={newName} onChange={handleNameChange} />
        </div>
        <div className="formInput flexItem">
          <label htmlFor="">number:</label>
          <input id="number" value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>

      <div className='list'>
        {personList.length ? personList : "There's no match for the query search"}
      </div>
    </div>
  );
}

export default App;
