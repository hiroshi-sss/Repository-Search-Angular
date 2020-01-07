import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  constructor(
    private service: HttpService) {
  }
  private subscription: Subscription;
  public searches: any;
  public item: any[] = [];
  public isSelectItem: boolean[] = [false];
  public isSelectFavorite: boolean[] = [false];
  public isMaxSelect: boolean = false;

  ngOnInit() {
    this.subscription = this.service.search$.subscribe(
      data => this.searches = data
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
    this.item.push(this.searches.items[len])
    this.service.itemData(this.item);
  }

  compareLogic() {
    if (this.searches) {
      const checkFavorites = [];
      const checkItems = [];
      for (let i = 0; i < this.searches.items.length; i++) {
        const favorite = this.favoritesCompare(this.searches.items[i]);
        const item = this.itemsCompare(this.searches.items[i]);
        checkFavorites.push(favorite);
        checkItems.push(item);
      }
      this.isSelectFavorite = checkFavorites;
      this.isSelectItem = checkItems;
    }
  }

  itemsCompare(resultItem: any) {
    let check = false;
    for (const item of this.item) {
      if (resultItem.id === item.id) {
        check = true;
        break;
      }
    }
    return check;
  }

  favoritesCompare(resultItem: any) {
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
    let jsonData: any[] = JSON.parse(localStorage.getItem('favorites')) || [];
    if ((jsonData.length + this.item.length) === 10) {
      return this.isMaxSelect = true;
    } else {
      return this.isMaxSelect = false;
    }
  }
}
