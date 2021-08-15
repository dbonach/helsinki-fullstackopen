import React from 'react'


const wrapperStyle = {
  position: 'absolute',
  width: '100%',
}

const messageBoxStyle = {
  textAlign: 'center',
  margin: '.25rem',
  padding: '1rem',
  opacity: '.8',
}

const errorColor = {
  color: '#D8000C',
  backgroundColor: '#FFD2D2',
}

const successColor = {
  color: '#4F8A10',
  backgroundColor: '#DFF2BF',
}


const ErrorMessage = ({ errorMessage, setErrorMessage }) => {

  const finalStyle = errorMessage.error === true ?
    { ...messageBoxStyle, ...errorColor } :
    { ...messageBoxStyle, ...successColor }

  const removeMessage = (e) => {
    setErrorMessage({ msg: null, error: null })
  }

  return (
    <div onClick={removeMessage} style={wrapperStyle}>
      <div style={finalStyle}>
        {errorMessage.msg}
      </div>
    </div>
  )
}

export default ErrorMessage