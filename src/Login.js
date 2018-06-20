import React, { Component } from 'react';

export default class Login extends Component {

  render(){
    return (
      <div className='login'>
        <div className='login-header'> Please Log in </div>
          <a className='btn google mt-2' href='/google'> <img src='/public/google-btn.svg'/> Sign in with Google </a>
          <br />
          <a className='btn github mt-2' href='/github'> <img src='/public/github-logo.png'/> Sign in with Github </a>
      </div>
    )
  }
}