import React from 'react';

const input = (props) => {
    let inputElement = null;
    let validationError = null;
    if(props.errorMessage && props.touched) {
        validationError = <p>{props.errorMessage}</p>;
    }

    switch(props.elementType) {
        case ('input'):
            inputElement = <input
                value={props.value}
                {...props.elementConfig} 
                onChange={props.changed} />;
            break;
        case ('select'):
            inputElement = (
                <select value={props.value}
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
                value={props.value}
                {...props.elementConfig} 
                onChange={props.changed} />
    }

    return (
        <div >
            <label>{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    );
}

export default input;