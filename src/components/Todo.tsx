import React from 'react';

const MOCK = {
  id: 'todo-1',
  text: 'Todo 1',
  assignee: 'user-id-1',
  completed: true,
};

const Todo: React.FC = () => {
  return (
    <div>
      <input
        type="checkbox"
        checked={MOCK.completed}
        onChange={() => { }}
      />
      <span>{MOCK.text}</span>
      <span>author: {MOCK.assignee}</span>
      <button type="button" onClick={() => { }}>delete</button>
    </div>
  )
}

export default Todo;
