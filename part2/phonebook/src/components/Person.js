import React from 'react'

const Person = (props) => {
  return (
    <p className="flexItem">
      <span>{props.person.name}</span>
      <span className="numberRemove">
        {props.person.number}
        <button onClick={() => props.remove(props.person)}>remove</button>
      </span>

    </p>
  )
}

export default Person