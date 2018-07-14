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
import Catalog from './components/course/retrive/Catalog';
import CourseDetails from './components/course/retrive/CourseDetails';
import CourseCreatePage from './components/course/create/CourseCreatePage';
import CourseEditPage from './components/course/edit/CourseEditPage';
import CourseDelete from './components/course/delete/CourseDelete';

import DeleteComment from './components/comment/DeleteComment';
import AdminPanel from './components/admin/AdminPanel';
import CategoryCreateForm from './components/admin/CategoryCreateForm';
import CityCreateForm from './components/admin/CityCreateForm';
import CityList from './components/admin/CityList';
import CityDelete from './components/admin/CityDelete';

import CategoryList from './components/admin/CategoryList';
import CategoryDelete from './components/admin/CategoryDelete';
import CourseApprove from './components/admin/CourseApprove';

import NoAccess from './components/common/NoAccess';
import PrivateRoute from './hocs/PrivateRoute';
import ProtectedRoute from './hocs/ProtectedRoute';


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
					<PrivateRoute path='/catalog' component={Catalog} />
					<PrivateRoute path='/profile' component = {AuthorProfile}/>
					<PrivateRoute path='/myCourses' component={Catalog} author='true'/>
					<PrivateRoute path='/course/create' component={CourseCreatePage}/>
					<PrivateRoute path='/course/details/:id' component={CourseDetails} />
					<PrivateRoute path='/course/edit/:id' component={CourseEditPage} />	
					<PrivateRoute path='/course/delete/:id' component ={CourseDelete} />
					<PrivateRoute path='/comment/delete/:id' component ={DeleteComment}/>
					<ProtectedRoute path='/admin' component={AdminPanel}/>
					<ProtectedRoute path='/course/approve' exact component={Catalog}/>
					<ProtectedRoute path='/course/approve/:id' component={CourseApprove}/>
					<ProtectedRoute path='/category/create' component={CategoryCreateForm }/>
					<ProtectedRoute path='/category/delete/:id' component={CategoryDelete}/>
					<ProtectedRoute path='/city/create' component={CityCreateForm}/>
					<ProtectedRoute path='/city/delete/:id' component={CityDelete}/>
					<ProtectedRoute path='/allCategories' component={CategoryList}/>
					<ProtectedRoute path='/allCities' component={CityList}/>
					<Route path='/noaccess' component={NoAccess}/>
					<Route path='/logout' component={Logout} />
				</main>
			</div>
		);
	}
}

export default App;
