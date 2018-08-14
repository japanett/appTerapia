import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { UsersProvider } from './../../providers/users/users';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-user-detail',
  templateUrl: 'user-detail.html',
})
export class UserDetailPage {

  constructor(public navCtrl: NavController, public storage: Storage, public navParams: NavParams, private toast: ToastController, private userProvider: UsersProvider) {
  }

  getAuthUser() {
    this.userProvider.getUser().then(
      (result: any) => {
        let data = result;
        this.toast.create({ message: JSON.stringify(data), position: 'botton', duration: 15000 }).present();
        // if (!result.success) {
        //   this.navCtrl.push('LoginPage');
        // }
      }
    );
  }

  logout() {
    this.storage.remove('token')
      .then(() => {
        this.toast.create({ message: 'log out successfull', position: 'botton', duration: 15000 }).present();
        this.navCtrl.setRoot('HomePage');
      })
      .catch((error:any)=>{
        this.toast.create({ message: 'Erro: ' + error.error, position: 'botton', duration: 15000 }).present();
      });
  }

}
