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
    border:'2px solid black',
    background: 'rgb(241, 83, 83)',
};

export default ResetChanges;
