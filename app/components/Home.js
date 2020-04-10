import React, { useState, useEffect} from 'react';
import View from './View.js';
import Select from './Select'
import LineExample from './Line'
const Processor = require('../libs/Processor');

function Home(){
    var ProcessUtils = new Processor();
    const [_dataObj, setData] = useState({ data:"", head:"", ready:false });
    const [_select, setSelect] = useState("init");
    const [_array, setArray] = useState({states:"init", data:"init", ready:false});
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

    // Data object
    useEffect(()=>{
        if(_dataObj.ready){
            setSelect(_dataObj.head[1]); //set first var as default variable
            console.log("file Read");
        }
    },[_dataObj]);

    // var select
    useEffect(()=>{
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
            <View head={_dataObj.head} array={_array} select={_select}/>
        </div>
    )
};

export default Home;