import React from 'react';
import axios from 'axios';

class Main extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      movies: []
    };
  }
  componentDidMount(){
    axios.get('/api/movies')
    .then((results)=> {
      this.setState({
        movies: results.data.films.film
      })
    })  
    .catch((err)=> {
      console.error(err);
    })
  }
  render(){
    return(
      <div id='movie-list'> 
        {this.state.movies.map((movie)=>{
          return (
            <div className='movie-info'>
              <img className='movie-art' src={movie.images.image[0].src} />
              <h3 className="movie-title">{movie.title}</h3>
            </div>
          )
        })}
      </div>
    )
  }
}

export default Main;