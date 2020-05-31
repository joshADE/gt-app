import React from 'react'

function SaveChanges(props) {
    return (
        <button
            onClick={props.onSaveClick}
            style={buttonStyle}
            className="btn btn-save"
        >
            Save the changes
        </button>
    )
}
const buttonStyle = {
    borderRadius:'5px 0 0 0',
    border:'2px solid black',
    background: '#55F',
};

export default SaveChanges;
