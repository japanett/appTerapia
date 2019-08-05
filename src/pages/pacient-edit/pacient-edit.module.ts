import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {PacientEditPage} from './pacient-edit';

@NgModule({
  declarations: [
    PacientEditPage,
  ],
  imports: [
    IonicPageModule.forChild(PacientEditPage),
  ],
})
export class PacientEditPageModule {
}
