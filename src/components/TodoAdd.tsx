import React, { useState } from 'react';

const TodoAdd: React.FC = () => {
  const [text, onChange] = useState('');

  return (
    <div>
      <form>
        <input type="text" value={text} onChange={e => onChange(e.target.value)} />
        <button type="button" onClick={() => { }}>ADD TODO</button>
      </form>
    </div>
  )
}

export default TodoAdd;
