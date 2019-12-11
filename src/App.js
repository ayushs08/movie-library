import React from 'react';

import api from './api';

import Rating from './Rating';

import { ReactComponent as Logo } from './logo.svg';
import './App.scss';

class App extends React.Component {
  state = {
    movies: [],
  };

  componentDidMount() {
    api.get('popular').then(res => {
      const { results, page } = res.data;
      this.setState({ movies: results, page });
    });
  }

  render() {
    return (
      <div className="app">
        <header className="header">
          <Logo width="80" />
          <h1 className="title">Movie Library</h1>
        </header>
        <form id="search" className="search-container">
          <input type="text" className="search" placeholder="Search" />
          <button type="submit" className="submit">
            <i className="fas fa-search" />
          </button>
        </form>
        <div className="grid">
          {this.state.movies.map(movie => (
            <div className="movie-card" key={movie.id}>
              <img src={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`} alt="" className="movie-poster" />
              <h4 className="movie-title">{movie.title}</h4>
              <Rating rating={movie.vote_average} defaultBase={10} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
