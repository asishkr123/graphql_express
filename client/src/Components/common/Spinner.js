import spinner from './spinner.gif';
import React from 'react'

export default function Spinner() {
  return (
    <div>
      <img src= {spinner} alt="loading" style = {{margin : 'auto' , display : 'block'}}/>
    </div>
  )
}
