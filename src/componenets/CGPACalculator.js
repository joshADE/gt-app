import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Input, Label } from 'reactstrap';
//import * as AllActionsCreators from '../redux/index';


export class CGPACalculator extends Component {
    constructor(props){
        super(props);
        this.state = {
            term: this.props.courses.length, // last term
            CGPA: 0,
        };
    }

    convertNumericToGradePoint = (numericGrade, GPAStops) => {
        let gradepoint = 0;
        GPAStops.forEach(stop => {
            //console.log(stop.lower, stop.upper, stop.gradepoint);
            if (numericGrade >= stop.lower && numericGrade <= stop.upper){
                gradepoint = stop.gradepoint;
            }
        });
        return gradepoint;

    }


    onSubmit = (e) => {
        e.preventDefault();
        const { courses, schools, currentSchool } = this.props;
        const { term } = this.state;
        if (term > -1){
            let allcourses = courses.slice(0, term);
            allcourses = [].concat.apply([], allcourses); // flatten the 2d array
            if (schools[currentSchool] && schools[currentSchool].length !== 0){
                let GPAStops = schools[currentSchool];
                GPAStops = GPAStops.sort((a, b) => b.upper - a.upper);
        
                // convert numeric grades to grade points
                allcourses = allcourses.map(course => ({grade: this.convertNumericToGradePoint(course.grade, GPAStops), credits: course.credits}));
            }

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

        const { courses, currentSchool, schools } = this.props;
        const { term } = this.state;

        const options = courses.map((cList, index) => {
            return <option key={index+1} value={index + 1}>{index + 1}</option>;
        });
        options.unshift(
            <option key={-1} value={-1}>Choose an option</option>
        );


        return (
            
            <form style={gradeFinderStyle}
            onSubmit={this.onSubmit}
            >
                <Label>Using {!schools[currentSchool] ||schools[currentSchool].length === 0? 'no grade point conversion': currentSchool + '\'s grade point conversion'}, </Label>
                <Label style={{width: 'auto' }}>GPA of the courses up to term:</Label>
                
                <Input type="select" id="exampleSelect"
                style={inputStyle} 
                name="term"
                onChange={this.onChange}
                defaultValue={term}
                >
                    {options}
                </Input>
                
                <input type="submit" style={btnStyle} value="Calculate"/>
                
                <Label style={{width: 'auto' }}>CGPA: {this.state.CGPA}</Label>
                
            </form>
            
        )
    }
}

// PropTypes
CGPACalculator.propType = {
    courses: PropTypes.array.isRequired,
}

const gradeFinderStyle = {
    padding: '0px 15px',
    borderRadius:'5px',
    display: 'flex',
    alignItems: 'center',
    width: 'auto',
    background: '#727272',
    // border: '2px outset black',
    color: 'white',
    height: '100%',
    fontWeight: 700,
};

const btnStyle = {
    display: 'inline-block',
    border: '1px solid #9C9C9C',
    background: '#64AA8E',
    borderRadius: '15px',
    color: '#fff',
    padding: '2px 10px',
    cursor: 'pointer',
    height: 'auto',
    margin: '1px 10px',
};

const inputStyle = {
    background: 'lightgrey',
    borderRadius: '5px',
    height: 'auto',
    width: 'auto',
    margin: '1px 10px',
}


const mapStateToProps = state => {
    return {
      schools: state.settings.schools,
      currentSchool: state.settings.currentSchool,
    }
  }
  
  
  const mapDispatchToProps = dispatch => {
    return {

    }
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(CGPACalculator);
