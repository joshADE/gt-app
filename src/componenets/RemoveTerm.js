import PropTypes from 'prop-types';
import React, { Component } from 'react'

export class RemoveTerm extends Component {
    render() {
        return (
            
        <button 
        type="button" 
        onClick={this.props.handleClickRemoveTerm} 
        style={removeTermStyle}
        className="btn btn-delete"
        >
            Remove the last term
        </button>
        )
    }
}


// PropTypes
RemoveTerm.propType = {
    termNumber: PropTypes.number.isRequired,
    handleClickRemoveTerm: PropTypes.func.isRequired,
}

const removeTermStyle = {
    width:'100%',
};


export default RemoveTerm;