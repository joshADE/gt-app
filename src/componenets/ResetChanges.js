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
    background: 'rgb(247, 154, 154)',
    height: '100%',
    color: '#fff',
};

export default ResetChanges;
