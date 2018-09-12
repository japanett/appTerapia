import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PacientDetailPage } from './pacient-detail';

@NgModule({
  declarations: [
    PacientDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(PacientDetailPage),
  ],
  exports: [
    PacientDetailPage
  ]
})
export class PacientDetailPageModule { }
