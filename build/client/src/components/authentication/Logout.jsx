import React from 'react';
import axios from 'axios';

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
      <div>You have been logged out</div>
    )
  }
}

export default Logout;