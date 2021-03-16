import React from 'react';
import { useParams } from 'react-router-dom';

import Todo from './Todo';
import TodoAdd from './TodoAdd';

import { useService } from '../hooks/useService';
import { getTodosFromList } from '../services/todos';

const ListView: React.FC = () => {
  const { listId } = useParams();
  const { data: list = [], isError, isLoading, fetch: refetch } = useService(getTodosFromList, { lazy: false, args: [listId] });

  if (isLoading) {
    return <span>loading...</span>;
  }
  if (isError) {
    return <div>ups something went wrong, try again <button type="button" onClick={refetch}>fetch</button></div>
  }

  return (
    <div>
      <TodoAdd onAdd={refetch} />
      <ul>
        {list.map((todo) => <li key={todo.id}><Todo /></li>)}
      </ul>
    </div>
  )
}

export default ListView;
