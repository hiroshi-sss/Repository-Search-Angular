import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/service/http.service';
import { Observable, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-search',
  templateUrl: './nav-search.component.html',
  styleUrls: ['./nav-search.component.scss']
})

export class NavSearchComponent implements OnInit {

  public isLoading: Subject<boolean> = this.service.isLoading;

  private subscription: Subscription;
  public searches: RepoItems[];
  public errorMessage: string;

  constructor(private service: HttpService) { }

  ngOnInit() {
    this.subscription = this.service.search$.subscribe(
      data => this.searches = data
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  showSearch(searchName: string): Observable<RepoItems[]> {
    if (!searchName) { return; }
    this.service.show();
    this.service.onSearch(searchName)
      .subscribe(
        (data) => { this.searches = data; },
        (err) => {
          console.log(err);
          this.service.hide();
          this.errorMessage = (err.statusText + 'のエラーが発生しました。再度検索してください。')
        },
        () => {
          this.errorMessage = '';
          this.service.hide();
          this.service.searchData(this.searches);
        }
      )
  }


}
