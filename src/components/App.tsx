import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import GlobalStyle from '../styles/globalStyles';

import Header from './Header';
import Routes from './Routes';

import useService from '../hooks/useService';
import { getCurrentUser } from '../services/users';
import { UserContext } from './context';
import { LoadingIndicator, Message } from './common';

const App: React.FC = () => {
  // add user data to global context as rarely changing data
  const { data: userData = {}, isError, isLoading, fetch } = useService(getCurrentUser);

  const getComponent = () => {
    if (isLoading) return <LoadingIndicator />;
    if (isError) return null;
    return <Routes />;
  };

  return (
    <div>
      <GlobalStyle />
      <Router>
        <UserContext.Provider value={userData}>
          <Header />
          <Message
            show={isError}
            message="ups, something went wrong, couldn't get user details"
            action={{
              txt: 'Retry',
              fn: fetch,
            }} />
          {getComponent()}
        </UserContext.Provider>
      </Router>
    </div>
  )
}

export default App
