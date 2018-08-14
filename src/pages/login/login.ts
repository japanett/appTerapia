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
    this.userProvider.login(this.model.login, this.model.password)
      .then((result: any) => {
        this.token = result.token;
        this.storage.ready().then(() => {
          this.storage.set('token', result.token);
        });
        this.toast.create({ message: 'Usuário logado com sucesso. Token: ' + result.token, position: 'botton', duration: 15000 }).present();
        this.navCtrl.setRoot('MenuPage'); 

        //Salvar o token no Ionic Storage para usar em futuras requisições.
        //Redirecionar o usuario para outra tela usando o navCtrl
        //this.navCtrl.pop();
        //this.navCtrl.setRoot()
      })
      .catch((error: any) => {
        this.toast.create({ message: 'Erro ao efetuar login. Erro: ' + error.error, position: 'botton', duration: 15000 }).present();
      });
  }
}

export class User {
  login: string;
  password: string;
}