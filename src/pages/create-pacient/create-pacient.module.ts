import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {CreatePacientPage} from './create-pacient';

@NgModule({
  declarations: [
    CreatePacientPage,
  ],
  imports: [
    IonicPageModule.forChild(CreatePacientPage),
  ],
})
export class CreatePacientPageModule {
}
