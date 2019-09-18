import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createUser, hasErrored } from '../../actions'
import { startConversation } from '../../apiCalls';
import './WelcomeModal.css'

export class WelcomeModal extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      feeling: '',
      submit: '',
      error: ' ',
    }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    console.log('state values 1: ', this.state.firstName, this.state.lastName, this.state.feeling);
  }

  handleSubmit = e => {
    const { firstName, lastName, feeling, error } = this.state;
    e.preventDefault();
    console.log('state values 2: ', this.state.firstName, this.state.lastName, this.state.feeling);
    if(!this.state.firstName && !this.state.lastName && !this.state.feeling) {
      this.setState({submit: true});
      this.setState({error: "Please fille out all fields before checking in."})
    } else {
      console.log('No error');
      this.setState({ error: ''});
    }
    if(!error) 
    { this.props.createUser({
        id: Date.now(),
        firstName,
        lastName,
        feeling,
      });
      this.connectToChatBot();
    }
  }

  connectToChatBot = async () => {
    try {
      const firstMessage = await startConversation(this.state.feeling);
      this.props.addMessage(firstMessage.message, false);
    } catch({ message }) {
      this.props.hasErrored(message);
    }
  }

  render() {
    const { firstName, lastName, feeling, error } = this.state;
    return (
      <form className="welcome-modal">
        <legend>Welcome to Survey Bot!  Please enter your name.</legend>
        {error && <p className="error-msg">{error}</p>}
        <label>First Name:
          <input
            name="firstName"
            value={firstName}
            onChange={this.handleChange}
          />
        </label>
        <label>Last Name:
        <input
            name="lastName"
            value={lastName}
            onChange={this.handleChange}
          />
        </label>
        <select name="feeling" value={feeling} onChange={this.handleChange}>
          <option value="">How are you feeling currently?</option>
          <option value="happy">Happy</option>
          <option value="tired">Tired</option>
          <option value="stressed">Stressed</option>
          <option value="frustrated">Frustrated</option>
        </select>
        <button id="check-in-button" onClick={this.handleSubmit} >
          {/* disabled={!this.state.submit}> */}
          Take 5 minutes to check in!
        </button>
      </form>
    )
  }
}

export const mapDispatchToProps = dispatch => bindActionCreators({ createUser, hasErrored }, dispatch)

export default connect(null, mapDispatchToProps)(WelcomeModal);