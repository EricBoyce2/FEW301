import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ProjectEntity } from '../reducers/projects.reducer';

@Injectable({
  providedIn: 'root'
})
export class ProjectDataService {
  private readonly baseUrl = environment.apiUrl;

  getAllProject(): Observable<ProjectEntity[]> {
    return this.client.get<{ data: ProjectEntity[] }>(this.baseUrl + 'projects')
      .pipe(
        map(results => results.data)
      );
  }

  constructor(private client: HttpClient) { }
}
