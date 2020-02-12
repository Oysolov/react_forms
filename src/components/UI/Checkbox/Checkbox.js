import React from 'react';

const input = (props) => {
    let validationError = null;
    if(props.errorMessage) {// && props.touched) {
        validationError = <p>{props.errorMessage}</p>;
    }

    return (
        <div >
            <label>{props.label}</label>
            <input
                type="checkbox"
                checked={props.checked}
                onChange={props.changed} />
            {validationError}
        </div>
    );
}

export default input;