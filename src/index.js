import ReactDOM from 'react-dom';
import React from 'react';
import ReactClass from './components/ReactClass';
import { ReactFunction } from './components/ReactFunction';
import './styles/output.css';

const App = () => {
    const theDate = new Date();
    return (<React.Fragment>
            <div className='p-4'>
                <ReactClass theDate={theDate}/>
            </div>
            <div className='p-4'>
                <ReactFunction theDate={theDate}/>
            </div>
        </React.Fragment>);
 }
ReactDOM.render(<App />, document.getElementById('app'));