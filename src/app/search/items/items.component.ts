import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/service/http.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms'

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  private subscription: Subscription;
  public item: any[];

  constructor(
    private service: HttpService) {
  }

  ngOnInit() {
    this.subscription = this.service.item$.subscribe(
      data => this.item = data
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  deleteItem(len: number): void {
    this.item.splice(len, 1);
    this.service.itemData(this.item);
    if (this.item.length === 0) {
      delete this.item;
    }
  }

  addFavorites(memo: NgForm, len: number) {
    let jsonData: any[] = JSON.parse(localStorage.getItem('favorites')) || [];
    for (let i = 0; i < this.item.length; i++) {
      this.item[i].memo = memo.value[i];
      if (!this.checkId(jsonData, this.item[i])) {
        jsonData.push(this.item[i]);
      }
    }
    localStorage.setItem('favorites', JSON.stringify(jsonData));
    this.item.splice(len)
    if (this.item.length === 0) {
      delete this.item;
    }
  }

  checkId(arr: any[], item: any) {
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

}
