import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import breakpoints from "../styles/breakpoints";

import useInputWithValidation from "../hooks/useStateWithValidation";
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
    fn: (v: string) => v.length > 0,
    msg: "",
  },
  {
    fn: (v: string) => v.length < 200,
    msg: "Whoah, your task is too long",
  },
];

interface TodoAddProps {
  onAdd(...args: any): any;
}

const TodoAdd: React.FC<TodoAddProps> = ({ onAdd }) => {
  const [text, setText, validation] = useInputWithValidation(VALIDATOR);
  const { valid, msg } = validation;

  const { listId } = useParams<Record<string, string | undefined>>();
  const { id: userId } = useContext(UserContext) as User;

  const { isError, isLoading, fetch: createTodo } = useService(addTodo, {
    lazy: true,
    onCompleted: ({ id }) => {
      onAdd(id);
      setText("");
    },
    args: [text, listId, userId],
  });

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
      {!!msg && <FormMessage>{msg}</FormMessage>}
      {isError && (
        <FormMessage>
          something went wrong, couldn&apos;t create todo
        </FormMessage>
      )}
    </div>
  );
};

export default TodoAdd;
