import React from 'react';
import useInputWithValidation from '../hooks/useInputWithValidation';

const TodoAdd: React.FC = ({ validator }) => {
  const [name, validation = {}, onChange] = useInputWithValidation(validator);
  const { valid, msg } = validation;

  return (
    <div>
      <form>
        <input type="text" value={name} onChange={onChange} />
        <button type="button" disabled={!valid} onClick={() => { }}>ADD LIST</button>
        {!!msg && <span>{msg}</span>}
      </form>
    </div>
  )
}

export default TodoAdd;
