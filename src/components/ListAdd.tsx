import React from 'react';
import styled from 'styled-components';

import breakpoints from '../styles/breakpoints';

import { InputValidator } from '../interfaces';

import useInputWithValidation from '../hooks/useStateWithValidation';
import { useService } from '../hooks/useService';
import { addTodoList } from '../services/todos';

import { StyledButton, FormMessage } from './common';

const Form = styled.form`
  width: 100%;
  display: flex;
  border: 2px solid var(--color-grey);
  background-color: var(--color-white);
  justify-content: space-between;
  height: 3.75rem;
  border-radius: 50px;
  overflow: hidden;
  margin-bottom: 1rem;
  ${breakpoints.device.m} {
    max-width: 28rem;
  }
`;

const FormInput = styled.input`
  flex-grow: 1;
  border: none;
  padding: 0 2rem;
  font-size: 1rem;
  &:focus {
    outline: none;
  }
`;

interface ListAddProps {
  onAdd(...args: unknown[]): unknown;
  validator: InputValidator[];
}

const ListAdd: React.FC<ListAddProps> = ({ onAdd, validator }) => {
  // set input value and validation state, get onChange handler
  const [name, setName, validation] = useInputWithValidation(validator);
  const { valid, msg } = validation;

  // get create list action, set loading/error state information on action
  const { isError, isLoading, fetch: createList } = useService(addTodoList, {
    lazy: true,
    onCompleted: ({ id }) => {
      onAdd(id);
      setName('');
    },
    args: [name],
  });

  // create new list handler
  const onClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
    createList();
  };

  // input change handler
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <div>
      <Form>
        <FormInput
          placeholder="Create new list"
          type="text"
          value={name}
          onChange={onInputChange}
        />
        <StyledButton
          type="submit"
          disabled={!valid && !isLoading}
          onClick={onClick}
          onSubmit={onClick}
        >
          add
        </StyledButton>
      </Form>
      {/* display failed validation message */}
      {!!msg && <FormMessage>{msg}</FormMessage>}
      {/* display failed create action message */}
      {!!isError && (
        <FormMessage>
          ups, something went wrong, couldn&apos;t create list
        </FormMessage>
      )}
    </div>
  );
};

export default ListAdd;
