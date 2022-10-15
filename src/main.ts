import {enableProdMode, importProvidersFrom} from '@angular/core';
import { environment } from './environments/environment';
import {bootstrapApplication} from "@angular/platform-browser";
import {AppComponent} from "./app/app.component";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule, Routes} from "@angular/router";
import {GameBoardComponent} from "./app/components/game-board/game-board.component";

if (environment.production) {
  enableProdMode();
}
const routes: Routes = [
  { path: 'game-board', component: GameBoardComponent },
  { path: '**', component: GameBoardComponent }
];

bootstrapApplication(AppComponent, {
  providers: [importProvidersFrom(HttpClientModule), importProvidersFrom(RouterModule.forRoot(routes))]
}).catch(err => console.error(err));
