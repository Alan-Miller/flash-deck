import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Share extends Component {

    constructor() {
        super()

        this.state = {
            userId: 2
            ,searchValue: ''
            ,friends: []
            ,pending: []
            ,searchResults: []
        }
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        axios.get(`http://localhost:3021/api/friends/${this.state.userId}`)
        .then(response => { 
            const friends = response.data;
            this.setState({ friends });
        });

        axios.get(`http://localhost:3021/api/pending/${this.state.userId}`)
        .then(response => { 
            const pending = response.data;
            this.setState({ pending });
        });
    }

    handleInput(e) {
        this.setState({
            searchValue: e.target.value
        });
    }
    handleSubmit(e) {
        e.preventDefault();
        axios.get(`http://localhost:3021/api/users?value=${this.state.searchValue}`)
        .then(response => { 
            const searchResults = response.data;
            this.setState({ searchResults });
        })
    }

    inviteFriend(inviteeId) {
        axios.post(`http://localhost:3021/api/friends/${this.state.userId}/${inviteeId}`)
        .then(response => {
            console.log('Share res', response);
            const pending = response.data;
            this.setState({ pending });
        })
    }

    render() {
        return (
            <main className="Share">
                <Link to="/"><h4>Home</h4></Link>
                <form className="findFriend" onSubmit={ this.handleSubmit }>
                    <h2>Invite new friend by username</h2>
                    <input 
                        type="text" 
                        placeholder="username" 
                        value={ this.state.searchValue } 
                        onChange={ this.handleInput }/>
                </form>
                <ul className="friends list">
                    <h3>Friends</h3>
                    { this.state.friends.map((friend, i) => (
                        <li key={i} className="listItem">
                            {friend.display_name}
                        </li>
                    ))}
                </ul>
                <ul className="searchResults list">
                    <h3>Search results</h3>
                    { this.state.searchResults.map((result, i) => (
                        <li key={i} className="listItem">
                            {result.display_name}: {result.username}
                            <div 
                                className="friendInvite"
                                onClick={ () => this.inviteFriend(result.id) }>
                                invite
                            </div>
                        </li>
                    ))}
                </ul>
                <ul className="pending list">
                    <h3>Pending invitations</h3>
                    { this.state.pending.map((pending, i) => (
                        <li key={i} className="listItem">
                            {pending.display_name}
                        </li>
                    ))}
                </ul>
            </main>
        )
    }
}