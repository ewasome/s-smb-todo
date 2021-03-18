import LS from "../utils/localStorage";
import { v4 as generateId } from "uuid";

import { List, ToDo } from '../interfaces';

const STATE_KEY = "app.state";

// local storage API in Promise format to fake real connection with backend

export function getTodoLists(): Promise<Pick<List, "id" | "name">[]> {
  try {
    const state = LS.get(STATE_KEY);
    const lists = Object.keys(state).map((list) => ({
      name: state[list].name,
      id: list,
    }));

    return Promise.resolve(lists);
  } catch (err) {
    return Promise.reject(err);
  }
}

export function addTodoList(name: string): Promise<List> {
  try {
    const state = LS.get(STATE_KEY);
    const id = name.toLowerCase().trim().split(" ").join("-");
    const newList = { id, name, items: [] };
    LS.set(STATE_KEY, { ...state, [id]: newList });

    return Promise.resolve(newList);
  } catch (err) {
    return Promise.reject(err);
  }
}

export function removeTodoList(id: string): Promise<string> {
  try {
    const state = LS.get(STATE_KEY);
    const newState = Object.keys(state).reduce((acc, key) => {
      return id === key ? { ...acc } : { ...acc, [key]: state[key] };
    }, {});
    LS.set(STATE_KEY, newState);

    return Promise.resolve(id);
  } catch (err) {
    return Promise.reject(err);
  }
}

export function getTodoList(listId: string): Promise<List> {
  try {
    const state = LS.get(STATE_KEY);
    return Promise.resolve(state[listId]);
  } catch (err) {
    return Promise.reject(err);
  }
}

export function addTodo(
  text: string,
  listId: string,
  assigneeId: number
): Promise<ToDo> {
  try {
    const state = LS.get(STATE_KEY);
    const newItem = {
      id: generateId(),
      description: text,
      assignee: assigneeId,
      completed: false,
    };
    const newItems = [...state[listId].items, newItem];
    const newState = {
      ...state,
      [listId]: { ...state[listId], items: newItems },
    };

    LS.update(STATE_KEY, newState);

    return Promise.resolve(newItem);
  } catch (err) {
    return Promise.reject(err);
  }
}

export function toggleTodoStatus(id: string, listId: string): Promise<ToDo> {
  try {
    const state = LS.get(STATE_KEY);
    const items = state[listId].items;
    const item = items.find((item) => item.id === id);
    if (!item) {
      throw new Error(`Cannot find todo with id: ${id}`);
    }
    const changedItem = { ...item, completed: !item.completed };
    const newItems = items.map((item) => (item.id === id ? changedItem : item));
    const newState = {
      ...state,
      [listId]: { ...state[listId], items: newItems },
    };
    LS.set(STATE_KEY, newState);

    return Promise.resolve(changedItem);
  } catch (err) {
    return Promise.reject(err);
  }
}

export function removeTodo(id: string, listId: string): Promise<string> {
  try {
    const state = LS.get(STATE_KEY);
    const items = state[listId].items;
    const newItems = items.filter((item) => item.id !== id);
    const newState = {
      ...state,
      [listId]: { ...state[listId], items: newItems },
    };
    LS.set(STATE_KEY, newState);

    return Promise.resolve(id);
  } catch (err) {
    return Promise.reject(err);
  }
}
