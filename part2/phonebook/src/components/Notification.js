import React from 'react'

const Notification = ({ errorMessage }) => {
  if (errorMessage.message === null) {
    return <div className="error"></div>;
  }

  return (
    <div className={`error ${errorMessage.success ? "success" : "failure"}`}>
      {errorMessage.message}
    </div>
  )

}

export default Notification