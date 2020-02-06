import React from 'react';

const actionButton = (props) => {
    return (
        <button onClick={props.click}>{props.name}</button>
    );
}

export default actionButton;