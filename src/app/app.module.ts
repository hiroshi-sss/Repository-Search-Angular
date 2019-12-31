import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavSearchComponent } from './search/nav-search/nav-search.component';
import { ResultComponent } from './search/result/result.component';
import { ItemsComponent } from './search/items/items.component';
import { FavoritesComponent } from './search/favorites/favorites.component';

import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './service/http.service';


@NgModule({
  declarations: [
    AppComponent,
    NavSearchComponent,
    ResultComponent,
    ItemsComponent,
    FavoritesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    HttpService,
    NavSearchComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
