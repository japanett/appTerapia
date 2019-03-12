import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PacientDetailPage } from '../pages/pacient-detail/pacient-detail';
import { GamesPage } from '../pages/games/games';
import { GameDetailPage } from '../pages/game-detail/game-detail';
import { GameConfigEditPage } from '../pages/game-config-edit/game-config-edit';
import { GameListPage } from '../pages/game-list/game-list';
import { ActivateGamePage } from '../pages/activate-game/activate-game';
import { PacientEditPage } from '../pages/pacient-edit/pacient-edit';
import { UsersProvider } from '../providers/users/users';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';
import { ValidatorsModule } from '../validators/validators.module';
import { LoadingProvider } from '../providers/loading/loading';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PacientDetailPage,
    GamesPage,
    GameDetailPage,
    GameListPage,
    ActivateGamePage,
    GameConfigEditPage,
    PacientEditPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    ValidatorsModule,
    IonicStorageModule.forRoot({
      name: '__mydb',
         driverOrder: ['indexeddb', 'sqlite', 'websql']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PacientDetailPage,
    GamesPage,
    GameListPage,
    GameDetailPage,
    ActivateGamePage,
    GameConfigEditPage,
    PacientEditPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UsersProvider,
    LoadingProvider
  ]
})
export class AppModule {}
