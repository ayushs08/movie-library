import React from 'react';
import { CSSTransition } from 'react-transition-group';

import api from './api';

import Rating from './Rating';
import Loader from './Loader';
import Modal from './Modal';

import { ReactComponent as Logo } from './logo.svg';
import './App.scss';

class App extends React.Component {
  state = {
    movies: [],
    loading: false,
    page: 0,
    query: '',
    sort: 'clear',
  };

  componentDidMount() {
    this.loadMovies();
  }

  loadMovies = () => {
    this.setState({ loading: true });
    api
      .get('/movie/popular', {
        params: {
          page: this.state.page + 1,
        },
      })
      .then(res => {
        const { results, page } = res.data;
        this.setState(
          {
            movies: [...this.state.movies, ...results],
            initialMovies: [...this.state.movies, ...results],
            page,
            loading: false,
          },
          this.sort
        );
      });
  };

  handleSearch = event => {
    this.setState({ query: event.target.value }, () => {
      const { query } = this.state;
      if (query.length > 1) {
        api
          .get('/search/movie', {
            params: {
              query,
            },
          })
          .then(res => {
            const { results } = res.data;
            this.setState({ movies: results, initialMovies: results, loading: false }, this.sort);
          });
      }
    });
  };

  sort = () => {
    const { sort, movies, initialMovies } = this.state;
    const MOVIES = movies;
    if (sort === 'clear') {
      this.setState({ movies: initialMovies });
    } else {
      this.setState({ movies: MOVIES.sort((a, b) => (a[sort] < b[sort] ? 1 : -1)) });
    }
  };

  handleSort = event => {
    console.log(event.target.value);
    this.setState({ sort: event.target.value }, this.sort);
  };

  clearSearch = () => {
    this.setState({ movies: [], query: '', page: 0 }, this.loadMovies);
  };

  handleModalClose = () => {
    this.setState({ movieID: -1 });
  };

  render() {
    const { loading, movies, query, sortValue, movieID } = this.state;
    return (
      <div className="app">
        <header className="header">
          <Logo width="80" />
          <h1 className="title">Movie Library</h1>
        </header>
        <div className="search-container">
          <input type="text" className="search" placeholder="Search" value={query} onChange={this.handleSearch} />
          {query && <button className="clear fas fa-times" onClick={this.clearSearch} />}
          <select value={sortValue} className="sort" onChange={this.handleSort}>
            <option value="clear">Sort By</option>
            <option value="vote_average">Rating</option>
            <option value="release_date">Year</option>
          </select>
        </div>
        <div className="grid">
          {movies.map(movie => (
            <div className="movie-card" key={movie.id} onClick={() => this.setState({ movieID: movie.id })}>
              <img src={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`} alt="" className="movie-poster" />
              <h4 className="movie-title">{movie.title}</h4>
              <Rating rating={movie.vote_average} defaultBase={10} />
            </div>
          ))}
        </div>
        {loading ? (
          <Loader />
        ) : (
          <button className="load-more" onClick={this.loadMovies}>
            Load More
          </button>
        )}
        <CSSTransition in={movieID > -1} timeout={300} classNames="modal" unmountOnExit>
          <Modal movieID={movieID} onClose={this.handleModalClose} />
        </CSSTransition>
      </div>
    );
  }
}

export default App;
