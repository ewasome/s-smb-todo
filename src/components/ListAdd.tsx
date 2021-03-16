import React, { useState } from 'react';

const TodoAdd: React.FC = () => {
  const [name, onChange] = useState('');

  return (
    <div>
      <form>
        <input type="text" value={name} onChange={e => onChange(e.target.value)} />
        <button type="button" onClick={() => { }}>ADD LIST</button>
      </form>
    </div>
  )
}

export default TodoAdd;
