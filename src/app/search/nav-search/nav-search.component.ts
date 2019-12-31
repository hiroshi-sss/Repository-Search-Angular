import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/service/http.service';
import { Observable, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-search',
  templateUrl: './nav-search.component.html',
  styleUrls: ['./nav-search.component.scss']
})

export class NavSearchComponent implements OnInit {

  // public search$ = new Subject<any>();
  public isLoading: Subject<boolean> = this.service.isLoading;

  private subscription: Subscription;
  public search$: any;

  constructor(private service: HttpService) { }

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

  // hage() {
  //   console.log(this.search$);
  //   this.service.searchData(this.search$);

  // }

  showSearch(searchName: string): Observable<RepoItems[]> {
    if(!searchName) { return; }
    this.service.show();
    this.service.onSearch(searchName)
    .subscribe(
      (data) => { this.search$ = data },
      (err) => { console.log(err) },
      () => {
        this.service.hide(); this.service.searchData(this.search$);
 }
    )
    
  }

  


}
