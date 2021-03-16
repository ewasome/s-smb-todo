import React from 'react'
import { NavLink } from 'react-router-dom';

const ListTab: React.FC = ({ id, name }) => {
  return (
    <div>
      <NavLink to={`/list/${id}`}>{name}</NavLink>
      <button onClick={() => { }}>remove</button>
    </div>
  )
}

export default ListTab;
