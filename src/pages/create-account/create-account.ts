import { UsersProvider } from './../../providers/users/users';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-create-account',
  templateUrl: 'create-account.html',
})
export class CreateAccountPage {
  model: User;

  constructor(public navCtrl: NavController, public navParams: NavParams, private toast: ToastController, private userProvider: UsersProvider) {
    this.model = new User();
    this.model.name = '';
    this.model.login = '';
    this.model.email = '';
    this.model.password = '';
  }

  createAccount() {
    this.userProvider.createAccount(this.model.name, this.model.login, this.model.password, this.model.email)
      .then((result: any) => {
        // alert(result);
        if (result.success) {
          this.toast.create({ message: 'Usuario cadastrado com sucesso', position: 'botton', duration: 15000 }).present();
          this.navCtrl.push('LoginPage'); //mudar de tela
        } else {
          this.toast.create({ message: 'Erro ao cadastrar usuário', position: 'botton', duration: 15000 }).present();
        }
        //Salvar o token no ionic storage para futura requisições, pegar isso no login
        // this.navCtrl.pop();
      })
      .catch((error: any) => {
        this.toast.create({ message: 'Erro ao cadastrar usuário.', position: 'botton', duration: 15000 }).present();
      })
  }
}

export class User {
  name: string;
  login: string;
  email: string;
  password: string
}