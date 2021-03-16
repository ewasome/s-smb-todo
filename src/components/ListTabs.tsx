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
        <ListAdd
          validator={[
            {
              fc: v => v.length > 0,
              msg: '',
            },
            {
              fc: v => v.length < 100,
              msg: "Let's make it shorter",
            },
            {
              // very basic check if list name is in use, in real life code should be improved
              fc: v => !todoLists.some(list => list.name === v),
              msg: 'Seems you all like this list name very much, but please, use another',
            },
          ]}
        />
      </ul>
    </>
  )
}

export default ListTabs;
