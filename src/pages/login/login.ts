import { UsersProvider } from './../../providers/users/users';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public token: any;

  model: User;

  constructor(public navCtrl: NavController, private alertCtrl: AlertController, public storage: Storage, public navParams: NavParams, private toast: ToastController, private userProvider: UsersProvider) {
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

  recover() {
    const confirm = this.alertCtrl.create({
      title: 'Digite seu email cadastrado:',
      inputs: [
        {
          name: 'email',
          placeholder: 'exemplo@gmail.com',
        }
      ],
      buttons: [
        {
          text: 'Recuperar',
          handler: dataInput => {
            this.userProvider.recoverPassword(dataInput.email)
              .then((result: any) => {
                if (result.success === true) {
                  this.toast.create({ message: 'Informações enviadas para o email!', position: 'botton', duration: 5000 }).present();
                }
              })
              .catch((error: any) => {
                this.toast.create({ message: 'Erro: ' + error.error, position: 'botton', duration: 5000 }).present();
              });
          }
        },
        {
          text: 'Cancelar',
          handler: () => {
          }
        }

      ]
    });
    confirm.present();
  }

  goBack() {
    this.navCtrl.pop();
  }
}


export class User {
  login: string;
  password: string;
}