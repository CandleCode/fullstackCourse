import React, { useState } from 'react'

const Button = ({handleClick, text}) => (
    <button onClick={handleClick}>
        {text}
    </button>
)
const StatisticLine = ({text, value}) =>(
    <tr>
        <td>{text}</td>
        <td>{value}</td>
    </tr>
)
const getAverageScore = (good, neutral, bad) => {
    let sum = good + neutral + bad
    return (
        ((good - bad)/sum).toFixed(2)
    )
}

const getPositivePercent = (good, neutral, bad) => {
    let sum = good + neutral + bad
    return (
        ((good/sum)*100).toFixed(2)
    )
}

const Statistics = ({good, bad, neutral}) => {
    if (good !== 0 || bad !== 0 || neutral !== 0) {
        return (
            <table>
                <tbody>
                    <StatisticLine text="good" value={good}/>
                    <StatisticLine text="neutral" value={neutral}/>
                    <StatisticLine text="bad" value={bad}/>
                    <StatisticLine text="average" value={getAverageScore(good, neutral, bad)}/>
                    <StatisticLine text="positive" value={getPositivePercent(good, neutral, bad)+"%"}/>
                </tbody>
            </table>
        )
    }
        return (
            <p>No feedback given</p>
        )
}
const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
      <div>
          <h1>Feedback</h1>
          <Button handleClick={() => setGood(good + 1)} text="Good" />
          <Button handleClick={() => setNeutral(neutral + 1)} text="Neutral" />
          <Button handleClick={() => setBad(bad + 1)} text="Bad" />
          <h1>Statistics</h1>
          <Statistics good={good} bad={bad} neutral={neutral} />
      </div>
  )
}

export default App