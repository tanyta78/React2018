import React, { Component } from 'react';
import {Route} from 'react-router-dom';

import './style/header.css';
import './style/site.css';
import './style/menu.css';


import Header from './components/common/Header';
import Footer from './components/common/Footer';
import HomePage from './components/common/HomePage';
import Notify from './components/common/Notify';
import PostCatalog from './components/Post/PostCatalog';
import Logout from './components/auth/Logout';
import CreatePostPage from './components/Post/CreatePostPage';
import PostDetailPage from './components/Post/PostDetailPage';
import DeleteComment from './components/Comment/DeleteComment';


class App extends Component {
	
	
	render() {
		return (
			<div className="App" id='app'>
				<Header />
				<main className="content">
					<Notify/>
					{/* <Route exact path="/abc" render={props => <TestWidget someProp="2" {...props} />} /> */}
					<Route path='/' exact component={HomePage}/>
					<Route path='/catalog' component={PostCatalog}/>
					<Route path='/post/create' component={CreatePostPage}/>
					<Route path='/myPosts' render={props=> <PostCatalog author='true'/>}/>
					<Route path='/post/details/:id' component={PostDetailPage}/>
					<Route path='/comment/delete/:id' component={DeleteComment}/>
					<Route path='/logout' component={Logout}/>
				</main>
				<Footer/>
			</div>
		);
	}
}

export default App;
