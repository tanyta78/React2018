import React, { Component } from 'react';
import './App.css';
import UserInput from './userInput/UserInput';
import UserOutput from './userOutput/UserOutput';

class App extends Component {
  state={
    username:'Petar'
  }

onChangeUsername = (event)=>{
   this.setState({username:event.target.value});
}

  render() {
    return (
      <div className="App">
      <UserInput onInputChange = {this.onChangeUsername} value={this.state.username}/>
      <UserOutput username={this.state.username}/>
       
      </div>
    );
  }
}

export default App;
