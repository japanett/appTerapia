import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GameConfigEditPage } from './game-config-edit';

@NgModule({
  declarations: [
    GameConfigEditPage,
  ],
  imports: [
    IonicPageModule.forChild(GameConfigEditPage),
  ],
})
export class GameConfigEditPageModule {}
