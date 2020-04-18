import React, {useEffect, useState} from 'react';

function Range(props){
    var val = 10;

    function onChange(e){
        props.onUpdate(e.target.value)
    }

    return (
        <div>
            <input
                className="slider"
                type="range"
                defaultValue={10}
                min={10}
                max={20}
                onChange={onChange}>
            </input>
        </div>
    )
}

export default Range;
