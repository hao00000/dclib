import React from 'react'
import SampleTableRenderer from './SampleTableRenderer'

const data = [{
  name: 'Tanner Linsley',
  age: 26,
  friend: {
    name: 'Jason Maurer',
    age: 23
  }
}, {
  name: 'Johnny Deep',
  age: 35,
  friend: {
    name: 'Channing Tatum',
    age: 23
  }
}]

const columns = [{
  Header: 'Name',
  accessor: 'name' // String-based value accessors!
}, {
  Header: 'Age',
  accessor: 'age'
}, {
  id: 'friendName', // Required because our accessor is not a string
  Header: 'Friend Name',
  accessor: d => d.friend.name // Custom value accessors!
}, {
  Header: props => <span>Friend Age</span>, // Custom header components!
  accessor: 'friend.age'
}]

const SampleTable = () => {
  const tableProps = { data, columns }
  return (
    <SampleTableRenderer tableProps={tableProps} />
  )
}

export { SampleTable }
