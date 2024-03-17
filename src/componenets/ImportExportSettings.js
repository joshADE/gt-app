import React, { useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import FileSaver from 'file-saver';
import { Button, Input, Label, FormGroup } from 'reactstrap'
import { loadCourses } from '../redux/course/courseActions';
import CourseClass from './model/CourseClass';
import { StyledFileInput } from '../styles/components/appStyles';
import { notify } from './Notification';
var obj_csv = {
    size: 0,
    dataFile: []
}

var loadCoursesPayload = {
    courses: [],
    prereq: {},
    coreq: []
}

function import_csv(input, callback) {
    console.log(input);
    if (input.files && input.files[0]){
        let reader = new FileReader();
        reader.readAsBinaryString(input.files[0]);
        reader.onload = function(e) {
            console.log(e);
            obj_csv.size = e.total;
            obj_csv.dataFile = e.target.result;
            console.log(obj_csv.dataFile);
            parseCSVData(obj_csv.dataFile);
            callback();
        }
    }
}

function parseCSVData(data) {
    // let csvData = [];
    let lbreak = data.split("\n");
    let currentRead = "";
    let courses = [];
    let prereq = {};
    let coreq = [];

    lbreak.forEach(res => {
        // csvData.push(res.split(","));
        if (res === "TERMS" || res === "PREREQ" || res === "COREQ"){
            currentRead = res;
            return;
        }
        
        if (currentRead === "TERMS"){

            if (res.startsWith('name,')){
                return;
            }
            if (res === "-"){
                // new term
                courses.push([]);
                return;
            }
            let course = res.split(",");
            if (course.length === 4 && courses.length > 0){
                courses[courses.length - 1].push(new CourseClass(course[0], course[1], Number(course[2]), Number(course[3])));
            }

        }else if (currentRead === "PREREQ"){
            let pC = res.split(",");
            if (pC.length > 1){
                prereq[pC[0]] = pC.slice(1);
            }
        }else if (currentRead === "COREQ"){
            let cC = res.split(",");
            if (cC.length > 1){
                coreq.push(cC);
            }
        }

    });
    //console.table(csvData);
    console.log(courses, prereq, coreq);
    loadCoursesPayload.courses = courses;
    loadCoursesPayload.prereq = prereq;
    loadCoursesPayload.coreq = coreq;
}

function export_csv(arrayHeader, terms, prereq, coreq, delimiter, fileName) {
    let csv = "TERMS\n";
    let header = arrayHeader.join(delimiter) + "\n";
    csv += header;
    terms.forEach(term => {
        csv += "-\n";
        term.forEach(course => {
            let row = [];
            for (let index in arrayHeader){
                if (course.hasOwn(arrayHeader[index])) {
                    row.push(course[arrayHeader[index]]);
                }
            }
            csv += row.join(delimiter)+"\n";
        })
        
    })

    csv += "PREREQ\n";
    for (let key in prereq) {
        if (prereq.hasOwn(key)){
            let row = [];
            row.push(key);
            prereq[key].forEach(coursecode => {
                row.push(coursecode);
            })
            csv += row.join(delimiter)+"\n";
        }
    }
    csv += "COREQ\n";
    coreq.forEach(coreqset => {
        csv += coreqset.join(delimiter)+"\n";
    })

    let csvData = new Blob([csv], { type: 'text/csv' });  
    let csvUrl = URL.createObjectURL(csvData);

    let hiddenElement = document.createElement('a');
    hiddenElement.href = csvUrl;
    hiddenElement.target = '_blank';
    hiddenElement.download = fileName + '.csv';
    hiddenElement.click();
}

function import_json (input, callback) {
    console.log(input);
    if (input.files && input.files[0]){
        let reader = new FileReader();
        reader.readAsText(input.files[0], 'UTF-8');
        reader.onload = function(e) {
            console.log(e);
            obj_csv.size = e.total;
            obj_csv.dataFile = e.target.result;
            console.log(obj_csv.dataFile);
            if (parseJSONData(obj_csv.dataFile)){
                callback();
            }
        }
    }
}

function parseJSONData(data) {
    try {
        let obj = JSON.parse(data);
        console.log(obj);
        if (obj.courses && obj.prereq && obj.coreq){
            loadCoursesPayload.courses = obj.courses;
            loadCoursesPayload.prereq = obj.prereq;
            loadCoursesPayload.coreq = obj.coreq;
            return true;
        }
        return false;
    }catch(e){
        return false;
    }
    
}

function export_json (courses, prereq, coreq, fileName){
    var json = JSON.stringify({courses, prereq, coreq });
    var blob = new Blob([json], { type:"application/json;charset=utf-8"});
    FileSaver.saveAs(blob, fileName+".json");
}

function ImportExportSettings() {
    const [type, setType] = useState('json');
    const { courses, prereq, coreq } = useSelector(state => state.courses)
    const dispatch = useDispatch();
    const fileUploadRef = useRef();

    const checkBoxChecked = (e) => {
        setType(e.target.value);
    }

    const handleImport = () => {
        if (type === 'json') {
            if (fileUploadRef.current){
                import_json(fileUploadRef.current, () => {
                    dispatch(loadCourses(
                        loadCoursesPayload.courses,
                        loadCoursesPayload.prereq,
                        loadCoursesPayload.coreq
                    ));
                    notify('Import successful!', 'success');
                });
            }
        }else if (type === 'csv'){
            if (fileUploadRef.current){
                import_csv(fileUploadRef.current, () => {
                    dispatch(loadCourses(
                        loadCoursesPayload.courses,
                        loadCoursesPayload.prereq,
                        loadCoursesPayload.coreq
                    ));
                    notify('Import successful!', 'success');
                });
            }
        }
    }

    const handleExport = () => {
        if (type === 'json') {
            export_json(courses, prereq, coreq, 'courses');
        }else if (type === 'csv'){
            export_csv(['name', 'code', 'grade', 'credits'], courses, prereq, coreq, ',', 'courses');
        }
    }

    return (
        <div className="">
            <Label>Type</Label>
            <FormGroup check>
                <Label check>
                    <Input type="radio" name="type" value="json" checked={type === 'json'} onChange={checkBoxChecked}/>{' '}
                    JSON
                </Label>
            </FormGroup>
            <FormGroup check>
                <Label check>
                    <Input type="radio" name="type" value="csv" checked={type === 'csv'} onChange={checkBoxChecked}/>{' '}
                    CSV
                </Label>
            </FormGroup>
            
            Upload File:{' '}
            <StyledFileInput type="file" id="uploadfile" ref={fileUploadRef} />{' '}
            <Button outline color="primary" onClick={handleImport}>Import</Button>{' '}
            <Button outline color="secondary" onClick={handleExport}>Export</Button>
        </div>
    )
}

export default ImportExportSettings
