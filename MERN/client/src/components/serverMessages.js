import React , { Component, Fragment } from 'react';
import axios from 'axios';

export default class ServerMessage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            serverMessage: '',
            newMessage: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:4000/messages/random')
            .then( res => {
                this.setState({
                    serverMessage: res.data,
                })
            })
            .catch( err => console.log(err));
    }

    handleChange(event) {
        this.setState({newMessage: event.target.value});
    }

    handleSubmit(event) {
        axios.post('http://localhost:4000/messages/print', {message:this.state.newMessage});
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <h3>Server message {this.state.serverMessage}</h3>
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Message" 
                    aria-label="Message" 
                    aria-describedby="basic-addon1" 
                    value={this.state.newMessage} 
                    onChange={this.handleChange}
                />
                 <button className="btn btn-success" onClick={this.handleSubmit}>
                    Create
                </button>
            </div>
        )
    }
}