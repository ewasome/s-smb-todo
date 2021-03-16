import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";

import Header from './Header';
import Routes from './Routes';

const App: React.FC = () => {
  return (
    <div>
      <Router>
        <Header />
        <Routes />
      </Router>
    </div>
  )
}

export default App
