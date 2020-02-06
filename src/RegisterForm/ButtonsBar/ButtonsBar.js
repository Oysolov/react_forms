import React from 'react';
import ActionButton from '../ActionButton/ActionButton';

const buttonsBar = (props) => {
    return (
        <div>
            <ActionButton name="Submit" click={props.submit}/>
            <ActionButton name="Clear" click={props.clear}/>
            <ActionButton name="Reset" click={props.reset}/>
        </div>
    );
}

export default buttonsBar;