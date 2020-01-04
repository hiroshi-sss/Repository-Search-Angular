import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/service/http.service';
import { Subscription } from 'rxjs';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  constructor(
    private service: HttpService,
    private common: CommonService) {
  }

  private subscription: Subscription;
  public item: any[];
  items = [];

  ngOnInit() {
    this.subscription = this.service.item$.subscribe(
      data => this.item = data
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  deleteItem(len: number):void {
    this.item.splice(len, 1);
    this.service.itemData(this.item);
    if ( this.item.length === 0 ) {
      delete this.item;
    }
  }
  
  hoge() {
  }

  // selectItems(value: number) {
  //   this.item.push(this.searches.items[value])
  //   this.service.itemData(this.item);
  // }

}
