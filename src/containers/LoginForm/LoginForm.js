import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import classes from './LoginForm.css';
import BackgroundPicture from '../../assets/images/login_background.png';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import axios from '../../axios';

class LoginForm extends Component {
    state = {
        usernameOrEmail: {
            value: '',
            errorMessage: '',
            touched: false
        },
        password: {
            value: '',
            errorMessage: '',
            touched: false
        },
        incorrectCredentials: false
    }

    componentDidMount() {
        if(window.sessionStorage.getItem("Authorization")) {
            this.props.history.push('/profile');
        }
    }

    inputChangeHandler = (event, field) => {
        const updatedField = {...this.state[field]};
        updatedField.value = event.target.value;    
        updatedField.errorMessage = this.validateEmpty(updatedField.value);
        updatedField.touched = true;
        this.setState({[field]: updatedField, incorrectCredentials: false});
    }
        
    validateForm = () => {
        let formIsValid = true;
        const updatedUsernameOrEmail = {...this.state.usernameOrEmail};
        updatedUsernameOrEmail.errorMessage = this.validateEmpty(updatedUsernameOrEmail.value);
        updatedUsernameOrEmail.touched = true;

        const updatedPassword = {...this.state.password};
        updatedPassword.errorMessage = this.validateEmpty(updatedPassword.value);
        updatedUsernameOrEmail.touched = true;

        if(updatedUsernameOrEmail.errorMessage || updatedPassword.error) {
            formIsValid = false;
        }

        this.setState({usernameOrEmail:updatedUsernameOrEmail, password: updatedPassword});
        return formIsValid;
    }

    validateEmpty = (value) => {
        return value.trim() === '' ? 'This field is required.' : '';
    }

    loginHandler = (event) => {
        event.preventDefault();
        if(!this.validateForm()) {
            return;
        }

        const formData = {
            usernameOrEmail: this.state.usernameOrEmail.value,
            password: this.state.password.value
        };
        
        axios.post('/login', formData)
            .then(response => {
                const token = response.data.accessToken;
                window.sessionStorage.setItem("Authorization", token);
                this.props.history.replace('/profile');
            })
            .catch(error => {
                const status = error.response.status;
                if(status === 401 || status === 400) {
                    this.setState({incorrectCredentials: true});
                }
            })
    }

    render() {
        let incorrectCredentials = null;
        if(this.state.incorrectCredentials) {
            incorrectCredentials = <label className={classes.Error}>Incorrect credentials!</label>;
        }

        const loginForm = (
            <form onSubmit={this.loginHandler}>
                {incorrectCredentials}
                <Input key='usernameOrEmail'
                    elementType='input'
                    elementConfig={{
                        type: 'text',
                        placeholder: 'Enter username or email'
                    }}
                    value={this.state.usernameOrEmail.value}
                    errorMessage={this.state.usernameOrEmail.errorMessage}
                    touched={this.state.usernameOrEmail.touched}
                    changed={(event) => {
                        this.inputChangeHandler(event, 'usernameOrEmail');
                    }}
                    className={classes.Input}
                />
                <Input key='password'
                    elementType='input'
                    elementConfig={{
                        type: 'password',
                        placeholder: '******'
                    }}
                    value={this.state.password.value}
                    errorMessage={this.state.password.errorMessage}
                    touched={this.state.password.errorMessage}
                    changed={(event) => {
                        this.inputChangeHandler(event, 'password');
                    }}
                    className={classes.Input}
                />
                <Button className={classes.Button}>Login</Button>
                <div className={classes.RegisterRedirect}>
                    <label>Don't have an account? </label>
                    <NavLink to="/register">Register here</NavLink>
                </div>
            </form>
        );

        return (
            <div className={classes.Container}>
                <div className={classes.ImageContainer}>
                    <img src={BackgroundPicture} alt="login" className={classes.Image}/>
                </div>
                <div className={classes.LoginForm}>
                    {loginForm} 
                </div>
            </div>
        );
    }

}

export default LoginForm;