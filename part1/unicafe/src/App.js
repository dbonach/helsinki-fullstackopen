import { useState } from 'react';

const Header = () => <h1>Give Feedback</h1>;

const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>;

const Buttons = (props) => {
  return (
    <div className="buttons">
      <Button onClick={props.onClick[0]} text={props.texts[0]} />
      <Button onClick={props.onClick[1]} text={props.texts[1]} />
      <Button onClick={props.onClick[2]} text={props.texts[2]} />
    </div>
  )
}

const Statistic = (props) => <p>
  {props.feedback}: {props.number}
  {props.percent ? <>&#37;</> : ""}
</p>;

const Statistics = (props) => {
  if (props.clicks.total === 0) {
    return (
      <div className="stats">
        <h3>Statistics</h3>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <div className="stats">
      <h3>Statistics</h3>
      <Statistic feedback="Good" number={props.clicks.good} />
      <Statistic feedback="Neutral" number={props.clicks.neutral} />
      <Statistic feedback="Bad" number={props.clicks.bad} />
      <Statistic feedback="Total" number={props.clicks.total} />
      <Statistic feedback="Average" number={props.clicks.bad} />
      <Statistic feedback="Bad" number={props.clicks.bad} />
      <Statistic
        feedback="Average"
        number={(props.clicks.good - props.clicks.bad) / props.clicks.total} />
      <Statistic
        feedback="Positive"
        number={100 * props.clicks.good / props.clicks.total}
        percent={true} />
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
      <Buttons
        texts={["Good", "Neutral", "Bad"]}
        onClick={[handleClick('good'), handleClick('neutral'), handleClick('bad')]} />
      <Statistics clicks={clicks} />
    </div>
  );
}

export default App;
