import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import * as actions from '../actions/todo-item.actions';
import { loginSucceeded } from '../actions/auth.actions';
import { ProjectEntity } from '../reducers/projects.reducer';
import { ProjectDataService } from '../services/todos.dataservice';
import { TodosDataService } from '../services/projects.dataservice';

@Injectable()
export class TodoEffects {

  loadDataOnLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginSucceeded),
      map(() => actions.loadTodos())
    )
  )

  saveTodo2$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.todoItemAdded),
      switchMap(originalAction => this.service.addTodo({
        name: originalAction.payload.name,
        dueDate: originalAction.payload.dueDate,
        project: originalAction.payload.project
      })
        .pipe(
          map(resposne => actions.todoItemAddedSuccessfully({ oldId: originalAction.payload.id, payload: resposne })),
          catchError(() => of(actions.todoItemAddedFailure({ message: "could not add todo", payload: originalAction.payload })))
        )
      )
    ), { dispatch: true }
  );

  loadData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.loadTodos),
      switchMap(() => this.service.getAllTodos()
        .pipe(
          map(payload => actions.loadTodosSucceeded({ payload })),
          catchError(() => of(actions.loadTodosFailed({ payload: "Could not load todos" })))
        ))
    )
  )
  constructor(private service: TodosDataService, private actions$: Actions) { }
}
