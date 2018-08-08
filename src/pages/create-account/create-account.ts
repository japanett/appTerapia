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
    this.model.email = '';
    this.model.password = '';
    this.model.name = '';
    this.model.login = '';
  }

  createAccount() {
    this.userProvider.createAccount(this.model.email, this.model.password, this.model.login, this.model.name)
      .then((result: any) => {
        this.toast.create({ message: 'Usuario criado com sucesso', position: 'botton', duration: 3000 }).present();
        //Salvar o token no ionic storage para futura requisições, pegar isso no login
        // this.navCtrl.setRoot(); //mudar de tela
        this.navCtrl.pop();
      })
      .catch((error: any) => {
        this.toast.create({ message: 'Erro ao criar usuário. Erro: ' + error, position: 'botton', duration: 3000 }).present();
      })
  }

}

export class User {
  name: string;
  login: string;
  email: string;
  password: string
}