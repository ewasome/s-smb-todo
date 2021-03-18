import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import breakpoints from "../styles/breakpoints";

import useInputWithValidation from "../hooks/useInputWithValidation";
import { useService } from "../hooks/useService";
import { addTodo } from "../services/todos";

import { StyledButton, FormMessage } from "./common";
import { UserContext } from "./context";

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
  {
    fc: (v) => v.length > 0,
    msg: "",
  },
  {
    fc: (v) => v.length < 200,
    msg: "Whoah, your task is too long",
  },
];

const TodoAdd: React.FC = ({ onAdd }) => {
  const [text, validation = {}, onChange] = useInputWithValidation(VALIDATOR);
  const { valid, msg } = validation;

  const { listId } = useParams();
  const { id: userId } = useContext(UserContext);

  const { isError, isLoading, fetch: createTodo } = useService(addTodo, {
    lazy: true,
    onCompleted: onAdd,
    args: [text, listId, userId],
  });

  return (
    <div>
      <Form>
        <Textarea
          value={text}
          onChange={onChange}
          placeholder="Create new todo"
        />
        <Button type="button" disabled={!valid} onClick={createTodo}>
          add todo
        </Button>
      </Form>
      {!!msg && <FormMessage>{msg}</FormMessage>}
      {isError && (
        <FormMessage>something went wrong, couldn't create todo</FormMessage>
      )}
    </div>
  );
};

export default TodoAdd;
