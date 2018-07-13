import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import './App.css';
import './styles/site.css';

import Header from './components/common/Header';
import Home from './components/home/Home';
import Catalog from './components/course/Catalog';
import Notification from './components/common/Notification';
import Logout from './components/user/Logout';
import { withAdminAuthorization } from './hocs/withAuthorization';
import CourseDetails from './components/course/CourseDetails';
import userService from './services/userService';
import Search from './components/common/Search';
import AuthorProfile from './components/user/AuthorProfile';

class App extends Component {
	componentDidMount() {
		if (sessionStorage.userId) {
			return;
		} else {
			let data = { username: 'guest', password: '123456' };
			userService.login.send(data)
				.then(res => {
					sessionStorage.setItem('authtoken', res._kmd.authtoken);

				})
				.catch(console.log);
		}
	}

	render() {
		return (
			<div className="App">
				<main className="content">
					<Header />
					<Notification />
					<Search />
					<Route path='/' exact component={Home} />
					{/* <Route path='/catalog' exact component={withAdminAuthorization(Catalog)} /> */}
					<Route path='/catalog' exact component={Catalog} />
					<Route path='/logout' component={Logout} />
					<Route path='/catalog/details/:id' component={CourseDetails} />
					<Route path='/profile' render={props => <AuthorProfile {...props}/>}/>

				</main>
			</div>
		);
	}
}

export default App;
