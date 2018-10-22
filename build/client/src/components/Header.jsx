import React from 'react';

class Header extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      item: []
    }
  }

  render(){
    return(
      <div id='header'>
      Header
        <div id='logo'>
        </div>
        <nav>
        </nav>
        <div className='search'>
        </div>
        <div className='profile'>
          <button onClick={this.props.openModal}>Login</button>
        </div>
      </div>
    )
  }
}

export default Header;