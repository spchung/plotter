import React, { useEffect, useState } from 'react';

function RangeSetter(props){
    /*
    props: rangeObj, setRange(), dataArray, hasData
    */

    const dataLength = props.dataArray.data.length;

    function onSliderChange(e){
        let rightIndex = Number(e.target.value);
        let leftIndex = props.rangeObj.start;
        if(rightIndex > dataLength){
            rightIndex = dataLength;
        }
        props.setRange({start:leftIndex, end:rightIndex});
        // console.log(leftIndex, rightIndex)
    }

    function onTextSubmit(e){
        e.preventDefault()
        let numField = document.getElementById('number-range-setter');
        console.log(numField.value);
        if(!props.hasData){
            alert("No input file");
            return;
        }
        // update range value
        let rightIndex = props.rangeObj.start + Number(numField.value);
        let leftIndex = props.rangeObj.start;
        // console.log(leftIndex,rightIndex)

        // handle Right Edge Case -> see notes at EOF
        if(rightIndex > dataLength){
            let diff = rightIndex - dataLength;
            rightIndex = rightIndex - diff;
            // console.log(leftIndex, rightIndex, " !!!!!")
        }

        //update range 
        props.setRange({start: leftIndex, end: rightIndex});

        // update set range slider value 
        let slider = document.getElementById('range-width-slider');
        slider.value = numField.value;
    }

    // check if user input is out of range
    function onTextFieldChange(e){
        
    }

    function viewAll(){
        if(props.hasData){
            props.setRange({start:0, end:dataLength});
        }
    }

    return(
        <div className="range-setter">
            <button onClick={viewAll}>View All</button>
            <input id="range-width-slider" type="range" defaultValue={0} min={10} max={dataLength} onChange={onSliderChange}/>
            <form onSubmit={onTextSubmit}>
                <input 
                    id="number-range-setter" type="number" 
                    min={10} max={props.hasData? dataLength : 1000000} onChange={onTextFieldChange}
                />
                <input type="submit" value="Submit"/>
            </form>
        </div>
    )   
}

export default RangeSetter;


/*
Note:

RIGHT EDGE CASE: 
- Occurs when submitting a new range value via text input a where the (new value + original leftIndex value) is greater than the length of the dataArray. 
- Solution: when case detected set right index to the end of the dataset.

*/