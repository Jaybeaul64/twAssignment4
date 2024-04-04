import React from 'react'

function home() {

  const handleTestButtonClick = () => {
    const token = localStorage.getItem('jwtToken');
    console.log(token);
  };


  return (
    <div>
    <div>home</div>
    <button type="button" onClick={handleTestButtonClick}>Test</button>
    </div>
  )
}

export default home