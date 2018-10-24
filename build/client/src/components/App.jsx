import React from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Main from './Main.jsx';

import Modal from 'react-modal';

import Login from './authentication/Login.jsx';
import axios from 'axios';
import { instanceOf } from 'prop-types';

import { withCookies, Cookies } from 'react-cookie';

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

Modal.setAppElement(document.getElementById('app'));


class App extends React.Component {

    static propTypes = {
      cookies: instanceOf(Cookies).isRequired
    };

    constructor(props){
        super(props);
        
        this.state = {
            modalIsOpen: false,
            isLoggedIn: this.props.cookies.get('name') || false,
        }
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.userLogin = this.userLogin.bind(this);
        this.userLogout = this.userLogout.bind(this);
    }
    handleInput(){
      this.props.userLogin();
    }
  
    openModal() {
      console.log('open modal')
      this.setState({modalIsOpen: true});
    }
  
    afterOpenModal() {
      // references are now sync'd and can be accessed.
      // this.subtitle.style.color = '#f00';
    }
  
    closeModal() {
      this.setState({modalIsOpen: false});
    }
    userLogin(credentials){
      //verify with server first than set
  
      credentials = {
        email: 'user@home.com',
        password: 'passwordX'
      };

      axios.post('/login', credentials)
      .then( (results) => {
        console.log('results', results);
        if(results.data.token){
          //set cookies
          console.log('movieLoggedIn', results.data);
          this.props.cookies.set('movieLoggedIn', results.data, {
            path: '/',
            maxAge: 30,
          });
          this.setState({name: results.data.name});

        } else {
          //no a valid login
        }
      })
      .catch( err => {
        console.error('error');
      })

      // this.props.cookies.set('token', 'blue', {
      //   path: '/',
      //   maxAge: 30,
      // });
      // this.setState({name}) 
      // console.log('new cookies set', this.props.cookies.get('name'));
    }

    userLogout(){
      //verify with server first than set
      this.props.cookies.remove('name');
      this.setState({isLoggedIn: false}) 
      console.log('new cookies set', this.props.cookies.get('name'));
    }
    render() {
        return(
            <div>  
              <Header 
                cookies={this.props.cookies} 
                openModal={this.openModal} 
                afterOpenModal={this.afterOpenModal} 
                closeModal={this.closeModal}
              />
              <Main 
                isLoggedIn={this.state.isLoggedIn} 
                cookies={this.props.cookies} 
                userLogin={this.userLogin}
              />
              <Footer />
              <Modal
                isOpen={this.state.modalIsOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                style={customStyles}
                contentLabel="Example Modal"
              >
               <Login />
               <button onClick={this.closeModal}>close</button>
              </Modal>
            </div>
        )
    }
}

export default withCookies(App);