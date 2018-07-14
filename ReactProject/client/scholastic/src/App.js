import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import './App.css';
import './styles/site.css';
import userService from './services/userService';

import Header from './components/common/Header';
import Home from './components/home/Home';
import Notification from './components/common/Notification';
import Search from './components/common/Search';

import AuthorProfile from './components/user/AuthorProfile';
import Logout from './components/user/Logout';
//import { withAdminAuthorization } from './hocs/withAuthorization';
import Catalog from './components/course/retrive/Catalog';
import CourseDetails from './components/course/retrive/CourseDetails';
import CourseCreatePage from './components/course/create/CourseCreatePage';
import CourseEditPage from './components/course/edit/CourseEditPage';
import CourseDelete from './components/course/delete/CourseDelete';

import DeleteComment from './components/comment/DeleteComment';

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
					<Route path='/profile' render={props => <AuthorProfile {...props}/>}/>
					<Route path='/myCourses' render={props=> <Catalog author='true'/>}/>
					<Route path='/course/create' component={CourseCreatePage}/>
					<Route path='/course/details/:id' component={CourseDetails} />
					<Route path='/course/edit/:id' component={CourseEditPage} />	
					<Route path='/course/delete/:id' render={props => <CourseDelete {...props}/>} />
					<Route path='/comment/delete/:id' render={props => <DeleteComment {...props}/>}/>
					<Route path='/logout' component={Logout} />
				</main>
			</div>
		);
	}
}

export default App;
