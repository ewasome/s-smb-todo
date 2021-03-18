import React from 'react';
import { useHistory, useParams } from 'react-router';
import styled from 'styled-components';

import { List } from '../interfaces';

import breakpoints from '../styles/breakpoints';

import { Hero, Banner, Message } from './common';
import ListAdd from './ListAdd';
import ListTabsItem from './ListTabsItem';
import startListBanner from '../assets/start-list.svg';
import selectListBanner from '../assets/select-list.svg';

import { useService } from '../hooks/useService';
import { getTodoLists } from '../services/todos';

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
  data: Pick<List, 'id' | 'name'>[] | undefined;
  isError: boolean;
  isLoading: boolean;
  fetch: () => any;
}

const ListTabs: React.FC = () => {
  // get and save already added lists, set loading/error state information
  const {
    data: todoLists = [],
    isError,
    isLoading,
    fetch: refetch,
  } = useService(getTodoLists) as getTodoListsResponse;

  // history to be used to redirect to newly created list
  const history = useHistory();

  // currently displayed list
  const { listId } = useParams<Record<string, string | undefined>>();

  const formAdd = (
    <ListAdd
      onAdd={(id) => {
        refetch();
        history.push(`/list/${id}`);
      }}
      validator={[
        // check for empty input
        {
          fn: (v) => v.length > 0,
          msg: '',
        },
        // check for too long text
        {
          fn: (v) => v.length < 50,
          msg: "Let's make it shorter",
        },
        {
          // very basic check if list name is in use, in real life code should be improved
          fn: (v) => !todoLists.some((list) => list.name === v),
          msg: 'List name already in use',
        },
      ]}
    />
  );

  // default view when there is no list created
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
      {/* display failed fetch list message */}
      <Message
        show={isError}
        message="ups, something went wrong, couldn't get list"
        action={{
          txt: 'Retry',
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
      {/* if no existing list is selected, inform banner to select one */}
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
