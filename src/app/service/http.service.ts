import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class HttpService {

  private repositoriesUrl: string = 'https://api.github.com/search/repositories?q=';
  private search = new Subject<RepoItems[]>();

  public search$ = this.search.asObservable();
  public isLoading = new Subject<boolean>();


  constructor(private http: HttpClient) { }

  onSearch(searchName: string): Observable<RepoItems[]> {
    const url = `${this.repositoriesUrl}${searchName}`;
    return this.http.get<RepoItems[]>(url);
  }

  public show(): void {
    this.isLoading.next(true);
  }

  public hide(): void {
    this.isLoading.next(false);
  }

  public searchData(hoge: any) {
    console.log("OK");
    this.search.next(hoge);
  }

}
