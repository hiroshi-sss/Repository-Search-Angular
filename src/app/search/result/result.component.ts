import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonService } from 'src/app/service/common.service';
import { RepoItems, Repository } from 'src/app/model/response-model';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  constructor(
    private common: CommonService) {
  }
  private subscription: Subscription;
  public searchList: Repository;
  public itemList: RepoItems[] = [];
  public isSelectItem: boolean[] = [false];
  public isSelectFavorite: boolean[] = [false];
  public isMaxSelect: boolean = false;

  ngOnInit() {
    this.subscription = this.common.search$.subscribe(
      data => this.searchList = data
    )
    this.subscription = this.common.item$.subscribe(
      data => {
        this.itemList = data
      }
    )
  }

  ngAfterContentChecked(): void {
    this.compareLogic();
    this.lengthMax10()
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  selectItems(len: number): void {
    this.itemList.push(this.searchList.items[len])
    this.common.itemData(this.itemList);
  }

  compareLogic() {
    if (this.searchList) {
      const checkFavorites = [];
      const checkItems = [];
      for (let i = 0; i < this.searchList.items.length; i++) {
        const favorite = this.favoritesCompare(this.searchList.items[i]);
        const itemList = this.itemsCompare(this.searchList.items[i]);
        checkFavorites.push(favorite);
        checkItems.push(itemList);
      }
      this.isSelectFavorite = checkFavorites;
      this.isSelectItem = checkItems;
    }
  }

  itemsCompare(resultItem: RepoItems) {
    let check = false;
    for (const item of this.itemList) {
      if (resultItem.id === item.id) {
        check = true;
        break;
      }
    }
    return check;
  }

  favoritesCompare(resultItem: RepoItems) {
    let check = false;
    let jsonData: any[] = JSON.parse(localStorage.getItem('favoriteList')) || [];
    for (const item of jsonData) {
      if (resultItem.id === item.id) {
        check = true;
        break;
      }
    }
    return check
  }

  lengthMax10() {
    let jsonData: RepoItems[] = JSON.parse(localStorage.getItem('favoriteList')) || [];
    if ((jsonData.length + this.itemList.length) === 10) {
      return this.isMaxSelect = true;
    } else {
      return this.isMaxSelect = false;
    }
  }
}
