import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, Action, on } from '@ngrx/store';
import * as actions from '../actions/todo-item.actions';

export interface TodoEntity {
  id: string;
  name: string;
  project?: string;
  dueDate?: string;
  completed: boolean;
}

export interface TodosState extends EntityState<TodoEntity> {

}

export const adapter = createEntityAdapter<TodoEntity>();

const initialState = adapter.getInitialState();

const reducerFunction = createReducer(
  initialState,
  on(actions.todoItemAddedSuccessfully, (state, action) => {
    const tempState = adapter.removeOne(action.oldId, state);
    return adapter.addOne(action.payload, tempState);
  }),
  on(actions.todoItemAddedFailure, (s, a) => adapter.removeOne(a.payload.id, s)),
  on(actions.loadTodos, actions.loadTodosFailed, () => initialState),
  on(actions.loadTodosSucceeded, (state, action) => adapter.setAll(action.payload, state)),
  on(actions.todoItemAdded, (state, action) => adapter.addOne(action.payload, state)),
  on(actions.markTodoItemCompleted, actions.markTodoItemIncomplete, (state, action) => adapter.updateOne(
    {
      id: action.payload.id,
      changes: {
        completed: !action.payload.completed
      }
    }, state
  )),
  on(actions.clearCompletedTodoItems, (state) => {
    const ids = state.ids as string[];
    const completedIds = ids
      .map(id => state.entities[id])
      .filter(t => t.completed)
      .map(t => t.id);
    return adapter.removeMany(completedIds, state);
  })
);

export function reducer(state: TodosState = initialState, action: Action): TodosState {
  return reducerFunction(state, action);
}
