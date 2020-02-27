import React from 'react';

import classes from './Button.css';

const button = ({clicked, children, className, ...props}) => (
    <button className={`${classes.Button} ${className || ''}`} onClick={clicked} {...props}>{children}</button>
)

export default button;