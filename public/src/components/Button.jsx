import React from 'react'

const Button = ({label, handleClick}) => {

    const buttonStyle ={
        color:'red'
    }
  return (
    <button  className='btn' style={buttonStyle} onClick={handleClick}>
        {label}
    </button>
  )
}

export default Button
