import React from 'react';
import validator from 'validator';

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      modalIsOpen: false,
      isLoggedin: this.props.isLoggedIn,
      signup: false,
      errors: [],
      first_name: '',
      last_name: '',
      email: '',
      password: ''
    }
   this.handleInput = this.handleInput.bind(this);
   this.handleSubmit = this.handleSubmit.bind(this);
   this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e){
    if(e.target.name === 'signup'){
      this.setState({ signup: true })
    } else {
      this.setState({ signup: false })
    }
  }

  handleInput(e){
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit(e){
    e.preventDefault();
    //Validate user input
    const selection = e.target.name;
    let inValid = false;
    let errors = [];

    //Reset errors
    this.setState({
      errors: []
    }, () => {
      //Check if email is valid.
      if(!validator.isEmail(this.state.email)){
        inValid = true;
        errors.push('Email is not valid.');
      }

      //Check if password is long enough
      // if(this.state.password.length < 8){
      //   inValid = true;
      //   errors.push('Password must be 8 characters or longer.')
      // }

      if(!inValid){
        if(selection === 'login'){
          this.props.userLogin({
            email: this.state.email,
            password: this.state.password
          })
        } else {
          if(this.state.first_name === ''){
            inValid = true;
            errors.push('First name cannot be blank.')
          }
          if(!inValid){
            this.props.userRegister({
              first_name: this.state.first_name,
              last_name: this.state.first_name,
              email: this.state.email,
              password: this.state.password
            });
          } else {
            //Send back errors
            this.setState({ errors: errors })
          }
        }
      } else {
        //Send back errors
        this.setState({ errors: errors })
      }
    })
  }
  
  render(){
    return(  
      <div id='login-form'>
        <form>
          <a href='#' name='login' onClick={this.handleClick}>Log In</a> | 
          <a href='#' name='signup' onClick={this.handleClick}>Sign Up</a>

          {this.state.signup ? 
          <Signup handleInput={this.handleInput} name={this.state.name}/> : ''}

          <div id='input-email'>
            <label htmlFor="email">Email</label>
            <input id='email' name='email' placeholder='bob@home.com' type='text' value={this.state.email} onChange={this.handleInput} required/>
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input id='password' name='password' placeholder='********' type='password' value={this.state.password} onChange={this.handleInput} required/>
          </div>

          {this.state.signup ? 
          <button name='register' onClick={this.handleSubmit}>Signup</button> : <button name='login' onClick={this.handleSubmit}>Login</button>}

          <p id='response'>
            {this.props.response.status === 0 || 
            this.props.response.status === 201 ? 
            '' : this.props.response.message}
          </p>

          <ul id='display-errors'>
            {this.state.errors.map((error)=>{
              return(
                <li>{error}</li>)
            })}
          </ul>

        </form>
      </div>
    )
  }
}

const Signup = (props) => {
  return( 
  <div id='input-name'>
    <div>
      <label htmlFor='first_name'>First Name</label>
      <input name='first_name' placeholder='Bob' type='text' value={props.first_name} onChange={props.handleInput} required/>
    </div>
    <div>
      <label htmlFor="last_name">Last Name</label>
      <input name='last_name' placeholder='Pants' type='text' value={props.last_name} onChange={props.handleInput} required/>
    </div>
  </div>)
}

export default Login;
