import React from 'react'

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

export default PersonForm