import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class Logout extends React.Component {
  constructor(){
    super();
    this.state = {

    }
  }
  componentDidMount(){
    //logout
    console.log('loggin user out');
    this.props.userLogout();    
  }
  render(){
    return(
      <div>You have been logged out
         <Redirect to="/" />
      </div>
     
    )
  }
}

export default Logout;