import { createAction, props } from '@ngrx/store';
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

export const markTodoItemCompleted = createAction(
  '[app] todo item marked completed',
  props<{ payload: TodoEntity }>()
);

export const markTodoItemIncomplete = createAction(
  '[app] todo item marked incomplete',
  props<{ payload: TodoEntity }>()
);

export const clearCompletedTodoItems = createAction(
  '[app] clear completed todo items'
);
