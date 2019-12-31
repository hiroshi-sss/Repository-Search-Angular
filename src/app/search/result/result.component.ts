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
  public search$: any;

  ngOnInit() {
    this.subscription = this.service.search$.subscribe(
      data => this.search$ = data
    )
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }

  hoge() {
    // this.search$.subscribe(
    //   (data) => { this.search$ = data }
    // )
    console.log(this.search$)
  }

}
