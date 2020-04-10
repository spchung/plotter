import React, {useState, useEffect} from 'react';

function Select(props){
    const [ops, setOptions] = useState(["default"]);

    useEffect(() => {
        if(props.status){
            setOptions(props.variables.slice(1));
        }
    },[props.variables, props.status]);


    function selectChange(){
        var e = document.getElementById("selector");
        var selectedVar = e.options[e.selectedIndex].text;
        console.log(selectedVar);

        props.setSelect(selectedVar)
    }

    return(
        <div>
            <select id="selector" onChange={selectChange}>
                {ops.map(item => (
                    <option key={item} value={item}>{item}</option>
                ))}
            </select>
        </div>
    )
}

export default Select;