import React , { Component, Fragment } from 'react';
import axios from 'axios';


const MessageTemplate = props => (
    props.editMessage !== props.message._id ? (
        <tr>
            <td>{props.message.value}</td>
            <td>
                <Fragment>
                    <button className="btn btn-primary" onClick={(e)=> props.switchToEdit(e, props.message)}>
                        Edit
                    </button>
                    <button className="btn btn-danger" onClick={(e)=> props.remove(e, props.message)}>
                        Delete
                    </button>
                </Fragment>
            </td>
        </tr>
    ) : (
        <tr>
            <td>
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="New message" 
                    aria-label="New Message" 
                    aria-describedby="basic-addon2" 
                    value={props.value} 
                    onChange={(e) => props.handleChange(e, props.message)}
                /></td>
            <td>
                <Fragment>
                    <button className="btn btn-success" onClick={(e)=> props.update(e, props.message)}>
                        Update
                    </button>
                    <button className="btn btn-secondary" onClick={(e)=> props.switchToEdit(e, props.message)}>
                        Cancel
                    </button>
                </Fragment>
            </td>
        </tr>
     )
)


export default class MessageList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            newMessage: '',
            editMessage: null,
            newValue: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.switchToEdit = this.switchToEdit.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:4000/messages')
            .then( res => {
                this.setState({
                    messages: res.data,
                })
            })
            .catch( err => console.log(err));
    }

    handleChange(event, message = null) {
        if (message) {
            this.setState({newValue: event.target.value});
        } else {
            this.setState({newMessage: event.target.value});
        }
        
    }

    handleSubmit(event) {
        axios.post('http://localhost:4000/messages/add', { 
            value: this.state.newMessage 
        }).then( res => this.setState({
            messages: res.data,
            newMessage: '',
            editMessage: null,
        }));
        event.preventDefault();
    }

    handleRemove(e, message) {
        axios.delete('http://localhost:4000/messages/remove/' + message._id, 
            message
        ).then( res => this.setState({
            messages: res.data,
        }));
        e.preventDefault();
    }

    handleUpdate(e, message) {
        axios.put('http://localhost:4000/messages/update/' + message._id, 
            {
                ...message,
                value: this.state.newValue,
            }
        ).then( res => this.setState({
            messages: res.data,
            newValue: '',
            editMessage: null,
        }));
        e.preventDefault();
    }

    switchToEdit(e, message) {
        if (message._id === this.state.editMessage) {
            this.setState({
                editMessage: null
            })
        } else {
            this.setState({
                editMessage: message._id,
                newValue: message.value
            })
        }
        e.preventDefault();
    }

    messageList = () => this.state.messages.map(
        (message, index) => (
            <MessageTemplate 
                message={message} 
                key={index} 
                value={this.state.newValue} 
                editMessage={this.state.editMessage} 
                remove={this.handleRemove} 
                switchToEdit={this.switchToEdit} 
                handleChange={this.handleChange}
                update={this.handleUpdate}
            />
        ))
    

    render() {
        return (
            <div>
                <h3>Message List</h3>
                <table className="table table-striped" style={{ marginTop: 20}}>
                    <thead>
                        <tr>
                            <th>Message</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Message" 
                                    aria-label="Message" 
                                    aria-describedby="basic-addon1" 
                                    value={this.state.newMessage} 
                                    onChange={this.handleChange}
                                />
                            </td>
                            <td>
                                <button className="btn btn-success" onClick={this.handleSubmit}>
                                    Create
                                </button>
                                
                            </td>
                        </tr>
                        { this.messageList() }
                    </tbody>
                </table>
            </div>
        )
    }
}