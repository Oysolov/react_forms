import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import classes from './RegisterForm.css';
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import Checkbox from '../../components/UI/Checkbox/Checkbox';
import BackgroundPicture from '../../assets/images/register_background.png';
import axios from '../../axios';

class RegisterForm extends Component {
    state = {
        registerForm: {
            username: {
                label: 'USERNAME',
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Username'
                },
                value: '',
                validation: {
                    required: {
                        value: true,
                        errorMessage: 'Username is required!'
                    },
                    minLength: {
                        value: 3,
                        errorMessage: 'Username must contain at least 3 characters.'
                    },
                    exists: {
                        value: false,
                        errorMessage: 'This username is already taken!'
                    }
                },
                validationErrorMessage: '',
                touched: false,
                transient: false
            },
            email: {
                label: 'EMAIL',
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'email@address.com'
                },
                value: '',
                validation: {
                    required: {
                        value: true,
                        errorMessage: 'Email is required!'
                    },
                    regex: {
                        value: /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        errorMessage: 'Please insert valid email!'
                    },
                    exists: {
                        value: false,
                        errorMessage: 'This email is already taken!'
                    }
                },
                validationErrorMessage: '',
                touched: false,
                transient: false
            },
            password: {
                label: 'PASSWORD',
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: '******'
                },
                value: '',
                validation: {
                    required: {
                        value: true,
                        errorMessage: 'Password is required!'
                    },
                    regex: {    
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                        errorMessage: 'Password must contain 6 characters - at least 1 digit, 1 lower, 1 upper case letter and a special symbol'
                    }
                },
                validationErrorMessage: '',
                touched: false,
                transient: false
            },
            passwordConfirmation: {
                label: 'CONFIRM PASSWORD',
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: '******'
                },
                value: '',
                validation: {
                    required: {
                        value: true,
                        errorMessage: 'Password confirmation is required!'
                    },
                    matches: {
                        value: true,
                        errorMessage: 'The Confirm password and Password fileds must match!'
                    }
                },
                validationErrorMessage: '',
                touched: false,
                transient: true
            },
            devSkills: {
                label: 'DEV SKILLS',
                elementType: 'input',
                elementConfig: {
                    type: 'number',
                    placeholder: 'Dev Skills (5-10)'
                },
                value: '5',
                validation: {
                    required: {
                        value: true,
                        errorMessage: 'Dev skills field is required!'
                    },
                    minValue: {
                        value: 5,
                        errorMessage: 'The Dev Skills field value must be between 5 and 10.'
                    },
                    maxValue: {
                        value: 10,
                        errorMessage: 'The Dev Skills field value must be between 5 and 10.'
                    }
                },
                validationErrorMessage: '',
                touched: false,
                transient: false
            },
            gender: {
                label: 'Gender',
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value:'male', displayValue:'Male'},
                        {value:'female', displayValue:'Female'}
                    ]
                },
                value: 'male',
                validation: {
                },
                validationErrorMessage: '',
                transient: false
            }
        },   
        terms: {
            label: 'Accept Terms',
            checked: false,
            validation: {
                accepted: {
                    value: true,
                    errorMessage: 'The Accept Terms must be accepted.'
                }
            },
            errorMessage: '',
        }   
    }

    componentDidMount() {
        if(window.sessionStorage.getItem("Authorization")) {
            this.props.history.push('/profile');
        }
    }

    inputChangeHandler = (event, inputId) => {
        const updatedRegisterForm = {...this.state.registerForm};
        const updatedFormElement = {...updatedRegisterForm[inputId]};

        if(updatedFormElement.validationErrorMessage) {
            const updatedFormElementValidation = {...updatedFormElement.validation};
            const updatedFormElementExistsValidation = {...updatedFormElementValidation.exists};
            updatedFormElementExistsValidation.value = false;
            updatedFormElementValidation.exists = updatedFormElementExistsValidation;
            updatedFormElement.validation = updatedFormElementValidation;
        }

        updatedFormElement.value = event.target.value;
        updatedFormElement.validationErrorMessage = this.validate(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedRegisterForm[inputId] = updatedFormElement;
        this.setState({
            registerForm: updatedRegisterForm
        });
    }

    checkboxChangeHandler = (event) => {
        const updatedTerms = {...this.state.terms};
        updatedTerms.checked = event.target.checked;
        this.setState({
            terms: updatedTerms
        });
    }

    validate = (value, rules) => {
        let validationErrorMessage = '';

        if(rules.required && value.trim() === '' && !validationErrorMessage) {
            validationErrorMessage = rules.required.errorMessage
        }
        if(rules.minValue && value < rules.minValue.value && !validationErrorMessage) {
            validationErrorMessage = rules.minValue.errorMessage;
        }
        if(rules.maxValue && value > rules.maxValue.value && !validationErrorMessage) {
            validationErrorMessage = rules.maxValue.errorMessage;
        }
        if(rules.minLength && value.length < rules.minLength.value && !validationErrorMessage) {
            validationErrorMessage = rules.minLength.errorMessage;
        }
        if(rules.regex && !rules.regex.value.test(value) && !validationErrorMessage) {
            validationErrorMessage = rules.regex.errorMessage;
        }
        if(rules.matches && value !== this.state.registerForm.password.value && !validationErrorMessage) {
            validationErrorMessage = rules.matches.errorMessage;
        }
        if(rules.exists && rules.exists.value && !validationErrorMessage) {
            validationErrorMessage = rules.exists.errorMessage;
        }

        return validationErrorMessage;
    }

    registerHandler = (event) => {
        event.preventDefault();
        if(!this.checkAcceptedTerms() || !this.validateForm()) {
            return;
        }

        let formData = {};
        for(let formElementId in this.state.registerForm) {
            if(!this.state.registerForm[formElementId].transient) {
                formData[formElementId] = this.state.registerForm[formElementId].value;
            }
        }

        axios.post('/register', formData)
            .then(response => {
                this.props.history.replace('/login');
            })
            .catch(error => {
                const errorMessage = error.response.data;
                this.handleErrorResponse(errorMessage);
            });
    }

    handleErrorResponse = (errorMessage) => {
        if (errorMessage.includes('Username')){
            this.handleInvalidFieldValue('username', 'exists');
        } else if (errorMessage.includes('Email')) {
            this.handleInvalidFieldValue('email', 'exists');
        }
        this.validateForm();
    }

    handleInvalidFieldValue = (field, errorType) => {
        const updatedRegisterForm = {...this.state.registerForm};
        const updatedField = {...updatedRegisterForm[field]};   
        const updatedValidation = {...updatedField.validation};
        const updatedValidationType = {...updatedValidation[errorType]};
        updatedValidationType.value = true;
        updatedValidation[errorType] = updatedValidationType;
        updatedField.validation = updatedValidation;
        updatedRegisterForm[field] = updatedField;
        this.setState({registerForm: updatedRegisterForm});
    }

    validateForm = () => {
        let formIsValid = true;

        const updatedRegisterForm = {...this.state.registerForm};
        for(let formElementId in updatedRegisterForm) {
            const updatedFormElement = {...updatedRegisterForm[formElementId]};
            const validationErrorMessage = this.validate(updatedFormElement.value, {...updatedFormElement.validation});
            if(validationErrorMessage) {
                formIsValid = false;
                updatedFormElement.validationErrorMessage = validationErrorMessage;
                updatedFormElement.touched = true;
                updatedRegisterForm[formElementId] = updatedFormElement;
            }
        }

        this.setState({
            registerForm: updatedRegisterForm
        });

        return formIsValid;
    }

    checkAcceptedTerms = () => {
        let termsAreAccepted = false;
        const updatedTerms = {...this.state.terms};
        let errorMessage = updatedTerms.validation.accepted.errorMessage;

        if(this.state.terms.checked) {
            termsAreAccepted = true;
            errorMessage = '';
        }

        updatedTerms.errorMessage = errorMessage;
        this.setState({
            terms: updatedTerms
        });

        return termsAreAccepted;
    }

    render() {
        const formElementsArray = [];
        for(let key in this.state.registerForm){
            formElementsArray.push({
                id: key,
                config: this.state.registerForm[key]
            })
        }
        const form = (
            <form onSubmit={this.registerHandler}>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        label={formElement.config.label}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        errorMessage={formElement.config.validationErrorMessage}
                        touched={formElement.config.touched}
                        changed={(event) => {
                            this.inputChangeHandler(event, formElement.id);
                        }}
                        className={classes.Input} 
                    />
                ))}
                <Checkbox 
                    label={this.state.terms.label} 
                    checked={this.state.terms.checked}
                    changed={this.checkboxChangeHandler} 
                    errorMessage={this.state.terms.errorMessage} 
                    />
                <Button className={classes.Button}>Register now!</Button>
                <div className={classes.LoginRedirect}>
                    <label>You already have an account? </label>
                    <NavLink to="/login">Login</NavLink>
                </div>
            </form>
        );

        return (
            <div className={classes.Container}>
                <div className={classes.ImageContainer}>   
                    <img src={BackgroundPicture} alt="registration" className={classes.Image}/>
                </div>
                <div className={classes.RegisterForm}>
                    <h2>Register Form</h2>
                    {form}
                 </div>
            </div>
        );
    }
}

export default RegisterForm;
