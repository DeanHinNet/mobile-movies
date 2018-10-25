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
      signup: false,
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      message: '',
      status: 0
    }
   this.handleInput = this.handleInput.bind(this);
   this.handleSubmit = this.handleSubmit.bind(this);
   this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e){
    if(e.target.name === 'signup'){
      console.log('set to true');
      this.setState({
        signup: true
      })
    } else {
      this.setState({
        signup: false
      })
    }
  }
  handleInput(e){
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleSubmit(e){
    e.preventDefault();
    console.log(this.state.password)
   
    if(e.target.name === 'login'){
      this.props.userLogin({
        email: this.state.email,
        password: this.state.password
      })
    } else {
      this.props.userRegister({
        first_name: this.state.first_name,
        last_name: this.state.first_name,
        email: this.state.email,
        password: this.state.password
      })
    }
  }
  
  

  render(){
    
    return(  
      <div id='login-form'>
       
        <form>
       <a href='#' name='login' onClick={this.handleClick}>Log In</a> | <a href='#' name='signup' onClick={this.handleClick}>Sign Up</a>

          {this.state.signup ? <Signup handleInput={this.handleInput} name={this.state.name}/> : <div></div>}
          <div id='input-email'>
            <label htmlFor="email">Email</label>
            <input id='email' name='email' placeholder='bob@home.com' type='text' value={this.state.email} onChange={this.handleInput} required/>
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input id='password' name='password' placeholder='********' type='password' value={this.state.password} onChange={this.handleInput}required/>
          </div>
          {this.state.signup ? <button name='register' onClick={this.handleSubmit}>Signup</button> : <button name='login' onClick={this.handleSubmit}>Login</button>}
          <p>{this.props.response.status === 0 || this.props.response.status === 201 ? '' : this.props.response.message}</p>
        </form>
      </div>
    )
  }
}
function Signup(props){
  return( <div id='input-name' >
  <label htmlFor='first_name'>First Name</label>
  <input name='first_name' placeholder='bob' type='text' value={props.first_name} onChange={props.handleInput} required/>
  <label htmlFor="last_name">Last Name</label>
  <input name='last_name' placeholder='bob' type='text' value={props.last_name} onChange={props.handleInput} required/>
</div>)
}
export default Login;
/*
 
  <div id='login'>
        <form action="">
        </form>
      </div>
*/