import React from 'react'

function SaveChanges(props) {
    return (
        <input
            onClick={props.onSaveClick}
            style={buttonStyle}
            className="btn btn-save"
            type="button"
            value="Save the changes"
        />
    )
}
const buttonStyle = {
    borderRadius:'5px',
    border:'2px outset black',
    background: '#55F',
    height: '100%',
    color: '#fff',
};

export default SaveChanges;
