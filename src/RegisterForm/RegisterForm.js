import React, { Component } from 'react';
import './RegisterForm.css';
import UserInput from './UserInput/UserInput';
import ButtonsBar from './ButtonsBar/ButtonsBar';

class RegisterForm extends Component {
    state = {
        registerFormFields: [
          {id: 'username', fieldTitle: 'Username', value: 'SteveJobs', defaultValue: 'SteveJobs'},
          {id: 'email', fieldTitle: 'Email', value: 's.jobs@apple.com', defaultValue: 's.jobs@apple.com'},
          {id: 'confirmEmail', fieldTitle: 'Confirm Email', value: 's.jobs@apple.com', defaultValue: 's.jobs@apple.com'},
          {id: 'password', fieldTitle: 'Password', value: 'thinkdifferent', defaultValue: 'thinkdifferent', type: 'password'},
          {id: 'devSkills', fieldTitle: 'Dev Skills (5-10)', value: '5', defaultValue: '5'}
        ]
    }

    fieldChangeHandler = (event, id) => {
        const fieldIndex = this.state.registerFormFields.findIndex(f => {
            return f.id === id;
        });

        const changedField = {...this.state.registerFormFields[fieldIndex]};
        changedField.value = event.target.value;

        const newForm = [...this.state.registerFormFields];
        newForm[fieldIndex] = changedField;
        
        this.setState({registerFormFields: newForm});
    }

    clearForm = () => {
        const clearedForm = this.state.registerFormFields.map(field => {
            field.value = '';
            return field;
        });

        this.setState({registerFormFields: clearedForm});
    }

    resetForm = () => {
        const defaultForm = this.state.registerFormFields.map(field => {
            field.value = field.defaultValue;
            return field;
        });
        this.setState({registerFormFields: defaultForm});
    }

    submitForm = () => {
        console.log(this.state.registerFormFields);
    }

    render() {
        const inputFields = this.state.registerFormFields.map(field => {
            return <UserInput 
              key={field.id}
              type={field.type}
              fieldTitle={field.fieldTitle} 
              value={field.value}
              change={(event) => this.fieldChangeHandler(event, field.id)} />;
        });

        return (
            <div className="RegisterForm">
                <h2>Form Register</h2>
                {inputFields}
                <input type="checkbox" />
                <label>Accept Terms</label>
                <ButtonsBar 
                    clear={this.clearForm}
                    reset={this.resetForm}
                    submit={this.submitForm}/>
            </div>
        );
    }
}

export default RegisterForm;
