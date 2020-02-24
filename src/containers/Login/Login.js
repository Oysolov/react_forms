import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';

class Login extends Component {

    loginHandler = () => {
        console.log('login attempt')
    }

    render() {
        const loginForm = (
            <form onSubmit={this.loginHandler}>
                


                <label>Don't have an account?</label>
                <NavLink to="/register">Click here.</NavLink>
            </form>
        );

        return ({loginForm});
    }

}

export default Login;