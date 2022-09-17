// import logo from './logo.svg';
import React, { Fragment } from 'react';
import './App.css';

// components
import Query from "./components/Query";
// import Response from './components/Response';

function App() {
  return (
    <Fragment>
      <div className="container">
        <Query />
        {/* <Response /> */}
      </div>
    </Fragment>
  );
}

export default App;