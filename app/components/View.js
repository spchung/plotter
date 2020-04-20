import React, {useEffect, useState, useRef} from 'react';
import {Line} from 'react-chartjs-2';

function View(props){
    /*
    props: head, array, select, rangeObj
    */

    const [_arrayObj, setOptions] = useState({ ready:false, data:"init" });
    const [_data, setData] = useState({data:{},ready:false});

    // PROP -> listen to change in array or range
    useEffect(() => {
        if(props.array.ready){
            setData({
                data: createDataSet(props.array.data, props.select, props.head, props.array.states, props.rangeObj), 
                options: createOptions(true, "States"),
                ready:true
            });
        }
    },[props.array, props.rangeObj]);

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
                <p> No Input File </p>
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
                },
                gridLines : {
                    drawOnChartArea:false,
                    drawTicks: true
                },
                ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10
                }
            }],
            yAxes :[{
                gridLines: {
                    drawOnChartArea:false,
                    drawTicks: false
                }
            }]
        }     
    };
}

function createDataSet(array, select, head, states, rangeObj){
    // console.log(states);
    const data = {
        labels: states.slice(rangeObj.start,rangeObj.end),
        datasets: [
            {
                label: select,
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(150,206,180,0.8)',
                borderColor: 'rgba(255,238,173,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba((255,204,92,1)',
                pointBackgroundColor: 'rgba(255,111,105,1)',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(136,216,176,1)',
                pointHoverBorderColor: 'rgba(136,216,176,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 3,
                pointHitRadius: 10,
                data: array.slice(rangeObj.start,rangeObj.end)
            }
        ]
    };
    return data;
}

export default View;