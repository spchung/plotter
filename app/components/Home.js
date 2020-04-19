import React, { useState, useEffect} from 'react';
import View from './View.js';
import Select from './Select';
import Range from './Range';
import RangeSetter from './RangeSetter';
const Processor = require('../libs/Processor');

function Home(){
    var ProcessUtils = new Processor();
    const [_dataObj, setData] = useState({ data:"", head:"", ready:false }); //input dataset 
    const [_select, setSelect] = useState("init");  // variable being displayed
    const [_array, setArray] = useState({states:["init"], data:["init"], ready:false}); // select variable data only
    const [_range, setRange] = useState({start:0, end:10}); // number of variables displayed at onece 

    const handleUpload = () => {
        var fileToLoad = document.getElementById("loader").files[0]
        var reader = new FileReader();
        reader.onload = (ev) => {
            // callback
            ProcessUtils.setData(ev.target.result);
            setData({   
                head : ProcessUtils.getHead(),
                data : ProcessUtils.getBody(),
                ready: true
            });
        }
        reader.readAsText(fileToLoad)
    }

    // set display range
    const updateSlideVal = function(rangeObj){
        // val = size of batch 
        console.log("moving window")
        setRange({
            start: rangeObj.start,
            end: rangeObj.end
        });
    }

    // Data object
    useEffect(() => {
        if(_dataObj.ready){
            setSelect(_dataObj.head[1]); //set first var as default variable
        }
    },[_dataObj]);

    // var select
    useEffect(() => {
        if(_select!="init"){
            setArray({
                states: ProcessUtils.query(_dataObj.head, _dataObj.data, "State"),
                data: ProcessUtils.query(_dataObj.head, _dataObj.data, _select), 
                ready: true});
        }
    },[_select])

    return(
        <div className="upload">
            <input id="loader" type ='file' onChange={handleUpload} autoComplete="off"/>
            <Select variables = {_dataObj.head} status={_dataObj.ready} setSelect={setSelect}/>
            <View head={_dataObj.head} array={_array} select={_select} rangeObj={_range}/>
            <Range dataObj={_dataObj} onUpdate={updateSlideVal} rangeObj={_range} />
            <RangeSetter rangeObj={_range} setRange={setRange} dataArray={_array} hasData={_dataObj.ready}/>
        </div>
    )
};

export default Home;