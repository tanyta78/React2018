import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';
import './styles/site.css';

import Header from './components/common/Header';
import Home from './components/home/Home';
import Notification from './components/common/Notification';
import Logout from './components/user/Logout';
import { withAdminAuthorization } from './hocs/withAuthorization';

class App extends Component {
  render() {
    return (
      <div className="App">
        <main className="content">
          <Header />
          <Notification />
          <Route path='/' exact component={Home} />
          {/* <Route path='/catalog' exact component={withAdminAuthorization(CatalogContainer)} /> */}
          <Route path='/logout' component={Logout} />
          {/* <Route path='/catalog/details/:id' component={PostDetailsContainer} /> */}
        </main>
      </div>
    );
  }
}

export default App;
