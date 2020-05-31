import PropTypes from 'prop-types';
import React, { Component } from 'react'

export class AddTerm extends Component {
    render() {
        return (
            
        <button 
        type="button" 
        onClick={this.props.handleClickAddTerm} 
        style={addNewTermStyle}
        className="btn btn-add"
        >
            Add a new term
        </button>
        )
    }
}



// PropTypes
AddTerm.propType = {
    termNumber: PropTypes.number.isRequired,
    handleClickAddTerm: PropTypes.func.isRequired,
}

const addNewTermStyle = {
    width:'100%',
};


export default  AddTerm;