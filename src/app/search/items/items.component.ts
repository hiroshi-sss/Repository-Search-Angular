import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms'
import { CommonService } from 'src/app/service/common.service';
import { RepoItems } from 'src/app/model/response-model';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  private subscription: Subscription;
  public itemList: RepoItems[];

  constructor(
    private common: CommonService) {
  }

  trackItem(index, item) {
    return item.id
  }

  ngOnInit() {
    this.subscription = this.common.item$.subscribe(
      data => this.itemList = data
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  deleteItem(len: number): void {
    this.itemList.splice(len, 1);
    this.common.itemData(this.itemList);
  }

  addFavorites(memo: NgForm, len: number) {
    let jsonData: any[] = JSON.parse(localStorage.getItem('favorites')) || [];
    for (let i = 0; i < this.itemList.length; i++) {
      this.itemList[i].memo = memo.value[i];
      if (!this.checkId(jsonData, this.itemList[i])) {
        jsonData.push(this.itemList[i]);
      }
    }
    localStorage.setItem('favorites', JSON.stringify(jsonData));
    this.itemList.splice(len)
    if (this.itemList.length === 0) {
      delete this.itemList;
    }
  }

  checkId(arr: RepoItems[], item: RepoItems) {
    if (arr === null || arr.length === 0) {
      return false;
    }
    for (const i of arr) {
      if (i.id === item.id) {
        return true;
      }
    }
    return false;
  }

  checkShow(value: string): boolean {
    if (value === null || value === undefined || value.length === 0) {
      return true
    }
    return false
  }
}
