import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { RepoItems } from '../model/response-model';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private searchList = new Subject<RepoItems[]>();
  private itemList = new Subject<RepoItems[]>();

  public search$ = this.searchList.asObservable();
  public item$ = this.itemList.asObservable();
  
  public isLoading = new Subject<boolean>();

  public isLoadingShow(): void {
    this.isLoading.next(true);
  }

  public isLoadingHide(): void {
    this.isLoading.next(false);
  }

  public searchData(searchName: RepoItems[]) {
    this.searchList.next(searchName);
  }

  public itemData(itemName: RepoItems[]) {
    this.itemList.next(itemName);
  }
}
