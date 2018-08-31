import * as React from 'react';
import './App.css';
import img from './image/img.jpg';

import logo from './logo.svg';

class App extends React.Component {
  public componentDidMount() {
    window.addEventListener('online', () => {
      console.log('online');
        if (navigator.serviceWorker.controller) {
          navigator.serviceWorker.controller.postMessage({online: true});
        }
      });
    window.addEventListener('offline', () => {
      console.log('offline');
      if (navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({ online: false });
      }
    });
  }
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        <i className="fas fa-allergies" />
        <div>
          <img src={img} alt=""/>
        </div>
      </div>
    );
  }
}

export default App;
