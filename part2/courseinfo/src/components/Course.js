import React from 'react'

const Header = ({ courseName }) => <h2>{courseName}</h2>;

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
    <div className="course">
      <Header courseName={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course