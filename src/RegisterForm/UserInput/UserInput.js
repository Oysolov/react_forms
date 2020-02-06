import React from 'react';
import './UserInput.css';

const userInput = (props) => {
    const type = props.type ? props.type : 'text';

    return (
        <div>
            <input className="UserInput"
                type={type}
                onChange={props.change}
                value={props.value} 
                placeholder={props.fieldTitle}/>
        </div>
    );
}

export default userInput;