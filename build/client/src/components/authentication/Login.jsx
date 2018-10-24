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
      isLoggedin: this.props.isLoggedIn
    }
   this.handleInput = this.handleInput.bind(this);

  }
  handleInput(e){
    
  }
  handleSubmit(){
    this.props.userLogin
  }
  render(){
    return(  
      <div>
        <h2 ref={subtitle => this.subtitle = subtitle}>Login</h2>   
        <form>
          <div>
            <label htmlFor="username">Username</label>
            <input type='text' />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type='text' />
          </div>
          <button onClick={this.handleSubmit}>Login</button>
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