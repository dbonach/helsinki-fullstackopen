import React from 'react'

const Person = (props) => {
  return (
    <p className="flexItem">
      <span>{props.person.name}</span>
      <span>{props.person.number}</span>
    </p>
  )
}

export default Person