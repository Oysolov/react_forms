import React from 'react';

import classes from './Input.css';

const input = (props) => {
    let inputElement = null;
    let validationError = null;
    if(props.errorMessage && props.touched) {
        validationError = <label className={classes.Error}>{props.errorMessage}</label>;
    }

    switch(props.elementType) {
        case ('input'):
            inputElement = <input
                className={classes.InputElement}
                value={props.value}
                {...props.elementConfig} 
                onChange={props.changed} />;
            break;
        case ('select'):
            inputElement = (
                <select value={props.value}
                    className={classes.InputElement}
                    onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = <input 
                className={classes.InputElement}
                value={props.value}
                {...props.elementConfig} 
                onChange={props.changed} />
    }

    return (
        <div className={classes.Wrapper}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    );
}

export default input;