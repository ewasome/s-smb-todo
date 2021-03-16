import React from 'react';

import useInputWithValidation from '../hooks/useInputWithValidation';
import { useLazyService } from '../hooks/useLazyService';

import { addTodoList } from '../services/todos';

const TodoAdd: React.FC = ({ onAdd, validator }) => {
  const [name, validation = {}, onChange] = useInputWithValidation(validator);
  const { valid, msg } = validation;

  const { isError, isLoading = false, fetch: createList } = useLazyService(addTodoList, {
    lazy: true,
    onCompleted: onAdd,
    args: [name],
  });

  return (
    <div>
      <form>
        <input type="text" value={name} onChange={onChange} />
        <button type="button" disabled={!valid} onClick={createList}>ADD LIST</button>
        {!!msg && <span>{msg}</span>}
      </form>
      {isError && <div>something went wrong</div>}
    </div>
  )
}

export default TodoAdd;
