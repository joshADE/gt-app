import React from 'react'

function ResetChanges(props) {
    return (
        <button
            onClick={props.onResetClick}
            style={buttonStyle}
            className="btn btn-reset"
        >
            Reset the changes
        </button>
    )
}
const buttonStyle = {
    borderRadius:'0 0 0 0',
    border:'2px solid black',
    background: 'rgb(241, 83, 83)',
};

export default ResetChanges;
