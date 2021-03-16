import React from 'react';
import Todo from './Todo';
import TodoAdd from './TodoAdd';

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

const ListView: React.FC = () => {
  const list = MOCK['list-1'].items;

  return (
    <div>
      <TodoAdd />
      <ul>
        {list.map((todo) => <li key={todo.id}><Todo /></li>)}
      </ul>
    </div>
  )
}

export default ListView;
