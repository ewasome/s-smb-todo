import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';

import useInputWithValidation from '../hooks/useInputWithValidation';
import { useService } from '../hooks/useService';
import { addTodo } from '../services/todos';

import UserContext from './UserContext';

const VALIDATOR = [
  {
    fc: v => v.length > 0,
    msg: '',
  },
  {
    fc: v => v.length < 100,
    msg: 'Whoah, your task is too long',
  },
];

const TodoAdd: React.FC = ({ onAdd }) => {
  const [text, validation = {}, onChange] = useInputWithValidation(VALIDATOR);
  const { valid, msg } = validation;

  const { listId } = useParams();
  const { id: userId } = useContext(UserContext);

  const { isError, isLoading, fetch: createTodo } = useService(addTodo, {
    lazy: true,
    onCompleted: onAdd,
    args: [text, listId, userId],
  });

  return (
    <div>
      <form>
        <input type="text" value={text} onChange={onChange} />
        <button type="button" disabled={!valid} onClick={createTodo}>ADD TODO</button>
        {!!msg && <span>{msg}</span>}
      </form>
      {isError && <div>something went wrong</div>}
    </div>
  );
};

export default TodoAdd;
