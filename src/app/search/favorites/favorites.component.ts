import { Component, OnInit } from '@angular/core';
import { RepoItems } from 'src/app/model/response-model';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  public favoriteList: RepoItems[];
  constructor() { }

  ngOnInit() {
  }

  ngAfterContentChecked(): void {
    this.getFavorites();
  }

  getFavorites() {
    this.favoriteList = JSON.parse(localStorage.getItem('favoriteList'))
  }

  deleteFavorites(len: number) {
    this.favoriteList.splice(len, 1);
    if (this.favoriteList.length === 0) {
      localStorage.removeItem('favoriteList')
      delete this.favoriteList;
    } else {
      localStorage.setItem('favoriteList', JSON.stringify(this.favoriteList));
    }
  }

}
