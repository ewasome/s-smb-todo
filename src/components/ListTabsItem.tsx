import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useParams, useHistory } from "react-router-dom";

import breakpoints from "../styles/breakpoints";

import { useService } from "../hooks/useService";
import { removeTodoList } from "../services/todos";

import iconRemove from "url:../assets/icon-remove.svg";
import { FormMessage } from "./common";

const Tab = styled(NavLink)`
  display: flex;
  border: 2px solid var(--color-grey);
  justify-content: space-between;
  height: 3.75rem;
  border-radius: 50px;
  overflow: hidden;
  padding: 0 2rem;
  align-items: center;
  background-color: var(--color-purple-0);
  color: var(--color-black);
  ${breakpoints.device.m} {
    min-width: 16.5rem;
    max-width: 22rem;
  }

  &:hover {
    background-color: var(--color-purple-1);
  }

  &.active {
    text-decoration: none;
    background-image: linear-gradient(
      to right bottom,
      var(--color-purple-2),
      var(--color-purple-3)
    );
    color: var(--color-white);

    button {
      filter: invert(1);
    }

    &:hover {
      filter: brightness(120%);
      color: var(--color-white);
    }
  }
`;

const TabButton = styled.button`
  margin-left: 15px;

  &:hover {
    transform: scale(0.9);
  }
  img {
    width: 24px;
  }
`;

interface ListTabsItem {
  id: string;
  name: string;
  onRemove(): unknown;
}

const ListTab: React.FC<ListTabsItem> = ({ id, name, onRemove }) => {
  // currently displayed list 
  const { listId } = useParams<Record<string, string | undefined>>();
  // history to be used to redirect on list removal
  const history = useHistory();
  // get remove list action, set error state information on action
  const { isError, fetch: remove } = useService(removeTodoList, {
    lazy: true,
    args: [id],
    onCompleted: () => {
      onRemove();
      if (id === listId) {
        history.push("/");
      }
    },
  });

  // remove list handler
  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    remove();
  };

  return (
    <>
      <Tab to={`/list/${id}`}>
        <span>{name}</span>
        <TabButton onClick={onClick}>
          <img src={iconRemove} />
        </TabButton>
      </Tab>
      {/* display failed remove action message */}
      {isError && (
        <FormMessage>
          ups, something went wrong, couldn&apos;t remove list
        </FormMessage>
      )}
    </>
  );
};

export default ListTab;
