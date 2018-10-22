import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Main from './components/Main.jsx';

import {BrowserRouter, browserHistory} from 'react-router-dom';

import Modal from 'react-modal';


Modal.setAppElement('#app');

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            movies: [],
            modalIsOpen: false
        }
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    openModal() {
      this.setState({modalIsOpen: true});
    }
  
    afterOpenModal() {
      // references are now sync'd and can be accessed.
      this.subtitle.style.color = '#f00';
    }
  
    closeModal() {
      this.setState({modalIsOpen: false});
    }

    render() {
        return(
            <div>
                <Header openModal={this.openModal} afterOpenModal={this.afterOpenModal} closeModal={this.closeModal}/>
                <Main/>
                <Footer />
            </div>
        )
    }
}

ReactDOM.render((
  <BrowserRouter history={browserHistory}>
      <App />
  </BrowserRouter>
), document.getElementById('app'));