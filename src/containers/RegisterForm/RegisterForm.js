import React, { Component } from 'react';

import classes from './RegisterForm.css';
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import Checkbox from '../../components/UI/Checkbox/Checkbox';
import BackgroundPicture from '../../assets/images/unnamed.png';
import Aux from '../../hoc/Aux/Aux';
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
                        errorMessage: 'Username must contain atleast 3 characters.'
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
                    placeholder: 'Email'
                },
                value: '',
                validation: {
                    required: {
                        value: true,
                        errorMessage: 'Email is required!'
                    },
                    regex: {
                        value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        errorMessage: 'Please insert valid email!'
                    },
                    exists: {
                        value: false,
                        errorMessage: 'This email is already used.'
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
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: {
                        value: true,
                        errorMessage: 'Password is required!'
                    },
                    regex: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                        errorMessage: 'Password must be minimum 6 characters and contain atleast 1 digit, 1 lower case letter, 1 upper case letter and 1 special symbol'
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
                    placeholder: 'Confirm password'
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
            sex: {
                label: 'SEX',
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value:'male', displayValue:'Male'},
                        {value:'female', displayValue:'Female'}
                    ]
                },
                value: 'male',
                validation: {},
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

    inputChangeHandler = (event, inputId) => {
        const updatedRegisterForm = {...this.state.registerForm};
        const updatedFormElement = {...updatedRegisterForm[inputId]};
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
        // if(rules.exists && rules.exists.value && !validationErrorMessage) {
        //     validationErrorMessage = rules.exists.errorMessage;
        //     this.setExistingEmailState(true);
        // }

        return validationErrorMessage;
    }

    registerHandler = (event) => {
        event.preventDefault();
        if(!this.checkAcceptedTerms()) {
            return;
        }

        //this.checkExistingEmail();

        let formData = {};
        for(let formElementId in this.state.registerForm) {
            if(!this.state.registerForm[formElementId].transient) {
                formData[formElementId] = this.state.registerForm[formElementId].value;
            }
        }
        axios.post('/accounts.json', formData)
            .then(response => {
                alert('Your account has been created successfully.');
            })
            .catch(error => {
                alert('Something went wrong! You account was not created.');
            });
    }

    checkExistingEmail = () => {
        axios.get('https://react-forms-4a6f0.firebaseio.com/accounts.json')
            .then(response => {
                const data = response.data;
                let emailExists = false;
                for(let id in data) {
                    //console.log(data[id]);
                    if(data[id].email === this.state.registerForm.email.value) {
                        emailExists = true;
                    }
                }
                
                if(emailExists){
                    this.setExistingEmailState(false);
                }
            })
    }

    setExistingEmailState = (value) => {
        let updatedRegisterForm = {...this.state.registerForm};
        let updatedEmail = {...updatedRegisterForm.email};
        let updatedValidation = {...updatedEmail.validation};
        let updatedExistsValidation = {...updatedValidation.exists};
        updatedExistsValidation.value = value;
        updatedValidation.exists = updatedExistsValidation;
        updatedEmail.validation = updatedValidation;
        updatedRegisterForm.email = updatedEmail;
        this.setState({registerForm: updatedRegisterForm});
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
                        }} />
                ))}
                <Checkbox 
                    label={this.state.terms.label} 
                    checked={this.state.terms.checked}
                    changed={this.checkboxChangeHandler} 
                    errorMessage={this.state.terms.errorMessage} 
                    />
                <Button>Register now!</Button>
            </form>
        );

        return (
            //ToDo: Make it Layout with Pathing to a second form
            <div className={classes.Container}>
                <div className={classes.ImageContainer}>   
                    <img src={BackgroundPicture} alt="registration picture" className={classes.Image}/>
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
