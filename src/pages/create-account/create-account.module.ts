import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {CreateAccountPage} from './create-account';
import {TextMaskModule} from 'angular2-text-mask';

@NgModule({
  declarations: [
    CreateAccountPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateAccountPage),
    TextMaskModule
  ],
})
export class CreateAccountPageModule {
}
