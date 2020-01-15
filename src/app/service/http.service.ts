import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Repository } from '../model/response-model';

@Injectable({
  providedIn: 'root'
})


export class HttpService {

  private repositoriesUrl: string = 'https://api.github.com/search/repositories?q=';

  constructor(private http: HttpClient) { }

  onSearch(searchName: string): Observable<Repository> {
    const url = `${this.repositoriesUrl}${searchName}`;
    return this.http.get<Repository>(url);
  }

}
