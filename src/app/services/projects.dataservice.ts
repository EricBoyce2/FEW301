import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { TodoItemCreate } from '../models';
import { ProjectEntity } from '../reducers/projects.reducer';
import { TodoEntity } from '../reducers/todos.reducer';

@Injectable({
  providedIn: 'root'
})
export class TodosDataService {
  readonly baseUri = environment.apiUrl + "todos/"
  constructor(private client: HttpClient) { }

  getAllTodos(): Observable<TodoEntity[]> {

    return this.client.get<{ data: TodoEntity[] }>(this.baseUri)
      .pipe(
        map(r => r.data)
      );

  }

  addTodo(todo: TodoItemCreate): Observable<TodoEntity> {
    return this.client.post<TodoEntity>(this.baseUri, todo);
  }
}
