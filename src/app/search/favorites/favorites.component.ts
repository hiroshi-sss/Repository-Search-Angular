import { Component, OnInit } from '@angular/core';
import { RepoItems } from 'src/app/model/response-model';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  public favorites: RepoItems[];
  constructor() { }

  ngOnInit() {
  }

  ngAfterContentChecked(): void {
    this.getFavorites();
  }

  getFavorites() {
    this.favorites = JSON.parse(localStorage.getItem('favorites'))
  }

  deleteFavorites(len: number) {
    this.favorites.splice(len, 1);
    if (this.favorites.length === 0) {
      localStorage.removeItem('favorites')
      delete this.favorites;
    } else {
      localStorage.setItem('favorites', JSON.stringify(this.favorites));
    }
  }

}
