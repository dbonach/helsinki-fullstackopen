import React from 'react'

const Header = ({ courseName }) => <h1>{courseName}</h1>;

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>;

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => <Part key={part.id} part={part} />)}
    </div>
  )
}

const Total = ({ parts }) => {
  const exercises = parts.map(part => part.exercises)
  const total = exercises.reduce((a, b) => a + b)
  return (
    <p style={{ fontWeight: 'bold' }}>
      Number of exercises {total}
    </p>
  );
}

const Course = ({ course }) => {
  return (
    <div>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return <Course course={course} />
}

export default App;
