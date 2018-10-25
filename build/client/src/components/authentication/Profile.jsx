import React from 'react';

class Profile extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isLoggedIn: false
    }
  }
  render(){
    return(
      <div id='profile'>
        Email
        Name
        Etc.
        Coming Soon!
      </div>
    )
  }
}
export default Profile;