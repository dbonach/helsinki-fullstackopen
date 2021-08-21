import React, { useState, useImperativeHandle } from 'react'


const buttonStyle = {
  marginTop: '1rem'
}


const Toggleable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>

      <div style={hideWhenVisible}>
        <button
          style={buttonStyle}
          onClick={toggleVisibility}>
          {props.buttonLabel}</button>
      </div>

      <div style={showWhenVisible}>
        {props.children}
        <button
          style={buttonStyle}
          onClick={toggleVisibility}>
          cancel</button>
      </div>

    </div>
  )
})

export default Toggleable