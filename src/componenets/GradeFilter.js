import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class GradeFilter extends Component {
        

    constructor(props){
        super(props);
        this.state = {
            category: '2',
            val: 0.0
        };
    }

    onSubmit = (e) => {
        e.preventDefault();
        const {category, val} = this.state;
        this.props.onClickFilterByCategory(category, val);
    }

    onChange = (e) => this.setState({[e.target.name]: e.target.value });

    
    render() {
        return (
            
            <form style={gradeFilterStyle}
            onSubmit={this.onSubmit}

            >
                <label>Find courses with grade </label>
                {'  '}
                <select 
                id="filter"
                name="category"
                onChange={this.onChange}
                defaultValue={this.state.category}
                >
                    <option value={1}>greater than</option>
                    <option value={2}>less than</option>
                    <option value={3}>equal to</option>
                    <option value={4}>greater than or equal to</option>
                    <option value={5}>less than or equal to</option>
                </select>
                {'  '}

                <input type="text" onChange={this.onChange}  name="val" value={this.state.value} placeholder={0.0} />
                {'  '}
                <input style={btnStyle} type="submit" value="Filter"/>
            </form>
            
        )
    }
}

// PropTypes
GradeFilter.propType = {
    onClickFilterByCategory: PropTypes.func.isRequired,
}

const gradeFilterStyle = {
    padding: '5px 15px',
    width: 'auto',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent:'space-evenly',
    background: '#566',
    borderRadius: '0 5px 0 0',
    border: '2px solid black',
    color: 'white'
};

const btnStyle = {
    display: 'inline-block',
    border: 'none',
    background: '#67F',
    borderRadius: '5px',
    color: '#fff',
    padding: '2px 10px',
    cursor: 'pointer',
};

export default GradeFilter
