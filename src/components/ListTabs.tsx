import React from 'react';

import ListAdd from './ListAdd';
import ListTabsItem from './ListTabsItem';

const MOCK = {
  'list-1': {
    id: 'list-1',
    name: 'List 1',
    items: [
      {
        id: 'todo-1',
        name: 'Todo 1',
        assignee: 'user-id-1',
        completed: true,
      },
      {
        id: 'todo-2',
        name: 'Todo 2',
        assignee: 'user-id-1',
        completed: true,
      },
      {
        id: 'todo-3',
        name: 'Todo 3',
        assignee: 'user-id-1',
        completed: true,
      },
    ],
  },
};

const ListTabs: React.FC = () => {
  const todoLists = Object.keys(MOCK).map((list) => ({ id: MOCK[list].id, name: MOCK[list].name }));

  return (
    <>
      <ul>
        {todoLists.map(l => <li key={l.id}><ListTabsItem {...l} /></li>)}
        <ListAdd />
      </ul>
    </>
  )
}

export default ListTabs;
