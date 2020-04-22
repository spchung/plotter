import React, {useState, useEffect} from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
const Range = Slider.Range;

function TwoHandleRange(props){
  // props: rangeObj, setRange(), dataReady
  const range = Object.values(props.rangeObj);
  const maxValue = props.maxValue;
  const setRange = props.setRange;
  const dataReady = props.dataReady;

  // local states 
  const [lowerBound, setLowerBound] = useState(0);
  const [upperBound, setUpperBound] = useState(20);

  function lowerBoundChange(e){
    if(dataReady)
      setLowerBound(+e.target.value);
  }

  function upperBoundChange(e){
    if(dataReady)
      setUpperBound(+e.target.value);
  }

  function handleApply(){
    // update range 
    if(dataReady){
      setRange({start:lowerBound, end:upperBound});
      console.log(range)
    }
  }

  function onSliderChange(value){
    if(dataReady){
      const [lower, upper] = value;
      setRange({start:lower, end:upper});
    }
  }

  return(
    <div>
        {dataReady ? (
          <div>
            <label>LowerBound: </label>
            <input type="number" value={lowerBound} onChange={lowerBoundChange} />
            <br />
            <label>UpperBound: </label>
            <input type="number" value={upperBound} onChange={upperBoundChange} />
            <br />
            <button onClick={handleApply}>Apply</button>
            <br /><br />
            <Range allowCross={false} value={range} onChange={onSliderChange} max={maxValue}/>
          </div>
        ) : (
          null
        )}
    </div>
  )
}

export default TwoHandleRange;