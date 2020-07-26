import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class CGPACalculator extends Component {
    constructor(props){
        super(props);
        this.state = {
            term: this.props.courses.length, // last term
            CGPA: 0,
        };
    }


    onSubmit = (e) => {
        e.preventDefault();
        const { courses } = this.props;
        const { term } = this.state;
        if (term > -1){
            let allcourses = courses.slice(0, term);
            allcourses = [].concat.apply([], allcourses); // flatten the 2d array
            console.log(allcourses);
            let totalPoints = allcourses.reduce((prev, curr) => prev + curr.grade * curr.credits, 0);
            let totalCredits = allcourses.reduce((prev, curr) => prev + curr.credits, 0);
            if (totalCredits === 0) totalCredits = 1; // to prevent divide by 0
            this.setState({
                CGPA: Math.round(totalPoints/ totalCredits* 100) / 100,
            });
        }else{
            this.setState({
                CGPA: 0
            });
        }
    }

    onChange = (e) => this.setState({[e.target.name]: e.target.value });

    
    render() {

        const { courses } = this.props;
        const { term } = this.state;

        const options = courses.map((cList, index) => {
            return <option key={index+1} value={index + 1}>{index + 1}</option>;
        });
        options.unshift(
            <option key={-1} value={-1}>Choose and option</option>
        );


        return (
            
            <form style={gradeFinderStyle}
            onSubmit={this.onSubmit}
            >
                <label>Find the GPA of the courses up to term:</label>
                {'  '}
                <select
                style={inputStyle} 
                name="term"
                onChange={this.onChange}
                defaultValue={term}
                >
                    {options}
                </select>
                {'  '}
                <input type="submit" style={btnStyle} value="Calculate"/>
                {'  '}
                <label>CGPA: {this.state.CGPA}</label>
            </form>
            
        )
    }
}

// PropTypes
CGPACalculator.propType = {
    courses: PropTypes.array.isRequired,
}

const gradeFinderStyle = {
    padding: '5px 15px',
    borderRadius:'5px',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent:'space-evenly',
    background: '#566',
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

const inputStyle = {
    background: 'lightgrey',
    borderRadius: '5px',
}


export default CGPACalculator
