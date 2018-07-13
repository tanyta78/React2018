import React, {Component} from 'react';
import LoginForm from '../user/LoginForm';
import '../../styles/submit.css';
import RegisterForm from '../user/RegisterForm';
import About from './About';
import CourseListPublic from '../course/CourseListPublic';

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
                    <CourseListPublic {...this.props}/>
                </div>
            </section>
        )
    }
}