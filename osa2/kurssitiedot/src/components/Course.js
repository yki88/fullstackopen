import React from 'react'

const Header = ({name}) =>
  <h1>{name}</h1>

  
const Total = ({parts}) => {
  const total = parts.reduce((sum, x) => sum + x.exercises, 0)
  return <p>yhteensä {total} tehtävää</p>
}
  
const Part = ({part}) =>
  <p>{part.name} {part.exercises}</p>

const Content = ({parts}) => 
 <div>
    {parts.map((part, i) => <Part part={part} key={i} />)}
  </div>

const Course = ({course}) => {
  return (
  <>
  <Header name={course.name}/>
  <Content parts={course.parts} />
  <Total parts={course.parts} />
  </>
  )
}

export default Course