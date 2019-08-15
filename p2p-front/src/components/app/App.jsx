import React from 'react';
import Router from '../router/Router';
import './App.css';
import Header from '../header/Header';

function App() {
  return (
    <div className='app'>
      <Header />
      <Router />
    </div>
  );
}

export default App;
