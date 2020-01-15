import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/service/http.service';
import { CommonService } from 'src/app/service/common.service';
import { Observable, Subject, Subscription } from 'rxjs';
import { Repository } from 'src/app/model/response-model';

@Component({
  selector: 'app-nav-search',
  templateUrl: './nav-search.component.html',
  styleUrls: ['./nav-search.component.scss']
})

export class NavSearchComponent implements OnInit {

  public isLoading: Subject<boolean> = this.common.isLoading;

  private subscription: Subscription;
  public searchList: Repository;
  public errorMessage: string;

  constructor(
    private service: HttpService,
    private common: CommonService
    ) { }

  ngOnInit() {
    this.subscription = this.common.search$.subscribe(
      data => this.searchList = data
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  showSearch(searchName: string): Observable<Repository> {
    if (!searchName) { return; }
    this.common.isLoadingShow();
    this.service.onSearch(searchName)
      .subscribe(
        (data) => { this.searchList = data; },
        (err) => {
          console.log(err);
          this.common.isLoadingHide();
          this.errorMessage = (err.statusText + 'が発生しました。再度検索してください。')
        },
        () => {
          this.errorMessage = '';
          this.common.isLoadingHide();
          this.common.searchData(this.searchList);
        }
      )
  }


}
