import React from 'react'

function ResetChanges(props) {
    return (
        <input
            type="button"
            onClick={props.onResetClick}
            style={buttonStyle}
            className="btn btn-reset"
            value="Reset the changes"
        />
    )
}
const buttonStyle = {
    borderRadius:'5px',
    border:'2px outset black',
    background: '#CF6679',
    height: '100%',
    color: '#000',
};

export default ResetChanges;
