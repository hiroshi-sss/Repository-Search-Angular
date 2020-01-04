import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, Subscription } from 'rxjs';
import { ResultComponent } from '../search/result/result.component';

@Injectable({
  providedIn: 'root'
})


export class HttpService {

  private repositoriesUrl: string = 'https://api.github.com/search/repositories?q=';
  private searches = new Subject<RepoItems[]>();
  private items = new Subject<RepoItems[]>();

  public item$ = this.items.asObservable();
  public search$ = this.searches.asObservable();
  public isLoading = new Subject<boolean>();
  public isSelect = new Subject<boolean[]>();


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

  public isSelectShow(i: number) {
    console.log('TEST')
    this.isSelect.next(false[i]);
  }

  public isSelectHide(i: number) {
    console.log('TEST2')
    this.isSelect.next(true[i]);
  }

  public searchData(searchName: RepoItems[]) {
    this.searches.next(searchName);
  }

  public itemData(itemName: RepoItems[]) {
    this.items.next(itemName);
  }


}
