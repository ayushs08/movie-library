import React from 'react';
import stickybits from 'stickybits';

import { ReactComponent as Logo } from './logo.svg';
import './App.scss';

class App extends React.Component {
  componentDidMount() {
    stickybits('#search', { useStickyClasses: true });
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
      </div>
    );
  }
}

export default App;
