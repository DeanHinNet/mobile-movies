import React from 'react';
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};
class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      modalIsOpen: false,
      isLoggedin: this.props.isLoggedIn,
      email: '',
      password: '',
      message: '',
      status: 0
    }
   this.handleInput = this.handleInput.bind(this);
   this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleInput(e){
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleSubmit(e){
   
    e.preventDefault();
    console.log(this.state.password)
   
    this.props.userLogin({
      email: this.state.email,
      password: this.state.password
    })
  }
  render(){
    
    return(  
      <div id='login-form'>
       
        <form>
        <h3>Please login.</h3>
          <div>
            <label htmlFor="email">Email</label>
            <input id='email' name='email' placeholder='bob@home.com' type='text' value={this.state.email} onChange={this.handleInput} required/>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input id='password' name='password' placeholder='********' type='password' value={this.state.password} onChange={this.handleInput}required/>
          </div>
          <button onClick={this.handleSubmit}>SUBMIT</button>
          <p>{this.props.response.status === 0 || this.props.response.status === 201 ? '' : this.props.response.message}</p>
        </form>
      </div>
    )
  }
}

export default Login;
/*
 
  <div id='login'>
        <form action="">
        </form>
      </div>
*/