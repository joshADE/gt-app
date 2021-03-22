import React from 'react'

function Instructions() {
    return (
        <React.Fragment>
            <div className="padding-left font-large font-bold">
            <h1>Instructions</h1> 
            </div>
            <div className="padding-left font-medium">
            <h2>Adding a course</h2>
            <p>To add a course:</p>
            <ol style={listStyle}>
                <li>First make sure that the term for the course exist. This can be done by clicking the 'Add a new term' button. The term number should be displayed on the left side.</li>
                <li>Once the correct term exist, locate the corresponding 'add course' field for the term.</li>
                <li>Enter the course code for the course in the field, and press enter or click the 'Add a new course' button.</li>
                <li>If the course ws successfully added, a cell should appear with the course code in the table.</li>
                <li>You can change the name, course code, and credits by edit the remaining fields then clicking 'Set changes'</li>
            </ol> 
            </div>

            <div className="padding-left font-medium">
            <h2>Adding/Editing prerequisites</h2>
            <p>To change prerequisite courses:</p>
            <ol style={listStyle}>
                <li>First select a course by clicking on the 'Select' button on any one of the course cells.</li>
                <li>Once a course has been selected, a panel in the bottom will open.</li>
                <li>There will be a select form displaying the current prerequisites of the selected course.</li>
                <li>Click anywhere in the select form to open a list of the available prerequisite courses to choose from.</li>
                <strong>Note: The list of prerequisites is made up of courses that exist in previous terms of the currently selected course</strong>
                <li>Select prerequisite courses by clicking on any of the course codes.</li>
                <strong>Note: Once you have finished, make sure to click 'Accept changes' button at the bottom of the panel</strong>
                <li>You can not only add courses, but remove and change the courses by clicking on the 'x' beside each course code.</li>

      
            </ol> 
            </div>
            <div className="padding-left font-medium">
            <h2>Adding/Editing corequisites</h2>
            <p>To change corequisites courses:</p>
            <ol style={listStyle}>
                <li>First select a course by clicking on the 'Select' button on any one of the course cells.</li>
                <li>Once a course has been selected, a panel in the bottom will open.</li>
                <li>There will be a select form displaying the current corequisites of the selected course.</li>
                <li>Click anywhere in the select form to open a list of the available corequisite courses to choose from.</li>
                <strong>Note: The list of corequisites is made up of courses that exist in same term as the currently selected course</strong>
                <li>Select corequisite courses by clicking on any of the course codes.</li>
                <strong>Note: Once you have finished, make sure to click 'Accept changes' button at the bottom of the panel</strong>
                <li>You can also change and remove the courses by clicking on the 'x' beside each course code.</li>
                <strong>Note: When adding/changing the corequisite for a course, you can combine two sets of corequisites but cannot combine a set with a single course. </strong>
                <strong>Trying to combine a set with a single course without specifying all the courses in the set will delete the previous set and create a new set.</strong>
      
            </ol>
            </div>
        </React.Fragment>
    )
}

export default Instructions


const listStyle = {
    padding: '0 5px'
};