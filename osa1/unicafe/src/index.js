import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = ({good, neutral, bad}) => {
    if(good===0 && neutral ===0 && bad ===0) {
        return (
            <div>Ei yhtään palautetta annettu</div>
        )
    }
    return (
        <table>
            <thead></thead>
            <tbody>
                <Statistic text={'hyvä'} value={good} />
                <Statistic text={'neutraali'} value={neutral} />
                <Statistic text={'huono'} value={bad} />
                <Statistic text={'yhteensä'} value={good + neutral + bad} />
                <Statistic text={'keskiarvo'} value={(good * 1 + bad * -1) / (good + bad + neutral)} />
                <Statistic text={'posiitivisia'} value={(good / (good + bad + neutral))*100} extra={'%'}/>
            </tbody>
        </table>
    )
}

const Statistic = ({text, value, extra}) => (
    <tr><td>{text} {value} {extra}</td></tr>
)

const Button = ({handleClick, text}) => (
    <button onClick={handleClick}>
    {text}
    </button>
)


const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good +1)
  const handleNeutral = () => setNeutral(neutral +1)
  const handleBad = () => setBad(bad + 1)

  return (
    <div>
        <h2>Anna palautetta</h2>
        <Button handleClick={handleGood} text={'Hyvä'} />
        <Button handleClick={handleNeutral} text={'Neutraali'} />
        <Button handleClick={handleBad} text = {'Huono'} />
        <h2>Statistiikka</h2>
        <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)