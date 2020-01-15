import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonService } from 'src/app/service/common.service';
import { RepoItems } from 'src/app/model/response-model';

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
  public searchList: any;
  public item: RepoItems[] = [];
  public isSelectItem: boolean[] = [false];
  public isSelectFavorite: boolean[] = [false];
  public isMaxSelect: boolean = false;

  ngOnInit() {
    this.subscription = this.common.search$.subscribe(
      data => this.searchList = data
    )
    this.subscription = this.common.item$.subscribe(
      data => {
        this.item = data
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
    this.item.push(this.searchList.items[len])
    this.common.itemData(this.item);
  }

  compareLogic() {
    if (this.searchList) {
      const checkFavorites = [];
      const checkItems = [];
      for (let i = 0; i < this.searchList.items.length; i++) {
        const favorite = this.favoritesCompare(this.searchList.items[i]);
        const item = this.itemsCompare(this.searchList.items[i]);
        checkFavorites.push(favorite);
        checkItems.push(item);
      }
      this.isSelectFavorite = checkFavorites;
      this.isSelectItem = checkItems;
    }
  }

  itemsCompare(resultItem: RepoItems) {
    let check = false;
    for (const item of this.item) {
      if (resultItem.id === item.id) {
        check = true;
        break;
      }
    }
    return check;
  }

  favoritesCompare(resultItem: RepoItems) {
    let check = false;
    let jsonData: any[] = JSON.parse(localStorage.getItem('favorites')) || [];
    for (const item of jsonData) {
      if (resultItem.id === item.id) {
        check = true;
        break;
      }
    }
    return check
  }

  lengthMax10() {
    let jsonData: RepoItems[] = JSON.parse(localStorage.getItem('favorites')) || [];
    if ((jsonData.length + this.item.length) === 10) {
      return this.isMaxSelect = true;
    } else {
      return this.isMaxSelect = false;
    }
  }
}
