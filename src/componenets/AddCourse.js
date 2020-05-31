import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class AddCourse extends Component {
    constructor(props){
        super(props);
        this.state = {
            courseCode: '',
            message:'Enter the course code'
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (!this.state.courseCode){
            this.setState({
                message: "Must enter course code"
            });
        }else{
        this.props.handleClickAddCourse(this.props.term,this.state.courseCode);
        }
    }

    onChange = (e) => this.setState({[e.target.name]: e.target.value });

    render() {
        return (

            <form
            onSubmit={this.onSubmit}
            style={addCourseStyle}
            >
            <span>{this.state.message}</span>
                <input 
                    type="text"
                    name="courseCode"
                    placeholder="Course Code Here..."
                    value={this.state.courseCode}
                    onChange={this.onChange}
                />
                <input 
                    type="submit"
                    value="Add a new course (+)"
                    className="btn btn-add"
                 />
            </form>
            
        )
    }
}


// PropTypes
AddCourse.propType = {
    handleClickAddCourse: PropTypes.func.isRequired,
    term: PropTypes.number.isRequired,
}


const addCourseStyle = {
    display:'flex', 
    flexDirection:'column',
    background: '#fff',
    border: '1px solid #999',
    fontWeight: 'bold',
    height: 'auto',
    width: '10vw',
    padding: '0',
    textAlign: 'center', 
};


export default AddCourse
