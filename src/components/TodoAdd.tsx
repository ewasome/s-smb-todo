import React from 'react';
import useInputWithValidation from '../hooks/useInputWithValidation';

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

const TodoAdd: React.FC = () => {
  const [text, validation = {}, onChange] = useInputWithValidation(VALIDATOR);
  const { valid, msg } = validation;

  return (
    <div>
      <form>
        <input type="text" value={text} onChange={onChange} />
        <button type="button" disabled={!valid} onClick={() => { }}>ADD TODO</button>
        {!!msg && <span>{msg}</span>}
      </form>
    </div>
  );
};

export default TodoAdd;
