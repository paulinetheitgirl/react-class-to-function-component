import React from 'react';

class ReactClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = { userName: '', greeting: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({userName: event.target.value});
    }
    
    handleSubmit(event) {
        event.preventDefault();
        this.setState({greeting: `Hello ${this.state.userName}. You viewed this on ${this.props.theDate}`});
    }
    
    render() {
        console.log(`Logging from class component`);
        return (<>
            <h1 className='text-3xl font-bold'>Class Component</h1>
            <form onSubmit={this.handleSubmit}>
                <div className='flex flex-row gap-1'>
                    <label htmlFor=""></label>
                    <input
                        type="text"
                        name="userName"
                        id="userName"
                        value={this.state.userName} 
                        onChange={this.handleChange}
                    />
                    <button className='rounded p-4 bg-black font-bold text-cyan-300'>Go</button>
                </div>
            </form>
            <p><strong>{this.state.greeting}</strong></p>
        </>);
    }
}

export default ReactClass;