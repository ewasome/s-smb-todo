import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import GlobalStyle from '../styles/globalStyles';

import Header from './Header';
import Routes from './Routes';

import useService from '../hooks/useService';
import { getCurrentUser } from '../services/users';
import { UserContext } from './context';
import { LoadingIndicator, Message } from './common';

const App: React.FC = () => {
  // add user data to global context as both, rarely changing data and needed in many components
  const { data: userData = {}, isError, isLoading, fetch } = useService(
    getCurrentUser
  );

  // display main app functionality only for known user
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
            }}
          />
          {getComponent()}
        </UserContext.Provider>
      </Router>
    </div>
  );
};

export default App;
