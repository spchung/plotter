import React, { useState, useEffect} from 'react';
import View from './View.js';
import Select from './Select';
import Range from './Range';
const Processor = require('../libs/Processor');

function Home(){
    var ProcessUtils = new Processor();
    const [_dataObj, setData] = useState({ data:"", head:"", ready:false });
    const [_select, setSelect] = useState("init");
    const [_array, setArray] = useState({states:"init", data:"init", ready:false});
    const [_range, setRange] = useState({start:0, end:10, prev:0});

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
    const updateSlideVal = function(val){
        // val = size of batch 
        setRange({start:0 ,end: val});
         
        // if(val > _range.prev){
        //     setRange({start: _range.start-val, end: _range.end-val, prev: val});
        // }
        // else{
        //     setRange({start: _range.start+val, end: _range.end+val, prev:val});
        // }
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
            <Range dataObj={_dataObj} onUpdate={updateSlideVal}/>
        </div>
    )
};

export default Home;