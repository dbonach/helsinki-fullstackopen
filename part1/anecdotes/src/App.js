import React, { useState } from 'react'

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients'
  ]

  const [selected, setSelected] = useState({
    anecdote: 0,
    points: [0, 0, 0, 0, 0, 0, 0]
  })

  const number = selected.anecdote;

  const updatePoints = () => {
    const points = [...selected.points]
    points[number] += 1

    setSelected({
      ...selected,
      points: points
    })
  }

  const updateAnecdote = () => {
    setSelected({
      ...selected,
      anecdote: Math.floor(Math.random() * anecdotes.length)
    })
  }

  const mostVoted = selected.points.reduce(function (a, b) { return a > b ? a : b; });
  const mostVotedIndex = selected.points.indexOf(mostVoted)

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div className="anecdote">
        {anecdotes[number]}
      </div>

      <div className="buttons">
        <Button text="Vote" onClick={updatePoints} />
        <Button text="Next Anecdote" onClick={updateAnecdote} />
      </div>

      <div className="votes">
        Has {selected.points[number]} votes
      </div>

      <div className="mostVoted">
        <h1>Anecdote with most votes</h1>
        <div className="anecdote">
          {anecdotes[mostVotedIndex]}
        </div>
        Has {mostVoted} points.
      </div>
    </div>
  )
}

export default App