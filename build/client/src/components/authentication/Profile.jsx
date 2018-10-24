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
      <div>
        Email
        Name
        Etc.
      </div>
    )
  }
}
export default Profile;