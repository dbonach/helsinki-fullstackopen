import React from 'react'

const Person = (props) => {
  return (
    <li className="flexItem">
      <span>{props.person.name}</span>
      <span className="numberRemove">
        {props.person.number}
        <button onClick={() => props.remove(props.person)}>remove</button>
      </span>

    </li>
  )
}

export default Person