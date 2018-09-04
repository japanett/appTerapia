import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ItemSliding } from 'ionic-angular';
import { UsersProvider } from './../../providers/users/users';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-pacient-list',
  templateUrl: 'pacient-list.html',
})
export class PacientListPage {
  public data: any = [];
  constructor(public navCtrl: NavController, public storage: Storage, public navParams: NavParams, private toast: ToastController, private userProvider: UsersProvider) {
    this.getPacients();
  }


  getPacients() {
    this.userProvider.getPacients()
      .then((result: any) => {
        if (result.success === true) {
          for (let i = 0; i < result.data.length; i++) {
            this.data.push({
              name: result.data[i].name,
              identifier: result.data[i].identifier
            });
            console.log('foi');
            console.log(i);
            console.log(result.data[i]);
          }
          console.log(this.data)
        }
      })
      .catch((error: any) => {
        this.toast.create({ message: 'Erro: ' + error.error, position: 'botton', duration: 5000 }).present();
      });
  }

  getPacient(identifier: string) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PacientListPage');
  }

}