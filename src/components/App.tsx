import React from 'react';
import Header from './Header';
import ListTabs from './ListTabs';
import ListView from './ListView';

const App: React.FC = () => {
  return (
    <div>
      <Header />
      <ListTabs />
      <ListView />
    </div>
  )
}

export default App
