import React, { useState, useEffect} from 'react';
import View from './View.js';
import Select from './Select';
import Range from './Range';
import RangeSetter from './RangeSetter';
import TreeTracker from './TreeTracker';
import WindowInterval from './WindowInterval';
import InitInputGroup from './InitInputGroup';

import { FaUpload } from 'react-icons/fa'

const Processor = require('../libs/Processor');

function Home(){
    var ProcessUtils = new Processor();
    const [_dataObj, setData] = useState({ data:"", head:"", ready:false }); //input dataset 
    const [_select, setSelect] = useState("init");  // variable being displayed
    const [_array, setArray] = useState({states:["init"], data:["init"], ready:false}); // select variable data only
    const [_range, setRange] = useState({start:0, end:200}); // number of variables displayed at onece 

    const handleUpload = () => {
        var fileToLoad = document.getElementById("file").files[0]
        var reader = new FileReader();
        reader.onload = (ev) => {
            // callback
            ProcessUtils.setData(ev.target.result);
            setData({   
                head : ProcessUtils.getHead(),
                data : ProcessUtils.getBody(),
                ready: true
            });

            // change DOM 
            const homeDiv = document.getElementById('home-main');
            homeDiv.id = homeDiv.id + "-active";
        }
        reader.readAsText(fileToLoad)
    }

    // set display range
    const updateSlideVal = function(rangeObj){
        // val = size of batch 
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

    // var range 
    useEffect(() => {
        // console.log(_range.start, _range.end);
    }, [_range])

    return(
        <div className="home" id="home-main">
            {_dataObj.ready ? 
                ( <div>
                    <View head={_dataObj.head} array={_array} select={_select} rangeObj={_range}/>
                    <WindowInterval rangeObj={_range} setRange={setRange} dataReady={_dataObj.ready} maxValue={_array.data.length}/>
                    <Range dataObj={_dataObj} onUpdate={updateSlideVal} rangeObj={_range} dataArrayLength={_array.data.length} setRange={setRange}/> 
                    <div id="input-select">
                        <input name="file" id="file" type ='file' hidden onChange={handleUpload} autoComplete="off"/>
                        <label htmlFor="file" id="input-label"> <FaUpload/> Choose File </label>
                        <Select variables={_dataObj.head} status={_dataObj.ready} setSelect={setSelect}/>
                    </div>
                  </div>

                ) : ( 
            
                <InitInputGroup handleUpload={handleUpload}/> )
            }
        </div>
    )
};

export default Home;