import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import breakpoints from "../styles/breakpoints";

import Todo from "./Todo";
import TodoAdd from "./TodoAdd";
import { LoadingIndicator, Message } from "./common";

import { useService } from "../hooks/useService";
import { getTodoList } from "../services/todos";

const Main = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem 3rem;
  ${breakpoints.device.m} {
    padding: 2rem 3rem;
  }
  ${breakpoints.device.l} {
    padding: 2rem 3rem;
    flex-direction: row;
  }
  ${breakpoints.device.xl} {
    padding: 2rem 6rem;
  }

  h4 {
    font-size: 2rem;
    margin: 0 0 1rem;
  }
`;

const TodoList = styled.ul`
  max-width: 37rem;
  flex: 1;
  ${breakpoints.device.l} {
    margin-top: 50px;
  }
`;

const TodoAddWrapper = styled.div`
  flex: 1;
`;

const ListView: React.FC = () => {
  const { listId } = useParams<Record<string, string | undefined>>();
  const {
    data: list = {},
    isError,
    isLoading,
    fetch: refetch,
  } = useService(getTodoList, { lazy: false, args: [listId] });
  const { items, id } = list;

  // if there is no such list in store
  if (!listId || (!isLoading && !id)) {
    return null;
  }

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <>
      <Message
        show={isError}
        message="ups, something went wrong, couldn't get list of todos"
        action={{
          txt: "Retry",
          fn: refetch,
        }}
      />
      <Main>
        <TodoAddWrapper>
          <h4>Add a new item</h4>
          <TodoAdd onAdd={refetch} />
        </TodoAddWrapper>
        <TodoList>
          {items?.map((todo: ToDo) => (
            <li key={todo.id}>
              <Todo
                onRemove={refetch}
                listId={listId}
                id={todo.id}
                details={todo}
              />
            </li>
          ))}
        </TodoList>
      </Main>
    </>
  );
};

export default ListView;
