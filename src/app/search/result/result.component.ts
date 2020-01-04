import { Component, OnInit } from '@angular/core';
import { NavSearchComponent } from '../nav-search/nav-search.component';
import { Observable, Subject, Subscription } from 'rxjs';
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
  // public isSelect: Subject<boolean[]> = this.service.isSelect;
  private subscription: Subscription;
  public searches: any;
  public item: any[] = [];
  public isSelect: boolean[] = [false];

  ngOnInit() {
    this.subscription = this.service.search$.subscribe(
      data => this.searches = data
    )
  }

  ngDoCheck(): void {
    this.test();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  selectItems(len: number): void {
    this.item.push(this.searches.items[len])
    this.service.itemData(this.item);
  }

  test() {
    if (this.searches !== undefined) {
      for (let i = 0; i < this.searches.items.length; i++) {
        for (let y = 0; y < this.item.length; y++) {
          if (this.searches.items[i].id == this.item[y].id) {
            this.isSelect[i] = true;
          }
          if (!this.isSelect) {
            console.log("test")
          }
         }
      }
    }

  }

}
