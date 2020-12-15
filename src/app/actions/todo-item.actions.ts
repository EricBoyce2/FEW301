import { createAction } from '@ngrx/store';
import { TodoItemCreate } from '../models';
import { TodoEntity } from '../reducers/todos.reducer';

let fakeId = 1;

export const todoItemAdded = createAction(
  '[app] todo item added',
  ({ item }: { item: TodoItemCreate }) => ({
    payload: {
      ...item,
      id: 'T' + fakeId++
    } as TodoEntity
  })
);
