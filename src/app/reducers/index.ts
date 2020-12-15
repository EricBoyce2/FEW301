import { ActionReducerMap, createSelector } from '@ngrx/store';
import { ProjectListItem, ProjectSummaryItem } from '../models';
import * as fromProjects from './projects.reducer';
import * as fromTodos from './todos.reducer';
export interface AppState {
  projects: fromProjects.ProjectState;
  todos: fromTodos.TodosState;
}

export const reducers: ActionReducerMap<AppState> = {
  projects: fromProjects.reducer,
  todos: fromTodos.reducer
};

// 1. If in a feature, create a featureSelector
//  note: we aren't. We are in the root app module.

// 2. Create a selector for each property off the root of the state.
const selectProjectsBranch = (state: AppState) => state.projects;
const selectTodosBranch = (state: AppState) => state.todos;
// 3. Any helpers that are used.
// look up on google (or bing) "MDN Object Destructuring"

const { selectAll: selectAllProjectsArray, selectTotal: selectProjectCount } =
  fromProjects.adapter.getSelectors(selectProjectsBranch);

const { selectAll: selectAllTodosArray } = fromTodos.adapter.getSelectors(selectTodosBranch);

// const selectAllProjectsArray = fromProjects.adapter.getSelectors(selectProjectsBranch).selectAll;
// const selectProjectCount = fromProjects.adapter.getSelectors(selectProjectsBranch).selectTotal;


// 4. What the component needs.

// TODO: ProjectListItem[]
export const selectProjectListItems = createSelector(
  selectAllProjectsArray,
  projects => projects as ProjectListItem[]
);

export const selectDashboardProjects = createSelector(
  selectAllProjectsArray,
  selectAllTodosArray,
  (projects, todos) => {
    return projects.map(p => ({
      ...p,
      count: todos.filter(t => t.project === p.id).length
    } as ProjectSummaryItem));
  }
);
