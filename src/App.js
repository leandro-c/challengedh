import React from 'react';
/* import logo from './logo.svg'; */
import logo from './logo-DH.png'
import { Answers } from './features/answerform/Answers';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
        <Answers/>
    </div>
  );
}

export default App;
