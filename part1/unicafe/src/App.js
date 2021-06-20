import { useState } from 'react';

const Header = () => <h1>Give Feedback</h1>

const Button = ({ text, onClick }) => {
  return <button onClick={onClick}>{text}</button>;
}

const Statistics = (props) => {
  return (
    <div className="stats">
      <h3>Statistics</h3>
      <p>Good: {props.clicks.good}</p>
      <p>Neutral: {props.clicks.neutral}</p>
      <p>Bad: {props.clicks.bad}</p>
      <p>All: {props.clicks.total}</p>
      <p>Average: {(props.clicks.good - props.clicks.bad) / props.clicks.total}</p>
      <p>Positive: {100 * props.clicks.good / props.clicks.total} &#37;</p>
    </div>
  )
}

const App = () => {
  const [clicks, setClicks] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
    total: 0
  })

  const handleClick = (feedback) => {
    const handler = () => setClicks({
      ...clicks,
      [feedback]: clicks[feedback] + 1,
      total: clicks.total + 1
    });
    return handler
  }

  return (
    <div>
      <Header />
      <div className="buttons">
        <Button onClick={handleClick('good')} text="Good" />
        <Button onClick={handleClick('neutral')} text="Neutral" />
        <Button onClick={handleClick('bad')} text="Bad" />
      </div>
      <Statistics clicks={clicks} />
    </div>
  );
}

export default App;
