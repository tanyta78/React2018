import React, {Component} from 'react';
import LoginForm from '../user/LoginForm';
import '../../styles/submit.css';
import RegisterForm from '../user/RegisterForm';
import About from './About';
import CourseList from '../course/CourseList';

export default class Home extends Component {
    render = () => {
        return (
            <section id="viewSignIn">
                <div className="welcome">
                    <div></div>
                    <div className="signup">
                        <LoginForm {...this.props} />
                        <RegisterForm {...this.props} />
                    </div>
                    <About />
                    <CourseList public="true"/>
                </div>
            </section>
        )
    }
}