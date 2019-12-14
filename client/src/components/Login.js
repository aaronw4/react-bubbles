import React from "react";
import axios from 'axios';

class Login extends React.Component {
  state = {
    credentials: {
      username: '',
      password: ''
    }
  };

  handleChange = e => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value
      }
    })
  };

  login = e => {
    e.preventDefault();

    axios
      .post('http://localhost:5000/api/login', this.state.credentials)
      .then(res => {
        localStorage.setItem('token', res.data.payload);
        this.props.history.push('/BubblePage');
        console.log(res);
      })
      .catch(err => console.log(err.message))
  }
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  render(){
    return (
      <>
        <h1>Welcome to the Bubble App!</h1>
        <form onSubmit={this.login} className='form'>
        <input 
          type='text'
          name='username'
          value={this.state.credentials.username}
          onChange={this.handleChange}
          placeholder='User Name'
          className='input'
        />
        <input
            type='password'
            name='password'
            value={this.state.credentials.password}
            onChange={this.handleChange}
            placeholder='Password'
            className='input'
        />
        <button>Log In</button>
        </form>
      </>
    );
  }
};

export default Login;
