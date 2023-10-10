import PropTypes from 'prop-types'
import React  from 'react';

const Button = ({ color, text, onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{ backgroundColor: color }}
      className='btn'>
      {text}
    </button>
  )
}

Button.defaultProps = {
  backgroundColor: '#01a783',
  color: 'white',
  padding: '1rem 2rem',
  border: 'none',
  fontweight: 'bold',
  cursor: 'pointer',
  borderradius: '0.4rem',
  fontsize: '1rem',
  texttransform: 'uppercase',
  hover :{
    backgroundColor: '#01a783'
  }
}

Button.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
}

export default Button