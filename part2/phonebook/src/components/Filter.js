import React from 'react'

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

export default Filter