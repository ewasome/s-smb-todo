import React, { useContext } from 'react';
import styled from 'styled-components';

import { ToDo, User } from '../interfaces';

import { toggleTodoStatus, removeTodo } from '../services/todos';
import { getUserDetails } from '../services/users';
import { useService } from '../hooks/useService';

import iconRemove from '../assets/icon-remove.svg';
import { UserContext } from './context';
import { FormMessage } from './common';

interface TodoContainerProps {
  highlighted: boolean;
}

const TodoContainer = styled.div<TodoContainerProps>`
  width: auto;
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: auto 1fr auto;
  box-shadow: 0 1px 3px 0 #0000001a, 0 1px 2px 0 #0000000f;
  background-color: ${(props) =>
    props.highlighted ? 'var(--color-purple-0)' : 'var(--color-white)'};
  border-color: #e5e7eb;
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 20px;
`;

const RemoveButton = styled.button`
  justify-self: end;
  &:hover {
    transform: scale(0.9);
  }
  img {
    width: 24px;
  }
`;

const AuthorAvatar = styled.span`
  display: flex;
  grid-column-start: 3;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  line-height: 3rem;
  border: 5px solid;
  border-radius: 50%;
  font-size: 1.1rem;
  font-weight: bold;
  letter-spacing: 2px;
  color: var(--color-green);
  border-color: var(--color-green);
`;

const Text = styled.p`
  font-size: 0.9rem;
`;

interface CheckboxProps {
  checked: boolean;
}

const Checkbox = styled.div<CheckboxProps>`
position: relative;
display: flex;
align-items: center;

input {
  position: absolute;
  transform: translateY(-50%);
  top: 50%;
  left: 3px;
  opacity: 0.0001;
  height: 22px;
  width: 22px;
  z-index: 2;
  margin: 0;
  cursor: pointer;
}

span {
  content: '';
  display: flex;
  align-items: center;
  justify-content: center;
  height: 22px;
  width: 22px;
  border-width: 3px;
  border-style: solid;
  border-color: var(--color-purple-2);
  text-align: center;
  color: var(--color-black);
  background-color: var(--color-white);

  &:before {
    content: '✓';
    display: inline-block;
    color: var(--color-purple-2);
    position: absolute;
    font-size: 22px;
    width: 100%;
    opacity: ${(props) => (props.checked ? '1' : '0')};
  }
  }
}
`;

interface TodoProps {
  listId: string;
  id: string;
  details: ToDo;
  onRemove(): any;
}

const Todo: React.FC<TodoProps> = ({ listId, id, details, onRemove }) => {
  // get 'logged in' user to highlight todos assigned to them
  const { id: userId } = useContext(UserContext) as User;

  // get change todo complete status action, set error state information on action
  const {
    data = details,
    isError: isErrorOnStatusChange,
    fetch: changeStatus,
  } = useService(toggleTodoStatus, { lazy: true, args: [id, listId] });
  const { description, assignee, completed } = data;

  // get remove todo action, set error state information on action
  const { isError: isErrorOnRemove, fetch: remove } = useService(removeTodo, {
    lazy: true,
    args: [id, listId],
    onCompleted: onRemove,
  });

  // get more details about assigned user, set loading/error state information
  const {
    data: user = {},
    isError: isErrorOnUser,
    isLoading: isLoadingOnUser,
  } = useService(getUserDetails, { lazy: false, args: [assignee] });

  // initials to be used for avatar
  const displayAuthor = user?.name
    ?.split(' ')
    .map((part: string) => part.charAt(0))
    .join('');

  // wait for user data to prevent ui change
  if (isLoadingOnUser) {
    return null;
  }

  return (
    <>
      <TodoContainer highlighted={userId === user.id}>
        <Checkbox checked={completed}>
          <input type="checkbox" checked={completed} onChange={changeStatus} />
          <span />
        </Checkbox>
        <Text>{description}</Text>
        <RemoveButton type="button" onClick={remove}>
          <img src={iconRemove} />
        </RemoveButton>
        {!isErrorOnUser && <AuthorAvatar>{displayAuthor}</AuthorAvatar>}
      </TodoContainer>
      {/* display failed remove action message */}
      {isErrorOnRemove && (
        <FormMessage>
          something went wrong, couldn&apos;t remove Todo
        </FormMessage>
      )}
      {/* display failed change status action message */}
      {isErrorOnStatusChange && (
        <FormMessage>
          something went wrong, couldn&apos;t change Todo status
        </FormMessage>
      )}
    </>
  );
};

export default Todo;
