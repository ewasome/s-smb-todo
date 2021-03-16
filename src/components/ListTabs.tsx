import React from 'react';
import { useHistory } from "react-router";

import ListAdd from './ListAdd';
import ListTabsItem from './ListTabsItem';

import { useService } from '../hooks/useService';
import { getTodoLists } from '../services/todos';

const ListTabs: React.FC = () => {
  console.log('>>')
  // const todoLists = Object.keys(MOCK).map((list) => ({ id: MOCK[list].id, name: MOCK[list].name }));
  const { data: todoLists = [], isError, isLoading, fetch: refetch } = useService(getTodoLists);
  const history = useHistory();

  if (isLoading) {
    return <span>loading...</span>;
  }
  if (isError) {
    return <div>ups something went wrong, try again <button type="button" onClick={refetch}>fetch</button></div>
  }

  return (
    <>
      <ul>
        {todoLists && todoLists.map(l => <li key={l.id}><ListTabsItem {...l} /></li>)}
        <ListAdd
          onAdd={({ id }) => { refetch(); history.push(`/list/${id}`) }}
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
