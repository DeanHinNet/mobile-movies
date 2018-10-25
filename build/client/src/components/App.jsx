import React from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Main from './Main.jsx';

import Modal from 'react-modal';

import Login from './authentication/Login.jsx';
import axios from 'axios';
import { instanceOf } from 'prop-types';

import { withCookies } from 'react-cookie';

import Cookies from 'universal-cookie'

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
            isLoggedIn: this.props.cookies.get('movieLoggedIn') || false,
            first_name: this.props.cookies.get('first_name') || '',
            response: {
              message: '',
              status: 0
            }
        }
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.userRegister = this.userRegister.bind(this);
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
    userRegister(credentials){
      //verify with server first than set

      axios.post('/register', credentials)
      .then( (results) => {
        if(results.data.token){
          //set cookies
          console.log('results', results);
          this.props.cookies.set('movieLoggedIn', results.data.token, {
            path: '/',
            expires: new Date(Date.now() + 86400000)
          });
          this.closeModal();
          this.setState({
            first_name: results.data.first_name,
            isLoggedIn: true,
            response: {
              message: results.data.message,
              status: results.data.status
            }
          });

        } else {
          //no a valid login
        }
      })
      .catch( (err) => {
        console.log('error', err.response);
        this.setState({
          response: {
            message: err.response.data.message,
            status: err.response.data.status
          }
        })
      })
    }

    userLogin(credentials){
      //verify with server first than set

      axios.post('/login', credentials)
      .then( (results) => {
        if(results.data.token){
          //set cookies
          console.log('results', results);
          this.props.cookies.set('movieLoggedIn', results.data.token, {
            path: '/',
            expires: new Date(Date.now() + 86400000),
          });
          this.props.cookies.set('first_name', results.data.first_name, {
            path: '/',
            expires: new Date(Date.now() + 86400000),
          });
          this.closeModal();
          this.setState({
            first_name: results.data.name,
            isLoggedIn: true,
            response: {
              message: results.data.message,
              status: results.data.status
            }
          });

        } else {
          //no a valid login
        }
      })
      .catch( (err) => {
        console.log('error', err.response);
        this.setState({
          response: {
            message: err.response.data.message,
            status: err.response.data.status
          }
        })
      })
    }

    userLogout(){
      //verify with server first than set
      console.log('loggin out function');
      this.props.cookies.remove('movieLoggedIn');
      this.props.cookies.remove('first_name');
      this.setState({isLoggedIn: false}) 
      console.log('loggin out', this.props.cookies.get('movieLoggedIn'));
    }
    render() {
        return(
            <div id='spa'>  
              <Header 
                cookies={this.props.cookies} 
                openModal={this.openModal} 
                afterOpenModal={this.afterOpenModal} 
                closeModal={this.closeModal}
                isLoggedIn={this.state.isLoggedIn}
                userLogin={this.userLogin}
                userLogout={this.userLogout}
                userRegister={this.userRegister}
                first_name={this.state.first_name}
              />
              <Main 
                isLoggedIn={this.state.isLoggedIn} 
                cookies={this.props.cookies} 
                userRegister={this.userRegister}
                userLogin={this.userLogin}
                userLogout={this.userLogout}
                response={this.state.response}
              />
              <Footer />
              <Modal
                isOpen={this.state.modalIsOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                style={customStyles}
                contentLabel="Example Modal"
              > 
               <button onClick={this.closeModal}>Close</button>
               <Login userLogin={this.userLogin} response={this.state.response}/>
              </Modal>
            </div>
        )
    }
}

export default withCookies(App);