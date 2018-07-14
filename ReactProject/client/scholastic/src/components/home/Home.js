import React, {Component} from 'react';

import '../../styles/submit.css';

import LoginForm from '../user/LoginForm';
import RegisterForm from '../user/RegisterForm';
import About from './About';
import CourseList from '../course/retrive/CourseList';



export default class Home extends Component {
    
    render = () => {
              return (
            <section id="viewSignIn">
                <div className="welcome">
                    <div></div>
                    <div className="signup">
                        <LoginForm {...this.props} />
                        <RegisterForm {... this.props}/>
                    </div>
                    <About />            
                    <CourseList limit="5" {...this.props}/>
                </div>
            </section>
        )
    }
}