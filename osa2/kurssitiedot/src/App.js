import React from 'react'
import Course from './components/Course'

const App = ({ courses }) => {
  return (
    <div>
      <h1>Opetusohjelma</h1>
      {courses.map((course, i) => <Course course={course} key={i} />)}
    </div>
  )
}

export default App