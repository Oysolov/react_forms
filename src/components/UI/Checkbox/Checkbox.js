import React from 'react';

import classes from './Checkbox.css';

const input = (props) => {
    let validationError = null;
    if(props.errorMessage) {// && props.touched) {
        validationError = <p className={classes.Error}>{props.errorMessage}</p>;
    }

    return (
        <div>
            <input
                className={classes.Checkbox}
                type="checkbox"
                checked={props.checked}
                onChange={props.changed} />
            <label className={classes.Label}>{props.label}</label>
            {validationError}
        </div>
    );
}

export default input;