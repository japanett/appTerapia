import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PacientListPage } from './pacient-list';

@NgModule({
  declarations: [
    PacientListPage,
  ],
  imports: [
    IonicPageModule.forChild(PacientListPage),
  ],
})
export class PacientListPageModule {}
