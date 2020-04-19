import React, {useEffect, useState} from 'react';

function Range(props){
    /*
    props: dataObj, onUpdate(), rangeObj
    */
    // const [_range, setRange] = useState(100);

    var range = props.rangeObj.end - props.rangeObj.start;
    function onChange(e){
        let leftIndex = Number(e.target.value);
        let rightIndex = leftIndex + range;
        let retObj = {
            start: leftIndex,
            end: rightIndex
        }

        console.log(retObj);
        props.onUpdate(retObj);
    }

    return (
        <div>
            <input
                className="slider"
                type="range"
                defaultValue={0}
                onChange={onChange}>
            </input>
        </div>
    )
}

export default Range;
