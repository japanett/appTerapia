import { UsersProvider } from './../../providers/users/users';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public token: any;

  model: User;

  constructor(public navCtrl: NavController, public storage: Storage, public navParams: NavParams, private toast: ToastController, private userProvider: UsersProvider) {
    this.model = new User();
    this.model.login = '';
    this.model.password = '';
  }

  login() {
    this.storage.clear().then(() => {
      this.userProvider.login(this.model.login, this.model.password)
        .then((result: any) => {
          this.token = result.token;
          this.storage.ready().then(() => {
            this.storage.set('token', result.token);
          });
          // this.toast.create({ message: 'Usuário logado com sucesso. Token: ' + result.token, position: 'botton', duration: 5000 }).present();
          this.navCtrl.setRoot('MenuPage');
        })
        .catch((error: any) => {
          if (error.status === 401) {
            this.toast.create({ message: 'Usuário ou senha incorretos', position: 'botton', duration: 5000 }).present();
          } else {
            this.toast.create({ message: 'Server Error. Erro: ' + error.error, position: 'botton', duration: 5000 }).present();
          }
        });
    })
  }
}

export class User {
  login: string;
  password: string;
}