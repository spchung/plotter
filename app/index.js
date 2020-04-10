import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import Home from './components/Home.js';

class App extends React.Component{
    render(){
        return(
            <Home/>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'))
