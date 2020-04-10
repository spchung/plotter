import React, {useEffect, useState, useRef} from 'react';
import {Line} from 'react-chartjs-2';

function View(props){
    const [_arrayObj, setOptions] = useState({ ready:false, data:"init" });
    const [_data, setData] = useState({data:{},ready:false});

    //PROP
    useEffect(() => {
        if(props.array.ready){
            setData({
                data: createDataSet(props.array.data, props.select, props.head, props.array.states), 
                options: createOptions(false, "States"),
                ready:true
            });
        }
    },[props.array]);

    const options={
        showLines:false,
        scales: {
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'probability'
                }
            }]
        }     
    };

    return (
        <div>
            {_data.ready ? (
                <Line data={_data.data} options={_data.options}/>
            ) : (
                <p>come back later</p>
            )}
        </div>
    );
};

function createOptions(showLine, xLabel){
    return {
        showLines: showLine,
        scales: {
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: xLabel
                }
            }]
        }     
    };
}

function createDataSet(array, select, head, states){
    // console.log(states);
    const data = {
        labels: states.slice(0,10),
        datasets: [
            {
                label: select,
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 5,
                pointHitRadius: 10,
                data: array.slice(0,10)
            }
        ]
    };
    return data;
}

export default View;