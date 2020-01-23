import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { RepoItems, Repository } from '../model/response-model';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private searchList = new Subject<Repository>();
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

  public searchData(searchName: Repository) {
    this.searchList.next(searchName);
  }

  public itemData(itemName: RepoItems[]) {
    this.itemList.next(itemName);
  }
}
