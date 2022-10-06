import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          learn react
          Different: We come to you from {process.env.REACT_APP_STAGE} stage and the api url is {process.env.REACT_APP_API_URL}
        </a>
      </header>
    </div>
  );
}

export default App;
