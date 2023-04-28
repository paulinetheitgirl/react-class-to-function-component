import React, { useState } from 'react';

export function ReactFunction (props) {
    console.log(`Logging from function component`);
    const [userName, setUserName] = useState('');
    const [greeting, setGreeting] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        setGreeting(`Hello ${userName}. You viewed this on ${props.theDate}`);
    };

    const handleChange = (event) => {
        setUserName(event.target.value);
    }

    return (<>
        <h1 className='text-3xl font-bold'>Function Component</h1>
        <form onSubmit={handleSubmit}>
                <div className='flex flex-row gap-1'>
                    <label htmlFor=""></label>
                    <input
                        type="text"
                        name="userName"
                        id="userName"
                        value={userName} 
                        onChange={handleChange}
                    />
                    <button className='rounded p-4 bg-cyan-500 font-bold text-white'>Go</button>
                </div>
            </form>
            <p><strong>{greeting}</strong></p>
    </>);
}