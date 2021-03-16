import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";

import Header from './Header';
import Routes from './Routes';

import useService from '../hooks/useService';
import { getCurrentUser } from '../services/users';
import UserContext from './UserContext';

const App: React.FC = () => {
  // add user data to global context as rarely changing data
  const { data: userData = {}, isError, isLoading, fetch } = useService(getCurrentUser);

  const getComponent = () => {
    // if (isLoading) return <span>loading</span>;
    // if (isError) return (
    //   <div>
    //     ups, something went wrong
    //     <button onClick={fetch}>fetch</button>
    //   </div>
    // )
    return <Routes />;
  };

  return (
    <div>
      <Router>
        <UserContext.Provider value={userData}>
          <Header />
          {getComponent()}
        </UserContext.Provider>
      </Router>
    </div>
  )
}

export default App
