import { ToDo } from './ToDo';

export interface List {
  id: string;
  name: string;
  items: Array<ToDo>;
}
