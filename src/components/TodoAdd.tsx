import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { User } from '../interfaces';

import breakpoints from '../styles/breakpoints';

import useInputWithValidation from '../hooks/useStateWithValidation';
import { useService } from '../hooks/useService';
import { addTodo } from '../services/todos';

import { StyledButton, FormMessage } from './common';
import { UserContext } from './context';

const Form = styled.form`
  display: flex;
  border: 2px solid var(--color-grey);
  background-color: var(--color-white);
  justify-content: space-between;
  border-radius: 50px;
  overflow: hidden;
  position: relative;
  min-height: 12.5rem;
  margin: 0 1rem 1rem 0;

  ${breakpoints.device.m} {
    max-width: 37rem;
  }
`;

const Button = styled(StyledButton)`
  border-top-right-radius: 0;
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 1;
`;

const Textarea = styled.textarea`
  flex-grow: 1;
  border: none;
  padding: 0 30px;
  margin: 2rem 0 4.5rem;
  font-size: 1rem;
  font-family: inherit;
  resize: none;
  overflow-y: scroll;
  &:focus {
    outline: none;
  }
`;

const VALIDATOR = [
  // check for empty input
  {
    fn: (v: string) => v.length > 0,
    msg: '',
  },
  // check for too long text
  {
    fn: (v: string) => v.length < 200,
    msg: 'Whoah, your task description is too long',
  },
];

interface TodoAddProps {
  onAdd(...args: any): any;
}

const TodoAdd: React.FC<TodoAddProps> = ({ onAdd }) => {
  // set input value and validation state, get onChange handler
  const [text, setText, validation] = useInputWithValidation(VALIDATOR);
  const { valid, msg } = validation;

  // currently displayed list
  const { listId } = useParams<Record<string, string | undefined>>();
  // currently 'logged in' user
  const { id: userId } = useContext(UserContext) as User;

  // get create todo action, set loading/error state information on action
  const { isError, isLoading, fetch: createTodo } = useService(addTodo, {
    lazy: true,
    onCompleted: ({ id }) => {
      onAdd(id);
      setText('');
    },
    args: [text, listId, userId],
  });

  // input change handler
  const onInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  return (
    <div>
      <Form>
        <Textarea
          value={text}
          onChange={onInputChange}
          placeholder="Create new todo"
        />
        <Button
          type="button"
          disabled={!valid && !isLoading}
          onClick={createTodo}
        >
          add todo
        </Button>
      </Form>
      {/* display failed validation message */}
      {!!msg && <FormMessage>{msg}</FormMessage>}
      {/* display failed create action message */}
      {isError && (
        <FormMessage>
          something went wrong, couldn&apos;t create todo
        </FormMessage>
      )}
    </div>
  );
};

export default TodoAdd;
