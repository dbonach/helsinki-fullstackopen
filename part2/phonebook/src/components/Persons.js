import React from 'react'
import Person from './Person';

const Persons = (props) => {
  const filteredList = props.persons.filter((person) =>
    person.name.toLowerCase().includes(props.newFilter.toLowerCase())
  );

  const personList = filteredList.map(
    (person) => <Person key={person.name} person={person} remove={props.remove} />)

  return (
    <ul className='list'>
      {filteredList.length ? personList
        : "There's no match for the query search"}
    </ul>
  );
}

export default Persons