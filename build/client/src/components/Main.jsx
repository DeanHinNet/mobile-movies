import React from 'react';

import {Switch, Route} from 'react-router-dom';

import Login from './authentication/Login.jsx';
import MovieList from './movies/MovieList.jsx';

const Main = (props) => {
  return(
    <div id='main'> 
      <Switch>
        <Route exact path='/' render={()=>
              props.isLoggedIn ? <MovieList /> : <Login />}
        />
      </Switch>
    </div>
  )
}

export default Main;