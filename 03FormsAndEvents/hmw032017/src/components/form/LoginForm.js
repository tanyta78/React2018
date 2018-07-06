import React, { Component } from 'react'

import Input from './formFields/Input'
import validationFunc from './../../utils/formValidator'

class LoginForm extends Component {
  constructor() {
    super()

    this.state = {
      email: '',
      password: ''
    }
  }

  submitLogin(e) {
    e.preventDefault();
    let payload = {
      email: this.state.email,
      password: this.state.password
    }
    this.login(payload)
  }

  login(payload) {
    fetch('http://localhost:5000/auth/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then(res => {
        return res.json()
      })
      .then(d => {
        this.props.authFunc(d)
      })
  }

  render() {
    //  let validPassword = this.state.password !=='';
    //  let validEmail = this.state.email !=='';
    let validObj = validationFunc(
      this.state.email,
      this.state.email,
      'name',
      this.state.password,
      this.state.password
    )

    return (
      <form onSubmit={this.submitLogin.bind(this)}>
        <fieldset className='App'>
          <div style={{ display: 'inline-grid' }}>
            <h2>Login form</h2>
            <Input
              type='text'
              data='emailLogin'
              name='Email'
              func={e => {
                this.setState({ email: e.target.value })
              }}
              valid={validObj.validMail}
            />

            <Input
              type='password'
              data='passwordLogin'
              name='Password'
              func={e => {
                this.setState({ password: e.target.value })
              }}
              valid={validObj.validPassword}
            />

            <input
              style={({ "display": (validObj.validPassword && validObj.validMail) === true ? '' : 'none' })}
              type='submit'
              value='Login'
            />
          </div>
        </fieldset>
      </form>
    )
  }
}

export default LoginForm
