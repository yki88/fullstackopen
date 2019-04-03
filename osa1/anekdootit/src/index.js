import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const MaxVotes = ({points}) => {
  let i = points.indexOf(Math.max(...points));
  return (
    <>
      <h3>Anecdote with most votes</h3>
      {anecdotes[i]}
      <p>has {Math.max(...points)} votes</p>
    </>
  )
}

const Anecdote = ({anecdote}) => {
  return (
    <div>
      <h3>Anecdote of the day</h3>
      {anecdote}
    </div>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState([0,0,0,0,0,0])

  const selectAnecdote = () => {
    setSelected(Math.floor(Math.random() * 6))
  }

  const vote = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }

  
  return (
    <>
    <Anecdote anecdote={props.anecdotes[selected]}/>
    <div>
      <button onClick={vote}>vote</button>
      <button onClick= {selectAnecdote}>next anecdote</button>
    </div>
    <MaxVotes points={points} />
    </>
  )
}


const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)