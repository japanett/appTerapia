import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActivateGamePage } from './activate-game';

@NgModule({
  declarations: [
    ActivateGamePage,
  ],
  imports: [
    IonicPageModule.forChild(ActivateGamePage),
  ],
})
export class ActivateGamePageModule {}
