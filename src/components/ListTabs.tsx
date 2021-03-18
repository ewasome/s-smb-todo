import React from "react";
import { useHistory, useParams } from "react-router";
import styled from "styled-components";

import breakpoints from "../styles/breakpoints";

import { Hero, Banner, Message } from "./common";
import ListAdd from "./ListAdd";
import ListTabsItem from "./ListTabsItem";
import startListBanner from "url:../assets/start-list.svg";
import selectListBanner from "url:../assets/select-list.svg";

import { useService } from "../hooks/useService";
import { getTodoLists } from "../services/todos";

const Tabs = styled.ul`
  list-style: none;
  background: var(--color-white);
  margin: 0;
  padding: 2rem 3rem;
  ${breakpoints.device.m} {
    flex-wrap: wrap;
    display: flex;
  }
  ${breakpoints.device.l} {
    padding: 2rem 3rem;
  }
  ${breakpoints.device.xl} {
    padding: 2rem 6rem;
  }

  li {
    margin: 0.5rem;
  }
`;

interface getTodoListsResponse {
  data: Pick<List, "id" | "name">[] | undefined;
  isError: boolean;
  isLoading: boolean;
  fetch: () => any;
}

const ListTabs: React.FC = () => {
  const {
    data: todoLists = [],
    isError,
    isLoading,
    fetch: refetch,
  } = useService(getTodoLists) as getTodoListsResponse;
  const history = useHistory();
  const { listId } = useParams<Record<string, string | undefined>>();

  const formAdd = (
    <ListAdd
      onAdd={(id) => {
        refetch();
        history.push(`/list/${id}`);
      }}
      validator={[
        {
          fn: (v) => v.length > 0,
          msg: "",
        },
        {
          fn: (v) => v.length < 50,
          msg: "Let's make it shorter",
        },
        {
          // very basic check if list name is in use, in real life code should be improved
          fn: (v) => !todoLists.some((list) => list.name === v),
          msg: "List name already in use",
        },
      ]}
    />
  );

  if (!isLoading && !isError && !todoLists.length) {
    return (
      <Hero
        subtitle="Nothing to do?"
        text="Start by creating a new list"
        banner={<img src={startListBanner} />}
        action={formAdd}
      />
    );
  }
  return (
    <>
      <Message
        show={isError}
        message="ups, something went wrong, couldn't get list"
        action={{
          txt: "Retry",
          fn: refetch,
        }}
      />
      <Tabs>
        {todoLists &&
          todoLists.map((l) => (
            <li key={l.id}>
              <ListTabsItem {...l} onRemove={refetch} />
            </li>
          ))}
        <li>{formAdd}</li>
      </Tabs>
      {!isLoading && !todoLists.some((list) => list.id === listId) && (
        <Banner
          text="Select list to add new items"
          imageSrc={selectListBanner}
        />
      )}
    </>
  );
};

export default ListTabs;
