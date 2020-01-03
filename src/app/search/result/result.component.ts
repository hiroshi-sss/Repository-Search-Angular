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

  private subscription: Subscription;
  public searches: any;
  public item: any[] = [];
  value;

  ngOnInit() {
    this.subscription = this.service.search$.subscribe(
      data => this.searches = data
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  selectItems(len: number) {
    this.item.push(this.searches.items[len])
    this.service.itemData(this.item);
    this.service.hoge()
  }

}
