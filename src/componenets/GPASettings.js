import React, { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as AllActionCreators from '../redux';
import { Table, Form, Input, Button, Label } from 'reactstrap';
import App from '../App';
import { customSchoolName } from '../redux/settings/settingsReducer';

const gradeLetters = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'F', 'Not Set'];

function GPASettings() 
{
    
    const { currentSchool, schools } = useSelector(state => state.settings);
    const dispatch = useDispatch();
    //console.log(schools[currentSchool]);
    const [GPAStops, setGPAStops] = useState(schools[currentSchool]);
    const [state, setState] = useState({lower: 0, upper: 0, gradepoint: 0, letter: 'Not Set'});
        
    useEffect(() => {
        localStorage.setItem(App.localStorageKey+"currentSchool", JSON.stringify(currentSchool));
        setGPAStops(schools[currentSchool]);
        
    },[currentSchool, schools]);

    const customSchoolGPAStops = schools[customSchoolName];
    useEffect(() => {
        localStorage.setItem(App.localStorageKey+customSchoolName, JSON.stringify(customSchoolGPAStops));
    },[customSchoolGPAStops, schools]);
    
    

    const removeAtIndex = (e, index) => {
        setGPAStops(GPAStops.slice(0, index).concat(GPAStops.slice(index + 1, GPAStops.length)));
    }


    const onChange = (e) => {
        setState({...state, [e.currentTarget.name]:e.currentTarget.value});
    }

    const saveSchoolData = () => {
        dispatch(AllActionCreators.setSchoolGrades(currentSchool, GPAStops));
        
    }

    const onSchoolChange = (e) => {
        const { value } = e.currentTarget;
        dispatch(AllActionCreators.setCurrentSchool(value));
        

    }
    const addStop = (e) => {
        e.preventDefault();
        const newStop = state;



        const newStops = GPAStops.concat(newStop).sort((a, b) => b.upper - a.upper);
        
        setGPAStops(newStops);

    }
    
    return (
        <div>
            <Form
                onSubmit={addStop}
            >
            <Label htmlFor="school">School</Label>
                <Input type="select" name="school" id="school" onChange={onSchoolChange}  value={currentSchool}>
                    {Object.keys(schools).map(val => 
                    (<option key={val} value={val}>{val}</option>)
                    )}
                </Input>
                <Table
                    striped
                    size="sm"
                >
                    <thead>
                        <tr>
                            <th>Lower Bound</th>
                            <th>Upper Bound</th>
                            <th>Grade Point</th>
                            <th>Letter</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        {GPAStops.map((stop, index) => {
                            return (
                                <tr key={index}>
                                    <td>{stop.lower}</td>  
                                    <td>{stop.upper}</td>  
                                    <td>{stop.gradepoint}</td>  
                                    <td>{stop.letter}</td>
                                    <td>
                                    {
                                        (currentSchool === customSchoolName &&
                                            (
                                                <Button 
                                                    onClick={(e) => removeAtIndex(e, index)}
                                                >
                                                    Remove
                                                </Button>
                                            )
                                        )
                                    }
                                    </td>  
                                </tr>
                            );
                        })}
                        {
                            (currentSchool === customSchoolName &&
                                (
                                    <tr>
                                        <td><Input type="number" max="100" min="0" name="lower" id="lower" placeholder="0" onChange={onChange} value={state.lower}/></td>  
                                        <td><Input type="number" max="100" min="0" name="upper" id="upper" placeholder="0" onChange={onChange} value={state.upper}/></td>  
                                        <td><Input type="number" min="0" name="gradepoint" id="gradepoint" placeholder="0" onChange={onChange}  value={state.gradepoint}/></td>  
                                        <td>
                                            <Input type="select" name="letter" id="letter" onChange={onChange}  value={state.letter}>
                                                {gradeLetters.map(val => 
                                                (<option key={val} value={val}>{val}</option>)
                                                )}
                                    
                                            </Input>
                                        </td>
                                        <td>
                                            
                                                        <Button 
                                                            type="submit"
                                                        >
                                                            Add
                                                        </Button>
                                                
                                            
                                        </td>            
                                    </tr>
                                )
                            )
                        }
                    </tbody>
                </Table>
                
                {
                    (currentSchool === customSchoolName &&
                        (
                            <Button 
                                onClick={saveSchoolData}
                            >
                                Save
                            </Button>
                        )
                    )
                }
                       
            </Form>
        </div>
    )
}

GPASettings.propTypes = {

}

export default GPASettings
