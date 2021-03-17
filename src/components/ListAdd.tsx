import React from 'react';
import styled from "styled-components";

import breakpoints from '../styles/breakpoints';

import useInputWithValidation from '../hooks/useInputWithValidation';
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

const ListAdd: React.FC = ({ onAdd, validator }) => {
  const [name, validation = {}, onChange] = useInputWithValidation(validator);
  const { valid, msg } = validation;

  const { isError, isLoading, fetch: createList } = useService(addTodoList, {
    lazy: true,
    onCompleted: onAdd,
    args: [name],
  });

  const onClick = (e) => { e.preventDefault(); createList() };

  return (
    <div>
      <Form>
        <FormInput placeholder="Create new list" type="text" value={name} onChange={onChange} />
        <StyledButton type="submit" disabled={!valid && !isLoading} onClick={onClick} onSubmit={onClick}>add</StyledButton>
      </Form>
      {!!msg && <FormMessage>{msg}</FormMessage>}
      {!!isError && <FormMessage>ups, something went wrong, couldn't create list</FormMessage>}
    </div>
  )
}

export default ListAdd;
