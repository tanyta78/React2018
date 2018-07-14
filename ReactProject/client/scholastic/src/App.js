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
import AdminPanel from './components/admin/AdminPanel';
import CategoryCreateForm from './components/admin/CategoryCreateForm';
import CityCreateForm from './components/admin/CityCreateForm';
import CityList from './components/admin/CityList';
import CityDelete from './components/admin/CityDelete';

import CategoryList from './components/admin/CategoryList';
import CategoryDelete from './components/admin/CategoryDelete';
import CourseApprove from './components/admin/CourseApprove';


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
					<Route path='/catalog' component={Catalog} />
					<Route path='/profile' render={props => <AuthorProfile {...props}/>}/>
					<Route path='/myCourses' render={props=> <Catalog author='true'/>}/>
					<Route path='/course/create' component={CourseCreatePage}/>
					<Route path='/course/details/:id' component={CourseDetails} />
					<Route path='/course/edit/:id' component={CourseEditPage} />	
					<Route path='/course/delete/:id' render={props => <CourseDelete {...props}/>} />
					<Route path='/comment/delete/:id' render={props => <DeleteComment {...props}/>}/>
					<Route path='/admin' component={AdminPanel}/>
					<Route path='/course/approve' exact render={props=> <Catalog {...props}/>}/>
					<Route path='/course/approve/:id' render={props =><CourseApprove {...props}/>}/>
					<Route path='/category/create' render={props =><CategoryCreateForm {...this.props}/>}/>
					<Route path='/category/delete/:id' render={props =><CategoryDelete {...props}/>}/>
					<Route path='/city/create' render={props =><CityCreateForm {...this.props}/>}/>
					<Route path='/city/delete/:id' render={props =><CityDelete {...props}/>}/>
					<Route path='/allCategories' component={CategoryList}/>
					<Route path='/allCities' component={CityList}/>
					<Route path='/logout' component={Logout} />
				</main>
			</div>
		);
	}
}

export default App;
