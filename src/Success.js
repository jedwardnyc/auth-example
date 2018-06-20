import React from 'react';


const Success = (props) => {

  const onClick = () => {
    window.history.push('/');
  }

  return (
    <div className='container text-center'>
      <h1 className='mt-2'> Success! </h1>
      <h4> You are logged in as {props.user} </h4>
      <a href='/'><button onClick={onClick}> Go back to Login </button></a>
    </div>
  )
}

export default Success;