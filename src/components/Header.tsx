import React from 'react';

const Header: React.FC = () => {
  const user = { name: 'John Smith' };
  return (
    <div>
      <h1>React Code Test</h1>
      {/* display placeholder if user data can't be retrieved */}
      {!user
        ? <span>placeholder</span>
        : <span>{user.name}</span>
      }
    </div>
  )
}

export default Header;
